import { ApolloServer } from 'apollo-server-micro';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { send } from 'micro';
import { get, post, router } from 'microrouter';
import { resolvers } from './resolvers';

const schema = makeExecutableSchema({
  typeDefs: importSchema('src/schemas/schema.graphql'),
  resolvers,
});

const apolloServer = new ApolloServer({ schema });
const graphqlHandler = apolloServer.createHandler({ path: '/' });

module.exports = router(post('/', graphqlHandler), get('/', graphqlHandler), (_, res) => send(res, 404, 'Not Found'));
