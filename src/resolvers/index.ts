import { ApolloError } from 'apollo-server-micro';
import { Book, bookPath } from '../repositories/book';
import { Resolvers } from '../types/graphql';

export const resolvers: Resolvers = {
  Query: {
    async books(_, _args, { dataSources: { firestore } }) {
      try {
        return firestore.getAll<Book>(bookPath());
      } catch (error) {
        console.error(error);
        throw new ApolloError(error);
      }
    },
  },
};
