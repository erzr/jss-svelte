<script>
  import { Placeholder } from "jss-svelte";
  import Navigation from "./Navigation.svelte";

  export let route = {};
  export let sitecoreContext = null;
</script>

<Navigation />

<div class="container">
  <Placeholder name="jss-main" rendering={route} sitecoreContext={sitecoreContext} />
</div>
