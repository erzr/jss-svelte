<script>
  import { Placeholder } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";
  import StyleguideLayoutReuseRenderEach from "./Styleguide-Layout-Reuse-RenderEach.svelte";
  import StyleguideLayoutReuseRenderEmpty from "./Styleguide-Layout-Reuse-RenderEmpty.svelte";

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
  <div class="row">
    <Placeholder
      {rendering}
      name="jss-reuse-example-empty"
      renderEmptyComponent={StyleguideLayoutReuseRenderEmpty} />
  </div>
</StyleguideSpecimen>
