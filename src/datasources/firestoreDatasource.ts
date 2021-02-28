import { DataSource } from 'apollo-datasource';
import { firestore } from 'firebase-admin';
import { getDocData } from '../utils/getDocData';

export default class FirestoreDatasource extends DataSource {
  public db: firestore.Firestore;

  constructor(firestore: firestore.Firestore) {
    super();
    this.db = firestore;
  }

  public get = async <T>(collectionPath: string, docId: string) => {
    const snap = await this.db.collection(collectionPath).doc(docId).get();
    if (!snap.exists) return undefined;
    return getDocData<T>(snap);
  };

  public set = async <T>(collectionPath: string, docId: string, data: T) => {
    await this.db.collection(collectionPath).doc(docId).set(data);
  };

  public add = async <T>(collectionPath: string, data: T) => {
    return this.db.collection(collectionPath).add(data);
  };

  public update = async <T>(collectionPath: string, docId: string, data: Partial<T>) => {
    await this.db.collection(collectionPath).doc(docId).update(data);
  };

  public getAll = async <T>(collectionPath: string) => {
    const snaps = await this.db.collection(collectionPath).get();
    if (snaps.empty) return [];
    return snaps.docs.map((doc) => getDocData<T>(doc));
  };

  public getQueryResults = async <T>(query: FirebaseFirestore.Query) => {
    const snaps = await query.get();
    if (snaps.empty) return [];
    return snaps.docs.map((doc) => getDocData<T>(doc));
  };
}
