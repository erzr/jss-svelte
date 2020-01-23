<script>
  export let field = null;
  export let editable = true;
  export let encode = true;

  const hasField = field && (field.editable || field.value);

  let output;
  let setDangerously;

  if (hasField) {
    output = field.editable && editable ? field.editable : field.value;
    setDangerously = (field.editable && editable) || !encode;
  }
</script>

{#if hasField}
    {#if setDangerously}
      {@html output}
    {:else}{output}{/if}
{/if}
