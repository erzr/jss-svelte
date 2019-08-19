<script>
  import TagWrapper from './TagWrapper.svelte';

  export let field = null;
  export let editable = true;
  export let className = "";
  export let tag = "div";

  const hasField = field && (field.editable || field.value);

  let output = '';

  if (hasField) {
    output = hasField && field.editable && editable ? field.editable : field.value;
  }

  const tagProps = {
    tag,
    className
  };
</script>

{#if hasField}
    <TagWrapper {...tagProps}>
      {@html output}
    </TagWrapper>
{/if}
