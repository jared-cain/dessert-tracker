import { gql } from "graphql-request";

export const getDesserts = gql`
  query {
    desserts {
      dessert
      nutritionInfo {
        calories
        fat
        carb
        protein
      }
    }
  }
`