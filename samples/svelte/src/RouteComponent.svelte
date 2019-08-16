<script>
  import { onMount, getContext, setContext } from "svelte";
  import { dataFetcher } from "./dataFetcher";
  import {
    isExperienceEditorActive,
    dataApi
  } from "@sitecore-jss/sitecore-jss";

  import config from "./temp/config";
  import RouteHandler from "./RouteHandler.svelte";

  export let path = null;
  export let routeData = null;
  export let router = {};
  export let sitecoreContext = null;

  async function getRouteData(route, language) {
    const fetchOptions = {
      layoutServiceConfig: { host: config.sitecoreApiHost },
      querystringParams: {
        sc_lang: language,
        sc_apikey: config.sitecoreApiKey
      },
      fetcher: dataFetcher
    };

    return dataApi.fetchRouteData(route, fetchOptions).catch(error => {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data
      ) {
        return error.response.data;
      }

      console.error("Route data fetch error", error, error.response);

      return null;
    });
  }

  function getSitecorePath() {
    if (path) {
      return path;
    }

    let sitecorePath = router.params && router.params.sitecoreRoute ? router.params.sitecoreRoute : '/';

    if (router.params && router.params.splat) {
      sitecorePath +=  `/${router.params.splat}`;
    }

    return sitecorePath;
  }

  let sitecoreLang = router.params && router.params.lang ? router.params.lang : "en"; 
  let sitecoreRoutePath = getSitecorePath();

  if (!sitecoreRoutePath.startsWith("/")) {
    sitecoreRoutePath = `/${sitecoreRoutePath}`;
  }

  let promise = routeData ? null : getRouteData(sitecoreRoutePath, sitecoreLang);
</script>

{#if routeData}
  <RouteHandler routeData={routeData} sitecoreContext={sitecoreContext} />
{:else}
  {#await promise}
    <p>...waiting</p>
  {:then routeData}
    <RouteHandler routeData={routeData} sitecoreContext={sitecoreContext} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}