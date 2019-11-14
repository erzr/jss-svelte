<script>
  import Label from "./Label.svelte";
  import FieldValidationErrors from "./FieldValidationErrors.svelte";

  export let field = null;
  export let value = [];
  export let onChange = null;
  export let tracker = null;
  export let errors = [];

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
  {#each field.model.items as item, index}
    <label key={item.itemId}>
      <input
        type="radio"
        className={field.model.cssClass}
        id={field.valueField.id + index}
        name={field.valueField.name}
        value={item.value}
        checked={value.some(v => v === item.value)}
        on:change={e => handleOnChange(field, e.target.value, onChange)}
        on:focus={() => tracker.onFocusField(field, value)}
        on:blur={() => tracker.onBlurField(field, value, errors)} />
      {item.text}
    </label>
  {/each}
  <FieldValidationErrors {...$$props} />
</slot>
