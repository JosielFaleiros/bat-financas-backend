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
mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_SECRET + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME, {useMongoClient: true})

// start server 
const server = app.listen(process.env.PORT || 8080, () => console.log('Listening at port', server.address().port))
