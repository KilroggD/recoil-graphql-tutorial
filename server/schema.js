import {
    GraphQLInt,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
} from 'graphql';

import Users from './data/users';
import Todos from './data/todos';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users in company',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            first_name: {type: new GraphQLNonNull(GraphQLString)},
            last_name: {type: new GraphQLNonNull(GraphQLString)},
            email: {type: GraphQLString},
            gender: {type: GraphQLString},
            department: {type: new GraphQLNonNull(GraphQLString)},
            country: {type: new GraphQLNonNull(GraphQLString)},
            todo_count: {
                type: GraphQLInt,
                resolve: (user) => {
                    return Todos.reduce((total, todo) => {
                        if (todo.userId === user.id) {
                            return total + 1;
                        } 
                        return total;
                    }, 0);
                }
            },
            todos: {
                type: new GraphQLList(TodoType),
                resolve: (user) => {
                    return Todos.filter(todo => todo.userId === user.id);
                }
            }
        })
});

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    description: 'Task for user',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            title: {type: GraphQLString},
            completed: {type: new GraphQLNonNull(GraphQLBoolean)},
            user: {
                type: UserType,
                resolve: (todo, args) => {
                    return Users.find(user => user.id === todo.userId);
                }
            }
        })
});

const TodoQueryRootType = new GraphQLObjectType({
    name: 'TodoAppSchema',
    description: 'Root Todo App Schema',
    fields: () => ({
            users: {
                args: {
                    first_name: {type: GraphQLString},
                    last_name: {type: GraphQLString},
                    department: {type: GraphQLString},
                    country: {type: GraphQLString},
                },
                type: new GraphQLList(UserType),
                description: 'List of Users',
                resolve: (parent, args) => {
                    if (Object.keys(args).length) {
                        return Users.filter(user => {
                            for (let key in args) {
                                if (user[key] !== args[key]) {
                                    return false;
                                }                                
                            }
                            return true;
                        });
                    }
                    return Users;
                }
            },
            todos: {
                args: {
                    userId: {type: GraphQLInt},
                    completed: {type: GraphQLBoolean},
                },
                type: new GraphQLList(TodoType),
                description: 'List of Todos',
                resolve: (parent, args) => {
                    if (Object.keys(args).length) {
                        return Todos.filter(todo => {
                            for (let key in args) {
                                if (todo[key] !== args[key]) {
                                    return false;
                                }                                
                            }
                            return true;
                        });
                    }
                    return Todos;
                }
            }
        })
});

const schema = new GraphQLSchema({
    query: TodoQueryRootType,
});

export default schema;
