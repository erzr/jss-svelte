<script>
  import { RichText, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;
</script>

<StyleguideSpecimen {fields} {rendering} e2eId="styleguide-fieldusage-richtext">
  <RichText field={fields.sample} />

  <RichText
    field={fields.sample2}
    tag="section"
    editable={false}
    className="text-center" />
</StyleguideSpecimen>
