import App from './App.svelte';
import config from './temp/config';
import ApolloClient from 'apollo-boost';  

const graphQLClient = new ApolloClient({ uri: config.graphQLEndpoint });

const app = new App({
	target: document.getElementById('root'),
	props: {
		graphQLClient
	}
});

export default app;