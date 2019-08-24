<script>
  import Layout from "./Layout.svelte";
  import { getSitecoreContext } from "jss-svelte";

  export let routeData = null;

  let sitecoreContext;
  let route;

  const handleRouteChange = () => {
    sitecoreContext = getSitecoreContext();
    route = routeData.sitecore.route;
    const itemId = routeData.sitecore.route.itemId;

    sitecoreContext.setSitecoreContext({
      route: route,
      itemId: itemId,
      ...routeData.sitecore.context
    });
  };

  $: routeData && handleRouteChange();
</script>

<Layout {route} {sitecoreContext} />
