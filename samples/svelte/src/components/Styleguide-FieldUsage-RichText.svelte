<script>
  import { RichText, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;
</script>

<StyleguideSpecimen {fields} {rendering} e2eId="styleguide-fieldusage-richtext">
  <div>
    <RichText field={fields.sample} />
  </div>

  <section class="text-center">
    <RichText
      field={fields.sample2}
      editable={false} />
  </section>
</StyleguideSpecimen>
