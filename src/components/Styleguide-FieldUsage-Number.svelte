<script>
  import { Text, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
    fields,
    rendering
  };

  const fieldValue = getFieldValue(fields, "sample");
  const typeofFieldValue = typeof fieldValue;
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-fieldusage-number">
  <Text field={fields.sample} />

  <p>
    JS value type: {typeofFieldValue}
    <br />
    JS value: {fieldValue}
  </p>
</StyleguideSpecimen>
