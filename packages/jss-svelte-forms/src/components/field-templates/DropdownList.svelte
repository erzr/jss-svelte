<script>
  import Label from "./Label.svelte";
  import FieldValidationErrors from "./FieldValidationErrors.svelte";

  export let field = null;
  export let value = [];
  export let tracker = null;
  export let errors = [];
  export let onChange = null;

  function handleOnChange(field, newValue, callback) {
    let valid = true;
    const errorMessages = [];

    // custom client validation logic here
    if (field.model.required && !newValue) {
      valid = false;
      errorMessages.push(`${field.model.title} is required`);
    }

    callback(field.valueField.name, [newValue], valid, errorMessages);
  }
</script>

<slot>
  <Label {...$$props} />
  <select
    className={field.model.cssClass}
    id={field.valueField.id}
    name={field.valueField.name}
    value={value[0]}
    on:change={e => handleOnChange(field, e.target.value, onChange)}
    on:focus={() => tracker.onFocusField(field, value)}
    on:blur={() => tracker.onBlurField(field, value, errors)}>
    {#if field.model.showEmptyItem}
      <option label=" " />
    {/if}

    {#each field.model.items as item}
      <option key={item.itemId} value={item.value}>{item.text}</option>
    {/each}
  </select>

  <FieldValidationErrors {...$$props} />
</slot>
