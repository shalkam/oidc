const Express = require('express');
const bodyParser = require('body-parser');
const gramps = require('@gramps/gramps').default;
const users = require('@accounts/data-source-users');
const { ApolloServer } = require('apollo-server-express');

const app = Express();
const GraphQLOptions = gramps({dataSources: [ users ]});
const server = new ApolloServer(GraphQLOptions());
app.use(bodyParser.json());
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)