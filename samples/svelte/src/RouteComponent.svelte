<script>
  import { onMount, getContext, setContext } from "svelte";
  import { dataFetcher } from "./dataFetcher";
  import {
    isExperienceEditorActive,
    dataApi
  } from "@sitecore-jss/sitecore-jss";
  import { getInternationalizationContext } from "jss-svelte";

  import config from "./temp/config";
  import i18nInit from "./i18n";
  import RouteHandler from "./RouteHandler.svelte";
  import Dictionary from "./Dictionary.svelte";

  export let pathOverride = null;
  export let routeData = null;
  export const router = {};
  export let params = null;
  export let dictionary = null;
  export const graphQLClient = null;

  export let previousRoute = null;
  export let previousLang = null;

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
    if (pathOverride) {
      return {
        lang: config.defaultLanguage,
        path: pathOverride
      };
    }

    let paramLang = params.lang || config.defaultLanguage;
    let paramPath = params.sitecoreRoute || "/";

    return {
      path: paramPath,
      lang: paramLang
    };
  }

  const ensureDictionaryLoaded = lang => {
    const i18Context = getInternationalizationContext();

    if (!i18Context || i18Context.lang !== lang) {
      return i18nInit(lang);
    }

    return Promise.resolve({
      lang,
      phrases: i18Context.dictionary
    });
  };

  const shouldIssueRequest = (route, language) => {
    // if we're changing languages
    if (previousLang && previousLang !== language) {
      return true;
    }

    // first load without SSR
    if (!routeData && !previousRoute) {
      return true;
    }

    // if a link is clicked
    if (!routeData || (previousRoute && route !== previousRoute)) {
      return true;
    }
  };

  const handleRouteChange = () => {
    const sitecoreRouteData = getSitecorePathData();

    const sitecoreLang = sitecoreRouteData.lang;
    const sitecoreRoutePath = sitecoreRouteData.path;

    if (!previousRoute) {
      previousRoute = sitecoreRoutePath;
    }

    if (!previousLang) {
      previousLang = sitecoreLang;
    }

    const issueRequest = shouldIssueRequest(sitecoreRoutePath, sitecoreLang);

    if (!issueRequest) {
      return;
    }

    previousLang = sitecoreLang;
    previousRoute = sitecoreRoutePath;

    getRouteData(sitecoreRoutePath, sitecoreLang).then(json => {
      routeData = json;
    });

    if (!dictionary) {
      ensureDictionaryLoaded(sitecoreLang).then(json => (dictionary = json));
    }
  };

  $: {
    params && handleRouteChange();
  }
</script>

{#if dictionary}
  <Dictionary {dictionary}>
    {#if routeData}
      <RouteHandler {routeData} />
    {/if}
  </Dictionary>
{/if}
