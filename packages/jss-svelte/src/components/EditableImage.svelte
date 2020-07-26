<script type="ts">
  import { mediaApi } from "@sitecore-jss/sitecore-jss";

  export let editable: string = null;

  const foundImg = mediaApi.findEditorImageTag(editable);
</script>

{#if foundImg}
  <span class="sc-image-wrapper">
    {@html editable}
  </span>
{/if}
