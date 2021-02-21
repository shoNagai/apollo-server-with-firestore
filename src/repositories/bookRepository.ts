import { firestore } from 'firebase-admin';

type Book = {
  title: string;
  author: string;
};

export class BookRepository {
  constructor(private readonly db: firestore.Firestore) {}

  public getCollectionRef = () => {
    return this.db.collection('books');
  };

  public getAll = async () => {
    const snaps = await this.getCollectionRef().get();
    if (snaps.empty) return [];
    return snaps.docs.map((doc) => ({ ...(doc.data() as Book), id: doc.id }));
  };
}
