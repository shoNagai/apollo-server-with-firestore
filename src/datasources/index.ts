import * as admin from 'firebase-admin';
import Firestore from './firestore';

export interface DataSources {
  firestore: Firestore;
}

admin.initializeApp({
  databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
});

const dataSources = () => ({
  firestore: new Firestore(admin.firestore()),
});

export default dataSources;
