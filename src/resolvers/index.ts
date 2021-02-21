import mockData from '../mocks/book.json';
import { Resolvers } from '../types/graphql';

export const resolvers: Resolvers = {
  Query: {
    books: () => mockData,
  },
};
