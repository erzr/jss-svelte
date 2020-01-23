<script>
  import { Text, Placeholder } from "jss-svelte";

  export let rendering = null;
  export let fields = null;
  export let sitecoreContext = null;
</script>

<div class="pt-3" id={`i${rendering.uid.replace(/[{}]/g, '')}`}>
  <h3 class="border-bottom">
    <Text field={fields.heading} />
  </h3>
  <Placeholder name="jss-styleguide-section" {rendering} {sitecoreContext} />
</div>
