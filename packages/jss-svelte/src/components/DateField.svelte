<script type="ts">
  import type { Field } from "@sitecore-jss/sitecore-jss";

  export let field: Field<string> = null;
  export let editable = true;
  export let encode = true;
  export let render: (date: Date) => string = null;
  export let renderComponent = null;

  const hasField = field && (field.editable || field.value);

  let setDangerously;
  let output;

  if (hasField) {
    setDangerously = (field.editable && editable) || !encode;
    output = field.editable && editable ? field.editable : field.value;

    if (render) {
      output = render(output ? new Date(output) : null);
    }
  }
</script>

{#if hasField}
  {#if renderComponent}
    <svelte:component this={renderComponent} date={new Date(output)} />
  {:else if setDangerously}
    {@html output}
  {:else}{output}{/if}
{/if}
