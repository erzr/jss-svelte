<script>
  import { File, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
    fields,
    rendering
  };
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-fieldusage-file">
  <File field={fields.file} />
  <br />

  <File field={fields.file} target="_blank">Custom link body</File>
</StyleguideSpecimen>
