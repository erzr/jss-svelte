import { getContext, setContext } from "svelte";

export const COMPONENT_FACTORY = {};

export const getComponentFactory = (): any => {
    const ctx = getContext(COMPONENT_FACTORY);
    return ctx;
};

export const setComponentFactory = (ctx: any) => {
    setContext(COMPONENT_FACTORY, ctx);
};