<script>
  import { onMount } from "svelte";
  import i18nInit from "./i18n";
  import App from "./App.svelte";

  export let graphQLClient = null;

  let dictionary = null;

  i18nInit().then(json => {
    dictionary = json;
  });
</script>

{#if dictionary}
  <App {graphQLClient} {dictionary} />
{/if}
