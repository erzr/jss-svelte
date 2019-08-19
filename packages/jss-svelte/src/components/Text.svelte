<script>
  import TagWrapper from "./TagWrapper.svelte";

  export let field = null;
  export let editable = true;
  export let encode = true;
  export let tag = "span";
  export let className = '';

  const hasField = field && (field.editable || field.value);
  const output = field.editable && editable ? field.editable : field.value;
  const setDangerously = (field.editable && editable) || !encode;

  const tagProps = {
    tag,
    className
  };
</script>

{#if hasField}
  <TagWrapper {...tagProps}>
    {#if setDangerously}
      {@html output}
    {:else}{output}{/if}
  </TagWrapper>
{/if}
