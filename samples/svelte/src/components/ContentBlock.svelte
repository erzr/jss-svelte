<script type="ts">
  import type { Field } from "@sitecore-jss/sitecore-jss";
  import { Text, RichText } from "jss-svelte";

  type ContentBlockFields = {
    heading: Field<string>;
    content: Field<string>;
  };

  export let fields: ContentBlockFields;
</script>

<div>
  <h2 class="display-4">
    <Text field={fields.heading} />
  </h2>
  <div class="contentDescription">
    <RichText field={fields.content} />
  </div>
</div>
