<script>
  import { Text, RichText } from "jss-svelte";
  export let sitecoreContext = null;
  export let fields = null;

  const displayTitle = sitecoreContext.pageEditing;
</script>

<div data-e2e-class="styleguide-layout-tabs-tab">
  {#if displayTitle}
    <Text tag="h5" field={fields.title} />
  {/if}
  <RichText field={fields.content} />
</div>
