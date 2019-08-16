<script>
  import Layout from "./Layout.svelte";

  export let routeData = null;
  export let sitecoreContext = null;

  const route = routeData.sitecore.route;
  const itemId = routeData.sitecore.route.itemId;

  sitecoreContext.setSitecoreContext({
    route: route,
    itemId: itemId,
    ...routeData.sitecore.context
  });
</script>

<Layout route={route} sitecoreContext={sitecoreContext} />
