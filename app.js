import express from 'express'
import jwt from'jsonwebtoken';
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'

import schema from './graphql'
import cors from 'cors'
const env       = process.env.NODE_ENV || 'development'
const config = require('./config/config')[env]

const app = express()
// GraphqQL server route
app.use('/graphql', cors(), graphqlHTTP(req => ({
  schema, //o schema esta fragmentado em toda pasta graphql
  pretty: true, //?
  graphiql: true //interface para testar as funcoes no /graphql
})))

// Connect mongo database
mongoose.connect(config.dialect + '://' + config.username + ':' + config.password + '@' + config.host + '/' + config.database, {useMongoClient: true})

// start server
const server = app.listen(process.env.PORT || 8080, () => console.log('Listening at port', server.address().port))
