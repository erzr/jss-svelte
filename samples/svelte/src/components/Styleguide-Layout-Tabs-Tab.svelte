<script>
  import { Text, RichText } from "jss-svelte";
  export let sitecoreContext = null;
  export let fields = null;

  const displayTitle = sitecoreContext.pageEditing;
</script>

<div data-e2e-class="styleguide-layout-tabs-tab">
  {#if displayTitle}
    <h5>
      <Text field={fields.title} />
    </h5>
  {/if}
  <div>
    <RichText field={fields.content} />
  </div>
</div>
