<script>
  import { onMount, getContext, setContext } from "svelte";
  import { dataFetcher } from "./dataFetcher";
  import {
    isExperienceEditorActive,
    dataApi
  } from "@sitecore-jss/sitecore-jss";
  import {
    getInternationalizationContext
  } from "jss-svelte";

  import config from "./temp/config";
  import i18nInit from "./i18n";
  import RouteHandler from "./RouteHandler.svelte";
  import Dictionary from "./Dictionary.svelte";

  export let path = null;
  export let routeData = null;
  export let router = {};
  export let params = null;
  export let dictionary = null;

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

    let paramLang = params.lang || config.defaultLanguage;
    let paramPath = params["sitecoreRoute"] || "/";

    return {
      path: paramPath,
      lang: paramLang
    };
  }

  const ensureDictionaryLoaded = lang => {
    const ctx = getInternationalizationContext();

    if (!ctx || ctx.lang !== lang) {
      return i18nInit(lang);
    }

    return Promise.resolve();
  };

  const sitecoreRouteData = getSitecorePathData();
  const sitecoreLang = sitecoreRouteData.lang;
  const sitecoreRoutePath = sitecoreRouteData.path;

  if (!dictionary) {
    ensureDictionaryLoaded(sitecoreLang)
      .then(json => (dictionary = json));
  }
  
  if (!routeData) {
    getRouteData(sitecoreRoutePath, sitecoreLang).then(
      json => (routeData = json)
    );
  }
</script>

{#if dictionary}
  <Dictionary {dictionary}>
    {#if routeData}
      <RouteHandler {routeData} />
    {/if}
  </Dictionary>
{/if}
