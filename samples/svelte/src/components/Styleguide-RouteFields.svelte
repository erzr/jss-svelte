<script>
  import { Text, Link, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
      fields,
      rendering
  }
</script>

  <StyleguideSpecimen {...specimanProps} e2eId="styleguide-route-fields">
    <p>
      Route level <code>pageTitle</code> field:{' '}
    </p>
    <p>
      <a href="/styleguide/custom-route-type">Sample of using a custom route type</a>
    </p>
  </StyleguideSpecimen>