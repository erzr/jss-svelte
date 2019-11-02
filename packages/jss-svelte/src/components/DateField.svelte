<script>
  import TagWrapper from "./TagWrapper.svelte";

  export let field = null;
  export let editable = true;
  export let encode = true;
  export let tag = "span";
  export let className = "";
  export let render = null;
  export let renderComponent = null;

  const hasField = field && (field.editable || field.value);
  let output = field.editable && editable ? field.editable : field.value;
  const setDangerously = (field.editable && editable) || !encode;

  if (hasField) {
    if (render) {
      output = render(new Date(output));
    }
  }

  const tagProps = {
    tag,
    className
  };
</script>

{#if hasField}
  <TagWrapper {...tagProps}>
    {#if renderComponent}
      <svelt:component this={renderComponent} date={new Date(output)} />
    {:else if setDangerously}
      {@html output}
    {:else}{output}{/if}
  </TagWrapper>
{/if}
