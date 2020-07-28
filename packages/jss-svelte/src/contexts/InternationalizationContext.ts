import { getContext, setContext } from "svelte";

export const INTERNATIONALIZATION = {};

export const getInternationalizationContext = () => {
    const ctx = getContext(INTERNATIONALIZATION);
    return ctx;
}

export const setInternationalizationContext = (ctx) => {
    setContext(INTERNATIONALIZATION, ctx);
};