import * as admin from 'firebase-admin';
import FirestoreDatasource from './firestoreDatasource';

export interface DataSources {
  firestore: FirestoreDatasource;
}

admin.initializeApp({
  databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
});

const dataSources = () => ({
  firestore: new FirestoreDatasource(admin.firestore()),
});

export default dataSources;
