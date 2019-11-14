<script>
  export let field = null;
  export let onButtonClick = null;
</script>

<slot>
  <button
    type="submit"
    value={field.model.title}
    name={field.buttonField.name}
    id={field.buttonField.id}
    on:click={() => onButtonClick(field.buttonField.name)}>
    {field.model.title}
  </button>
</slot>
