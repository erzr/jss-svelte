<script>
  import { Placeholder, getSitecoreContext } from "jss-svelte";

  export let rendering = null;
  
  const sitecoreContext = getSitecoreContext();

  const disconnectedMode =
    sitecoreContext.context.itemId === "available-in-connected-mode";
</script>

<div data-e2e-id="graphql-layout">
  {#if disconnectedMode}
    <div>
      <p>
        This app is running in disconnected mode. GraphQL requires connected
        mode, headless connected mode, or integrated mode to work.
      </p>
      <p>
        Libraries such as
        <code>graphql-tools</code>
        can provide GraphQL API mocking capabilities, which could enable
        disconnected GraphQL. This is not supported out of the box, however.
      </p>
      <p>
        To view the GraphQL samples, restart the app using
        <code>jss start:connected</code>
          or deploy the app to Sitecore to run in integrated mode per the JSS
        documentation.
      </p>
    </div>
  {:else}
    <Placeholder name="jss-graphql-layout" {rendering} {sitecoreContext} />
  {/if}
</div>
