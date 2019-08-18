<script>
  import { onMount } from "svelte";
  import i18nInit from "./i18n";
  import App from "./App.svelte";

  export let graphQLClient = null;
</script>

<App graphQLClient={graphQLClient} />
