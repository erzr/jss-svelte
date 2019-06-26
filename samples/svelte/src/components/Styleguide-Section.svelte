<script>
  import { Text, Placeholder } from "jss-svelte";

  export let rendering = null;
  export let fields = null;
</script>

<div class="pt-3" id={`i${rendering.uid.replace(/[{}]/g, '')}`}>
  <Text tag="h3" className="border-bottom" field={fields.heading} />
  <Placeholder name="jss-styleguide-section" {rendering} />
</div>
