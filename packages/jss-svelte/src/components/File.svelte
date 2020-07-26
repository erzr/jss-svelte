<script type="ts">
  import type { Field } from "@sitecore-jss/sitecore-jss";

  interface FileFieldValue {
    src?: string;
    title?: string;
    displayName?: string;
    [propName: string]: any;
  }

  interface FileField {
    value: FileFieldValue;
  }

  export let field: FileFieldValue | FileField = null;

  const linkProps = { ...$$props };
  delete linkProps["field"];

  const dynamicField: any = field;

  const isNotConfiguredProperly =
    !field || (!dynamicField.value && !dynamicField.src);

  let hasFile = false;
  let linkText = null;
  let href = null;

  if (!isNotConfiguredProperly) {
    const file = dynamicField.src ? field : dynamicField.value;

    if (file) {
      hasFile = true;
      linkText = file.title || file.displayName;
      href = file.src;
    }
  }
</script>

{#if hasFile}
  <a {href} {...linkProps}>
    <slot>{linkText}</slot>
  </a>
{/if}
