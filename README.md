# apollo-server-with-firestore

Getting started with GraphQL on apollo-server-micro 🚀

## Installation

```
$ git clone https://github.com/shoNagai/apollo-server-with-firestore.git
$ cd apollo-server-with-firestore
$ yarn install

# 実行にはGCPにてサービスアカウント（Firestoreの参照権限を持ってること）の鍵をダウンロードし、
# `./.key/service_account.json`に配置してください

$ yarn dev
```

## Generate types

```
$ yarn generate
```

```
src/types/graphql.ts
```

## Run Test

```
$ yarn emulators:start
$ yarn test:local
```
