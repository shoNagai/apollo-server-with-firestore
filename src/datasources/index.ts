import FirestoreDatasource from './firestoreDatasource';

export interface DataSources {
  firestore: FirestoreDatasource;
}
const dataSources = () => ({
  firestore: new FirestoreDatasource(),
});

export default dataSources;
