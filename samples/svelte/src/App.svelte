<script>
  import { Router, Link, Route } from "svero";
  import { setClient } from "svelte-apollo";

  import RouteComponent from "./RouteComponent.svelte";
  import { SitecoreContext } from "jss-svelte";

  import componentFactory from "./temp/componentFactory.js";

  export let path = null;
  export let routeData = null;
  export let graphQLClient = null;

  setClient(graphQLClient);

  export const routePatterns = [
    {pattern: "*"},
    {pattern: "/", exact: true}
  ]

  const sitecoreContext = new SitecoreContext();
  sitecoreContext.setComponentFactory(componentFactory);
</script>

{#if routeData}
  <RouteComponent path={path} routeData={routeData} sitecoreContext={sitecoreContext} />
{:else}
  <Router>
    {#each routePatterns as routePattern}
      <Route path={routePattern.pattern} exact={routePattern.exact} nofallback let:router>
        <RouteComponent router={router} sitecoreContext={sitecoreContext} />
      </Route>
    {/each}
  </Router>
{/if}
