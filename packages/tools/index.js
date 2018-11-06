const Express = require('express');
const bodyParser = require('body-parser');
const gramps = require('@gramps/gramps').default;
const { ApolloServer } = require('apollo-server-express');

const app = Express();
app.use(bodyParser.json());
const bootstrap = (ds) => {
  const GraphQLOptions = gramps({dataSources: [ ds ]});
  const server = new ApolloServer(GraphQLOptions());
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

module.exports = { bootstrap };