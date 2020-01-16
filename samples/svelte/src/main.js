import App from './App.svelte';
import config from './temp/config';
import GraphQLWrapper from './GraphQLWrapper';

const JSS_STATE_EL = document.getElementById('__JSS_STATE__');
const CACHE_STATE_EL = document.getElementById('__CACHE_STATE__');
const JSS_STATE = JSS_STATE_EL ? JSON.parse(JSS_STATE_EL.innerHTML) : null;
const CACHE_STATE = CACHE_STATE_EL ? JSON.parse(CACHE_STATE_EL.innerHTML) : null;
const RENDER_TARGET_ID = JSS_STATE ? 'JSS_APP' : 'root';

const graphQLClient = new GraphQLWrapper(config.graphQLEndpoint, false, fetch, CACHE_STATE);

let dictionary = null;

if (JSS_STATE) {
	const {viewBag} = JSS_STATE;
	dictionary = viewBag.dictionary;
}

const app = new App({
	target: document.getElementById(RENDER_TARGET_ID),
	hydrate: JSS_STATE != null,
	props: {
		graphQLClient,
		dictionary,
		routeData: JSS_STATE
	}
});

export default app;