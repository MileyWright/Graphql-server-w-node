var express = require('express');
var express_graphql = require('express-graphql');
// schema used to describe the graphql type system. Defines how the client can access the data from the api. data is validated everytime client makes a API call.
var {buildSchema} = require('graphql');

//GraphQL Schema 
//a basic schema returning a string
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

//a function thats called each time query from the schema needs to be excuted 
var root = {
    message: () => 'Hello World'
};

//Create an express server and a GraphQL endpoint
var app = express();
//graphQL endpoint > add the express graphQL middleware thats expects a parameter
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    //GraphiQL is an in-browser took for writing, validating, & testing GraphQL queries
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost 4000'));