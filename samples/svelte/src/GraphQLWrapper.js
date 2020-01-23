import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';

import introspectionQueryResultData from './temp/GraphQLFragmentTypes.json';

export default class GraphQLWrapper {

  constructor(endpoint, cachePromises, fetch = null, cacheState = null, includeCredentials = true) {
    this.cachePromises = cachePromises;
    this.promises = [];
    this.cache = cacheState || {};

    const linkOptions = {
      uri: endpoint
    }

    if (includeCredentials) {
      linkOptions['credentials'] = 'include';
    }

    if (fetch) {
      linkOptions['fetch'] = fetch;
    }

    this.client = new ApolloClient({
      cache: new InMemoryCache({
        fragmentMatcher: new IntrospectionFragmentMatcher({
          introspectionQueryResultData,
        }),
      }),
      link: new BatchHttpLink(linkOptions)
    });
  }

  getCache() {
    return this.cache;
  }

  readQuery(graphQlQuery, variables) {
    const query = { query: graphQlQuery, variables };
    const readQuery = this.client.readQuery(query);
    return !readQuery ? null : {
      data: readQuery
    };
  }

  runQuery(cacheKey, graphQlQuery, variables, callback) {
    const query = { query: graphQlQuery, variables };

    if (this.cache[cacheKey]) {
      const readQuery = this.cache[cacheKey];

      return {
        data: readQuery
      };
    }

    const queryPromise = this.client.query(query)
      .then(result => {
        this.cache[cacheKey] = result.data;
        if (callback) {
          callback(result);
        }
      });

    if (this.cachePromises) {
      this.promises.push(queryPromise);
    }
  }

  needsToWait() {
    return this.cachePromises && this.promises.length;
  }

  waitForPromises() {
    return Promise.all(this.promises);
  }
}