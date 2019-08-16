<script>
  import { Text, Placeholder } from "jss-svelte";

  export let rendering = null;
  export let fields = null;
  export let sitecoreContext = null;
</script>

<div class="pt-3" id={`i${rendering.uid.replace(/[{}]/g, '')}`}>
  <Text tag="h3" className="border-bottom" field={fields.heading} />
  <Placeholder name="jss-styleguide-section" {rendering} {sitecoreContext} />
</div>
