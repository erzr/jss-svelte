<script type="ts">
  import type {RouteData} from '@sitecore-jss/sitecore-jss';
  import { Placeholder, VisitorIdentification } from "jss-svelte";
  import Navigation from "./Navigation.svelte";

  export let route: RouteData;
</script>

<div id="JSS_LAYOUT">
  <Navigation />

  <div class="container">
    <Placeholder name="jss-main" rendering={route} />
  </div>

  <VisitorIdentification />
</div>
