<script>
  import { onMount, getContext, setContext } from "svelte";
  import { dataFetcher } from "./dataFetcher";
  import {
    isExperienceEditorActive,
    dataApi
  } from "@sitecore-jss/sitecore-jss";
  import pathToRegexp from "path-to-regexp";

  import config from "./temp/config";
  import RouteHandler from "./RouteHandler.svelte";

  export let path = null;
  export let routeData = null;
  export let router = {};
  export let sitecoreContext = null;

  const sitecoreRoutePatterns = [
    "/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*",
    "/:lang([a-z]{2})/:sitecoreRoute*",
    "/:sitecoreRoute*"
  ];

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

  function getSitecorePathData() {
    if (path) {
      return path;
    }

    let sitecorePath = router.path;
    let sitecoreLang = config.defaultLanguage;

    if (!sitecorePath) {
      sitecorePath = `/${router.params._}`;
    }

    sitecoreRoutePatterns.forEach((sitecoreRoute) => {
      const regexpRoute = pathToRegexp(sitecoreRoute);
      const testResponse = regexpRoute.exec(sitecorePath);
      
      if (testResponse && testResponse.length === 3) {
        sitecoreLang = testResponse[1];
        sitecorePath = `/${testResponse[2]}`;
      }
    })

    return {
      path: sitecorePath,
      lang: sitecoreLang
    };
  }

  const sitecoreRouteData = getSitecorePathData();
  const sitecoreLang = sitecoreRouteData.lang;
  const sitecoreRoutePath = sitecoreRouteData.path;

  let promise = routeData
    ? null
    : getRouteData(sitecoreRoutePath, sitecoreLang);
</script>

{#if routeData}
  <RouteHandler {routeData} {sitecoreContext} />
{:else}
  {#await promise}
    <p>...waiting</p>
  {:then routeData}
    <RouteHandler {routeData} {sitecoreContext} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}
