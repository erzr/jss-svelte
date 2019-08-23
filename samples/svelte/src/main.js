import App from './App.svelte';
import config from './temp/config';
import GraphQLWrapper from './GraphQLWrapper';

const graphQLClient = new GraphQLWrapper(config.graphQLEndpoint);

const app = new App({
	target: document.getElementById('root'),
	props: {
		graphQLClient
	}
});

export default app;