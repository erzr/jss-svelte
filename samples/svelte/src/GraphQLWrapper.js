import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';

export default class GraphQLWrapper {

  constructor(endpoint, cachePromises) {
    this.cachePromises = cachePromises;
    this.promises = [];

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new BatchHttpLink({ uri: endpoint, credentials: 'include' })
    });
  }

  runQuery(graphQlQuery, variables) {
    const query = { query: graphQlQuery, variables };

    if (this.cacheOnly) {
      const readQuery = this.client.readQuery(query);

      return {
        data: readQuery
      };
    }

    const queryPromise = this.client.query(query);

    if (this.cachePromises) {
      this.promises.push(queryPromise);
    }

    return queryPromise;
  }

  needsToWait() {
    return this.cachePromises && this.promises.length;
  }

  waitForPromises() {
    return Promise.all(this.promises);
  }
}