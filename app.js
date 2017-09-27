import express from 'express'
import jwt from'jsonwebtoken';
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'

import schema from './graphql'
import cors from 'cors'

const app = express()
// GraphqQL server route
app.use('/graphql', cors(), graphqlHTTP(req => ({
  schema, //o schema esta fragmentado em toda pasta graphql
  pretty: true, //?
  graphiql: true //interface para testar as funcoes no /graphql
})))

// Connect mongo database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://dbuser:' + process.env.DB_SECRET + '@ds129394.mlab.com:29394/batfinancas', {useMongoClient: true})

// start server 
const server = app.listen(process.env.PORT || 8080, () => console.log('Listening at port', server.address().port))
