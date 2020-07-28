<script type="ts">
  import type {Field} from '@sitecore-jss/sitecore-jss';

  export let field: Field<string> = null;
  export let editable = true;

  const hasField = field && (field.editable || field.value);

  let output = '';

  if (hasField) {
    output = hasField && field.editable && editable ? field.editable : field.value;
  }

  const tagProps = {
    ...$$props
  };

  delete tagProps['field'];
  delete tagProps['editable'];
</script>

{#if hasField}
    <div {...tagProps}>{@html output}</div>
{/if}
