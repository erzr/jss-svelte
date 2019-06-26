<script>
  import { Text, RichText } from "jss-svelte";
  export let fields = null;
</script>

<div>
  <Text tag="h2" className="display-4" field={fields.heading} />
  <RichText className="contentDescription" field={fields.content} />
</div>
