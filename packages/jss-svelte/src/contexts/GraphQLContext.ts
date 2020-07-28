import { getContext, setContext } from "svelte";

export const GRAPHQL_CONTEXT = {};

export const getGraphQLContext = (): any => {
    const ctx = getContext(GRAPHQL_CONTEXT);
    return ctx;
};

export const setGraphQLContext = (ctx: any) => {
    setContext(GRAPHQL_CONTEXT, ctx);
};