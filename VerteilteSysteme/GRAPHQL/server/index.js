import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
//db
import db from './_db.js'
import _db1 from "./_db1.js";
//types
import {typeDefs} from './schema1.js'
const resolvers = {
    Query: {
        allGames() {
            return _db1.games
        }, 
        allPlatforms() {
            return _db1.platforms
        }
    },
    Game: {
        platforms(parent) {
          return parent.platform_ids.map(platformId =>
            _db1.platforms.find(platform => platform.id === platformId)
          );
        }
      },
      Platform: {
        games(parent) {
          return _db1.games.filter(game => game.platform_ids.includes(parent.id));
        }
      },
      Mutation: {
        updateGameReleaseDate(_, args) {
            let gameFound = _db1.games.find(g => g.id === args.id)
            gameFound.date = args.date
            _db1.games =_db1.games.filter(game => game.id !== args.id)
            _db1.games.push(gameFound)
            return gameFound;
        }
      }
};
// const resolvers = {
//     Query: {
//          games() {
//             return db.games
//          },
//          reviews() {
//             return db.reviews
//          },
//          authors() {
//             return db.authors
//          },
//          review(_, args) {
//             return db.reviews.find((review) => review.id === args.id)
//          },
//          author(_, args) {
//             return db.authors.find((author) => author.id === args.id)
//          },
//          game(_, args) {
//             return db.games.find((game) => game.id === args.id)
//          }
//     },
//     Game: {
//         reviews(parent) {
//             return db.reviews.filter((r) =>r.game_id === parent.id)
//         }
//     },
//     Author: {
//     reviews(parent) {
//         return db.reviews.filter((r) => r.author_id === parent.id)
//     }
//     },
//     Review: {
//         author(parent) {
//             return db.authors.find((a) => a.id === parent.author_id)
//         },
//         game(parent) {
//             return db.games.find((g) => g.id === parent.game_id)
//         }
//     },
//     Mutation: {
//         deleteGame(_, args) {
//             db.games = db.games.filter((g) => g.id !== args.id)

//             return db.games;
//         },
//         addGame(_, args) {
//             let game = {
//                 ...args.game,
//                 id: Math.floor(Math.random() * 10000).toString()
//             }
//             db.games.push(game)

//             return game
//         },
//         updateGame(_, args) {
//              var gameFound = db.games.find((g) => g.id === args.id)
//             let gameUpdated = {
//                 ...gameFound,
//                 ...args.edits
//             } 
//             db.games = db.games.filter((g) => g.id !== args.id) 
//              db.games.push(gameUpdated)   
//             return gameUpdated;
           
//         }
//     }
    
// }


const server = new ApolloServer({
    //typeDefs
    typeDefs,
    //resolvers
    resolvers

})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
})

console.log(`Server ready at: ${url}`)
