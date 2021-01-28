const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');

var data = [
    { 
        dessert: "Oreo",
        nutritionInfo: {
            calories: 437,
            fat: 18, 
            carb: 63,
            protein: 4,
        } 
    }, 
    {
        dessert: "Nougat", 
        nutritionInfo: { 
            calories: 360,
            fat: 19, 
            carb: 50,
            protein: 37, 
        } 
    },
  ];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Facts {
        calories: Int,
        fat: Int,
        carb: Int,
        protein: Int
    }

    type Dessert {
        dessert: String,
        nutritionInfo: Facts
    }

    type Query {
        desserts: [Dessert]
    }

    type Mutation {
        addDessert(
            dessert: String!,
            calories: Int!,
            fat: Int!,
            carb: Int!,
            protein: Int!
        ): Dessert,
        deleteDessert(
            dessert: String!,
        ): Dessert
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    desserts: () => data,
  },
  Mutation: {
      addDessert: (root, args) => {
          const { dessert, calories, fat, carb, protein } = args;
          const newDessert = { dessert, nutritionInfo: { calories, fat, carb, protein } };
          data.push(newDessert);
          return newDessert
      },
      deleteDessert: (root, args) => {
          const {dessert} = args;
          data = data.filter(item => {
              return item.dessert.toLowerCase() !== dessert.toLowerCase()
            });
          return dessert
      }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);