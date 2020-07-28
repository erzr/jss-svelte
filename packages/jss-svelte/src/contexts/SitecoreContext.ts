import { getContext, setContext } from "svelte";
import type {
    LayoutServiceData,
    LayoutServiceContextData,
    RouteData
} from "@sitecore-jss/sitecore-jss";

export const SITECORE = {};

export type SitecoreContext = LayoutServiceContextData & {
    route: RouteData;
    itemid: string;
} 

export const getSitecoreContext = (): SitecoreContext => {
    const ctx = getContext(SITECORE);
    return ctx;
};

export const setSitecoreContext = (ctx: LayoutServiceData) => {
    setContext(SITECORE, {
        route: ctx.sitecore.route,
        itemId: ctx.sitecore.route.itemId,
        ...ctx.sitecore.context
    });
};