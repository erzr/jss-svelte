<script>
  import { Router, Link, Route } from "svelte-routing";
  import { setClient } from "svelte-apollo";
  import pathToRegexp from "path-to-regexp";

  import RouteComponent from "./RouteComponent.svelte";
  import { setSitecoreContext, SitecoreContext } from "jss-svelte";
  import {
    InternationalizationContext,
    setInternationalizationContext
  } from "jss-svelte";

  import componentFactory from "./temp/componentFactory.js";

  export let path = null;
  export let routeData = null;
  export let graphQLClient = null;
  export let dictionary = null;

  setClient(graphQLClient);

  export const routePatterns = [
    "/:lang/:sitecoreRoute*",
    "/:lang/:sitecoreRoute*",
    "/:sitecoreRoute*",
    "/"
  ];

  if (dictionary) {
    const context = new InternationalizationContext(dictionary);
    setInternationalizationContext(context);
  }

  const sitecoreContext = new SitecoreContext();
  sitecoreContext.setComponentFactory(componentFactory);
  setSitecoreContext(sitecoreContext);
</script>

{#if routeData}
  <RouteComponent {path} {routeData} />
{:else}
  <Router>
    {#each routePatterns as routePattern}
      <Route path={routePattern} let:params>
        <RouteComponent params={params} />
      </Route>
    {/each}
  </Router>
{/if}
