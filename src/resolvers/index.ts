import { ApolloError } from 'apollo-server-micro';
import { BookRepository } from '../repositories/bookRepository';
import { Resolvers } from '../types/graphql';

export const resolvers: Resolvers = {
  Query: {
    async books(_, _args, { dataSources: { firestore } }) {
      try {
        const bookRepository = new BookRepository(firestore.db);
        return bookRepository.getAll();
      } catch (error) {
        console.error(error);
        throw new ApolloError(error);
      }
    },
  },
};
