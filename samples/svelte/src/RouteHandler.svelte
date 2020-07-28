<script type="ts">
  import Layout from "./Layout.svelte";
  import { setSitecoreContext } from "jss-svelte";
  import type { LayoutServiceData } from "@sitecore-jss/sitecore-jss";

  export let routeData: LayoutServiceData = null;

  const handleRouteChange = () => {
    setSitecoreContext(routeData);
  };

  $: {
    routeData && handleRouteChange();
  }
</script>

<Layout route={routeData.sitecore.route} />
