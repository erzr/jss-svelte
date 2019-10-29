<script>
  import { Router, Link, Route } from "svelte-routing";

  import RouteComponent from "./RouteComponent.svelte";
  import { setSitecoreContext, SitecoreContext } from "jss-svelte";
  import {
    InternationalizationContext,
    setInternationalizationContext,
    setGraphQLContext
  } from "jss-svelte";

  import componentFactory from "./temp/componentFactory.js";

  export let path = null;
  export let routeData = null;
  export let graphQLClient = null;
  export let dictionary = null;

  export const routePatterns = [
    "/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*",
    "/:lang([a-z]{2})/:sitecoreRoute*",
    "/:sitecoreRoute*"
  ];

  if (dictionary) {
    const context = new InternationalizationContext(dictionary);
    setInternationalizationContext(context);
  }

  if (graphQLClient) {
    setGraphQLContext(graphQLClient);
  }

  const sitecoreContext = new SitecoreContext();
  sitecoreContext.setComponentFactory(componentFactory);
  setSitecoreContext(sitecoreContext);
</script>

<div id="JSS_APP">
  <Router>
    {#each routePatterns as routePattern}
      <Route path={routePattern} let:params>
        <RouteComponent pathOverride={path} {params} {routeData} {dictionary} />
      </Route>
    {/each}
  </Router>
</div>