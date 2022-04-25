import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://nutshell-server-api.herokuapp.com/";
export const client = new GraphQLClient(endpoint, { headers: {} });

export const DISHES_QUERY = gql`
  query {
    dishes {
      image
      name
      description
      price
      id
    }
  }
`;

export const SINGLE_DISH_QUERY = gql`
  query ($dishId: ID!) {
    getDish(id: $dishId) {
      image
      name
      description
      price
    }
  }
`;
