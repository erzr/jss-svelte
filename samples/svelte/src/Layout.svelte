<script>
  import { Placeholder } from "jss-svelte";
  import Navigation from "./Navigation.svelte";

  export let route = {};
</script>

<div id="JSS_LAYOUT">
  <Navigation />

  <div class="container">
    <Placeholder name="jss-main" rendering={route} />
  </div>
</div>
