import express from 'express'
import jwt from'express-jwt';
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'

import schema from './graphql'
import cors from 'cors'

var app = express()

app.use('/graphql', jwt({
  secret: 'shhhhhhared-secret',
  requestProperty: 'auth',
  credentialsRequired: false,
}))

// GraphqQL server route
app.use('/graphql', cors(), graphqlHTTP(req => ({
  schema, //o schema esta fragmentado em toda pasta graphql
  pretty: true, //?
  graphiql: true //interface para testar as funcoes no /graphql
})))

// Connect mongo database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/batfinancas', {useMongoClient: true})

// start server 
var server = app.listen(process.env.PORT || 8080, () => console.log('Listening at port', server.address().port))
