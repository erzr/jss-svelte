<script>
  import Layout from "./Layout.svelte";
  import { getSitecoreContext } from "jss-svelte";

  export let routeData = null;

  const sitecoreContext = getSitecoreContext();
  const route = routeData.sitecore.route;
  const itemId = routeData.sitecore.route.itemId;

  sitecoreContext.setSitecoreContext({
    route: route,
    itemId: itemId,
    ...routeData.sitecore.context
  });
</script>

<Layout route={route} sitecoreContext={sitecoreContext} />
