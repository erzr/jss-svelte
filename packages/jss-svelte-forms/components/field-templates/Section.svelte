<script>
  export let field = null;
  export let fieldFactory = null;

  export let onChange = () => {};
  export let onButtonClick = () => {};

  const fieldComponents = field.fields.map(fieldFactory);
</script>

<fieldset>
  {#each fieldComponents as formComponent}
    <svelte:component this={formComponent.component} {...formComponent.props} />
  {/each}
</fieldset>
