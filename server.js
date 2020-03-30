var express = require('express');
var express_graphql = require('express-graphql');
// schema used to describe the graphql type system. Defines how the client can access the data from the api. data is validated everytime client makes a API call.
var {buildSchema} = require('graphql');

//GraphQL Schema 
var schema = buildSchema(`

`);