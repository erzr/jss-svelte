<script>
  import { Placeholder } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";
  import StyleguideLayoutReuseRenderEach from "./Styleguide-Layout-Reuse-RenderEach.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
    fields,
    rendering
  };
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-layout-reuse">
  <div class="row">
    <Placeholder
      {rendering}
      name="jss-reuse-example"
      renderEachComponent={StyleguideLayoutReuseRenderEach} />
  </div>
</StyleguideSpecimen>
