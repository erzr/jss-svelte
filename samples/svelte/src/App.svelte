<script type="ts">
  import { Router, Link, Route } from "svelte-routing";
  import RouteComponent from "./RouteComponent.svelte";
  import {
    setSitecoreContext,
    setInternationalizationContext,
    setGraphQLContext
  } from "jss-svelte";
  import componentFactory from "./temp/componentFactory";
  import type { LayoutServiceData } from "@sitecore-jss/sitecore-jss";

  export let routeData: LayoutServiceData = null;
  export let graphQLClient = null;
  export let dictionary = null;

  export const routePatterns = [
    "/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*",
    "/:lang([a-z]{2})/:sitecoreRoute*",
    "/:sitecoreRoute*",
  ];

  if (dictionary) {
    setInternationalizationContext(dictionary);
  }

  if (graphQLClient) {
    setGraphQLContext(graphQLClient);
  }

  if (routeData) {
    setSitecoreContext(routeData);
  }
</script>

<div id="JSS_APP">
  <Router>
    {#each routePatterns as routePattern}
      <Route path={routePattern} component={RouteComponent} />
    {/each}
  </Router>
</div>
