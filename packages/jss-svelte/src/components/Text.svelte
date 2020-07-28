<script type="ts">
  import type {Field} from '@sitecore-jss/sitecore-jss';

  export let field: Field<string>;
  export let editable = true;
  export let encode = true;

  const hasField = field && (field.editable || field.value);

  let output;
  let setDangerously;

  if (hasField) {
    output = field.editable && editable ? field.editable : field.value;
    setDangerously = (field.editable && editable) || !encode;
  }
  
  const tagProps = {
    ...$$props
  };

  delete tagProps['field'];
  delete tagProps['editable'];
</script>

{#if hasField}
  <span {...tagProps}>
    {#if setDangerously}
      {@html output}
    {:else}{output}{/if}
  </span>
{/if}
