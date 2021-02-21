import { DataSource } from 'apollo-datasource';
import { firestore } from 'firebase-admin';

export default class Firestore extends DataSource {
  db: firestore.Firestore;

  constructor(firestore: firestore.Firestore) {
    super();
    this.db = firestore;
  }
}
