<script>
    import i18nInit from './i18n';
    import App from './App.svelte';

    export let graphQLClient = null;

    let dictionary = null;

    const promise = i18nInit()
        .then(json => dictionary = json);
</script>

{#if dictionary}
    <App graphQLClient={graphQLClient} />
{/if}