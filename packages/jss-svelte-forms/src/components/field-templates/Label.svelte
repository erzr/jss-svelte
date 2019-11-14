<script>
  export let field = null;
  export let isValid = null;

  let className = field.model.labelCssClass;

  if (!isValid) {
    className += " invalid";
  }
</script>

<label for={field.valueField.id} class={className}>
  <slot />
  {field.model.title}
</label>
