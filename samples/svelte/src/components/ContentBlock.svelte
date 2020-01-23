<script>
  import { Text, RichText } from "jss-svelte";
  export let fields = null;
</script>

<div>
  <h2 class="display-4">
    <Text field={fields.heading} />
  </h2>
  <div class="contentDescription">
    <RichText field={fields.content} />
  </div>
</div>
