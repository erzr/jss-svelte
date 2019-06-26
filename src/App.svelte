<script>
  import { Router, Link, Route } from "svero";
  import { setClient } from "svelte-apollo";

  import RouteComponent from "./RouteComponent.svelte";
  import { getSitecoreContext } from "jss-svelte";

  import componentFactory from "./temp/componentFactory.js";

  export let path = null;
  export let routeData = null;
  export let graphQLClient = null;

  setClient(graphQLClient);

  export const routePatterns = [
    "/",
    "/:sitecoreRoute",
    "/:sitecoreRoute/*splat",
    "/:lang<[a-z]{2}>/*sitecoreRoute",
    "/:lang<[a-z]{2}-[A-Z]{2}>/*sitecoreRoute"
  ]

  const sitecoreContext = getSitecoreContext();
  sitecoreContext.setComponentFactory(componentFactory);
</script>

{#if routeData}
  <RouteComponent {path} {routeData} {sitecoreContext} />
{:else}
  <Router>
    {#each routePatterns as routePattern}
      <Route path={routePattern} component={RouteComponent} />
    {/each}
  </Router>
{/if}
