var express = require('express');
var express_graphql = require('express-graphql');
// schema used to describe the graphql type system. Defines how the client can access the data from the api. data is validated everytime client makes a API call.
var {buildSchema} = require('graphql');

//GraphQL Schema 
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

var getCourse = function(data) {
    var id = data.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}


var getCourses = function(data) {
    if (data.topic) {
        var topic = data.topic;
        return coursesData.filter( courses => 
           courses.topic === topic
        );
    } else {
        return coursesData;
    }
}

//a function thats called each time query from the schema needs to be excuted 
var root = {
    course: getCourse,
    courses: getCourses
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

