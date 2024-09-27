export const typeDefs = `#graphql 
 type Game {
  id: ID!
  name: String!
  date: String!
  platforms: [Platform!]!
}

type Platform {
  id: ID!
  rating: Int!
  name: String!
  games: [Game!]!
}

type Query {
  allGames: [Game!]!
  allPlatforms: [Platform!]!
}

type Mutation {
  updateGameReleaseDate(id: ID!, date: String!): Game
}







`