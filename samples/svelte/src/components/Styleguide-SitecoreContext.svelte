<script>
  import { getFieldValue, getSitecoreContext } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const sitecoreContext = getSitecoreContext();

  const specimanProps = {
    fields,
    rendering
  };
</script>

<style>
    pre {
        max-height: 400px;
        overflow: scroll;
    }
</style>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-sitecore-context">
  <p>The current Sitecore Context is...</p>
  <pre>
     {JSON.stringify(sitecoreContext.context, null, 2)}
  </pre>
</StyleguideSpecimen>
