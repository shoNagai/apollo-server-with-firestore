import * as firebaseTesting from '@firebase/testing';
import { ApolloServer, gql } from 'apollo-server-micro';
import { createTestClient } from 'apollo-server-testing';
import { importSchema } from 'graphql-import';
import FirestoreDatasource from '../../../datasources/firestoreDatasource';
import { Book, bookPath } from '../../../repositories/book';
import { resolvers } from '../../../resolvers';

const TIMEOUT = 20000;
jest.setTimeout(TIMEOUT);

const PROJECT_ID = `apollo-server-with-firestore`;

const adminApp = firebaseTesting.initializeAdminApp({ projectId: PROJECT_ID });

const firestore = adminApp.firestore();

const server = new ApolloServer({
  typeDefs: importSchema('src/schemas/schema.graphql'),
  resolvers: resolvers,
  dataSources: () => ({
    firestore: new FirestoreDatasource(firestore as any),
  }),
  introspection: true,
});

const BOOKS = gql`
  query books {
    books {
      id
      title
      author
    }
  }
`;

const NEW_BOOK: Book = {
  id: `I37BLody5Vj8Yux8vNg9`,
  title: `ブルーピリオド`,
  author: `山口つばさ`,
};

beforeEach(async () => {
  await firebaseTesting.clearFirestoreData({ projectId: PROJECT_ID });
});

afterEach(async () => {
  await firebaseTesting.clearFirestoreData({ projectId: PROJECT_ID });
});

afterAll(async () => {
  // firebaseとのlistnerを削除しないとテストが終了できない
  await Promise.all(firebaseTesting.apps().map((app) => app.delete()));
});

describe('book resolver e2e test', () => {
  describe('正常系', () => {
    beforeEach(async () => {
      const store = new FirestoreDatasource(firestore as any);
      await store.set(bookPath(), NEW_BOOK.id, NEW_BOOK);
    });

    it('書籍一覧のの取得', async () => {
      const { query } = createTestClient(server);
      const res = await query<{ books: Book[] }>({ query: BOOKS });

      expect(res.data?.books[0].id).toBe(NEW_BOOK.id);
      expect(res.data?.books[0].title).toBe(NEW_BOOK.title);
      expect(res.data?.books[0].author).toBe(NEW_BOOK.author);
    });
  });
});
