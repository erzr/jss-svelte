<script>
  import { Text, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
    fields,
    rendering
  };
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-fieldusage-custom">
  <span><Text field={fields.customIntField} /></span>
</StyleguideSpecimen>
