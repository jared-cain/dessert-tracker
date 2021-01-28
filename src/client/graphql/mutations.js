import { gql } from "graphql-request";

export const addDessertMutation = gql`
  mutation addDessert($dessert: String!, $calories: Int!, $fat: Int!, $carb: Int!, $protein: Int!){
    addDessert(dessert: $dessert, calories: $calories, fat: $fat, carb: $carb, protein: $protein){
      dessert
    }
  }
`;

export const deleteDessertMutation = gql`
  mutation deleteDessert($dessert: String!){
    deleteDessert(dessert: $dessert){
      dessert
    }
  }
`;