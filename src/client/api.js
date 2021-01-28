import { getDesserts } from './graphql/queries';
import {
  addDessertMutation,
  deleteDessertMutation
} from './graphql/mutations';
import { request } from "graphql-request";
import axios from 'axios';

const endpoint = "http://localhost:4000/graphql";

export async function fetchDesserts() {
  const { desserts: data } = await request(
    endpoint,
    getDesserts
  );
  return data;
}

export async function addDessert(dessert) {
  console.log(dessert);
  const { result } = await axios.post(
    endpoint, 
    { 
      query: addDessertMutation,
      variables: { ...dessert }
    },
    { 
      headers: { 
        'Content-Type': 'application/json', 
      } 
    }
  )
  return result
}

export async function deleteDessert(dessert) {
  const { result } = await axios.post(
    endpoint, 
    { 
      query: deleteDessertMutation,
      variables: { ...dessert }
    },
    { 
      headers: { 
        'Content-Type': 'application/json', 
      } 
    }
  )
  return result
}