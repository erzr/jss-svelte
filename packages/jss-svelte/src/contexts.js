import { getContext, setContext } from "svelte";

export const SITECORE = {};
export const INTERNATIONALIZATION = {};
export const GRAPHQL = {};

export class SitecoreContext {

    constructor() {
        this.componentFactory = null;
        this.context = {};
    }

    setComponentFactory(factory) {
        this.componentFactory = factory;
    }

    setSitecoreContext(properties) {
        this.context = properties;
    }
}

export const getSitecoreContext = () => {
    const ctx = getContext(SITECORE);
    return ctx;
};

export const setSitecoreContext = (ctx) => {
    setContext(SITECORE, ctx);
};

export class InternationalizationContext {

    constructor(dictionary) {
        this.lang = dictionary.lang;
        this.dictionary = dictionary.phrases;
    }

    getTranslator() {
        return (key) => {
            return this.dictionary[key] || key;
        }
    }

}

export const getInternationalizationContext = () => {
    const ctx = getContext(INTERNATIONALIZATION);
    return ctx;
}

export const setInternationalizationContext = (ctx) => {
    setContext(INTERNATIONALIZATION, ctx);
};

export const getGraphQLContext = () => {
    const ctx = getContext(GRAPHQL);
    return ctx;
}

export const setGraphQLContext = (ctx) => {
    setContext(GRAPHQL, ctx);
};