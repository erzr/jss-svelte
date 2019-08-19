<script>
  export let field = null;

  const dynamicField = field;

  const isNotConfiguredProperly =
    !field || (!dynamicField.value && !dynamicField.src);

  let hasFile = false;
  let linkText = null;
  let anchorAttrs = null;

  if (!isNotConfiguredProperly) {
    const file = dynamicField.src ? field : dynamicField.value;

    if (file) {
      hasFile = true;
      linkText = file.title || file.displayName;
      anchorAttrs = {
        href: file.src
      };
    }
  }
</script>

{#if hasFile}
  <a {...anchorAttrs}>
    <slot> {linkText} </slot>
  </a>
{/if}
