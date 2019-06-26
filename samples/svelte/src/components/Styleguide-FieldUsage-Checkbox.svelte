<script>
  import { getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
    fields,
    rendering
  };

  const checkbox2Value = getFieldValue(fields, "checkbox2", false);
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-fieldusage-checkbox">
  <ul>
    {#if fields && fields.checkbox && fields.checkbox.value}
      <li>
        <code>checkbox</code>
        is true
      </li>
    {/if}
    {#if !fields || !fields.checkbox || !fields.checkbox.value}
      <li>
        <code>checkbox</code>
        is false
      </li>
    {/if}
    {#if checkbox2Value}
      <li>
        <code>checkbox2</code>
        is true
      </li>
    {/if}
    {#if !checkbox2Value}
      <li>
        <code>checkbox2</code>
        is false
      </li>
    {/if}
  </ul>
</StyleguideSpecimen>
