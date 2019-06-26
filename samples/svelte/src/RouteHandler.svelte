<script>
  import Layout from "./Layout.svelte";
  import { getSitecoreContext } from "jss-svelte";

  export let routeData = null;

  const route = routeData.sitecore.route;
  const itemId = routeData.sitecore.route.itemId;

  const sitecoreContext = getSitecoreContext();

  sitecoreContext.setSitecoreContext({
    route: route,
    itemId: itemId,
    ...routeData.sitecore.context
  });
</script>

<Layout {route} />
