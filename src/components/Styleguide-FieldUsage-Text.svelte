<script>
  import { Text, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;
</script>

<StyleguideSpecimen {fields} {rendering} e2eId="styleguide-fieldusage-text">
  <Text field={fields.sample} />

  <Text
    field={fields.sample2}
    tag="section"
    editable={false}
    encode={false}
    className="font-weight-bold" />

  <div>Raw value (not editable): {getFieldValue(fields, 'sample')}</div>
</StyleguideSpecimen>
