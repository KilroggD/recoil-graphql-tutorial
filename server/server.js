import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './schema';

const port = 3001;
const app =  express();
const dev = process.env.NODE_ENV === 'development';

app.use('/graphql', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/graphql', graphqlHTTP({schema, graphiql: true}));

const server = app.listen(port, () => {
    console.log(`\nExpress listening at http://localhost:${port} \n`);
});
