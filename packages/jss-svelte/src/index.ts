export {
    getChildPlaceholder,
    getFieldValue
} from '@sitecore-jss/sitecore-jss';
export { default as Placeholder } from './components/Placeholder.svelte';
export { default as Text } from './components/Text.svelte';
export { default as RichText } from './components/RichText.svelte';
export { default as Link } from './components/Link.svelte';
export { default as Image } from './components/Image.svelte';
export { default as DateField } from './components/DateField.svelte';
export { default as File } from './components/File.svelte';
export { default as VisitorIdentification } from './components/VisitorIdentification.svelte';
export {
    getComponentFactory,
    setComponentFactory,
    getInternationalizationContext,
    setInternationalizationContext,
    getSitecoreContext,
    setSitecoreContext,
    getGraphQLContext,
    setGraphQLContext
} from './contexts';
