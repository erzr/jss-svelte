import AppRoot from './AppRoot.svelte';
import config from './temp/config';
import ApolloClient from 'apollo-boost';

const graphQLClient = new ApolloClient({ uri: config.graphQLEndpoint });

const app = new AppRoot({
	target: document.getElementById('root'),
	props: {
		graphQLClient
	}
});

export default app;