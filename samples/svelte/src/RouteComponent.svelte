<script type="ts">
  import { onMount, getContext, setContext } from "svelte";
  import dataFetcher from "./dataFetcher";
  import {
    isExperienceEditorActive,
    dataApi,
    LayoutServiceData
  } from "@sitecore-jss/sitecore-jss";
  import { getInternationalizationContext } from "jss-svelte";
  import i18nInit from "./i18n";
  import RouteHandler from "./RouteHandler.svelte";
  import Dictionary from "./Dictionary.svelte";
  import config from "./temp/config";

  export let pathOverride: string = null;
  export let routeData: LayoutServiceData = null;
  export const router = {};
  export let params = null;
  export let dictionary = null;
  export const graphQLClient = null;

  export let previousRoute: string = null;
  export let previousLang: string = null;

  async function getRouteData(route, language): Promise<LayoutServiceData> {
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

  function getSitecorePathData(): {lang: string, path: string} {
    if (pathOverride) {
      return {
        lang: config.defaultLanguage,
        path: pathOverride
      };
    }

    let paramLang: string = params.lang || config.defaultLanguage;
    let paramPath: string = params.sitecoreRoute || "/";

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

  const shouldIssueRequest = (route: string, language: string): boolean => {
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
