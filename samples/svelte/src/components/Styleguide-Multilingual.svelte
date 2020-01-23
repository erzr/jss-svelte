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

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-multilingual">
  <p><Text field={fields.sample} encode={false} /></p>

  <p>
    <a href="/en/styleguide">Show in English</a>
    <br />
    <a href="/da-DK/styleguide">Show in Danish</a>
  </p>
</StyleguideSpecimen>
