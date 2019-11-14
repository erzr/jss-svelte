<script>
  import Label from "./Label.svelte";
  import FieldValidationErrors from "./FieldValidationErrors.svelte";

  export let field = null;
  export let value = [];
  export let tracker = null;
  export let errors = [];
  export let onChange = null;

  let finalValue = value;

  if (!field.model.multipleSelection) {
    finalValue = value[0];
  }

  function handleOnChange(field, options, callback) {
    let valid = true;
    const errorMessages = [];

    const newValues = [];

    for (let i = 0; i < options.length; i += 1) {
      if (options[i].selected) {
        newValues.push(options[i].value);
      }
    }

    // custom client validation logic here
    if (field.model.required && newValues.length === 0) {
      valid = false;
      errorMessages.push(`${field.model.title} is required`);
    }

    callback(field.valueField.name, newValues, valid, errorMessages);
  }
</script>

<div>
  <Label {...$$props} />
  <select
    className={field.model.cssClass}
    id={field.valueField.id}
    name={field.valueField.name}
    value={finalValue}
    size={field.model.rows}
    multiple={field.model.multipleSelection}
    on:change={e => handleOnChange(field, e.target.options, onChange)}
    on:focus={() => tracker.onFocusField(field, value)}
    on:blur={() => tracker.onBlurField(field, value, errors)}>
    {#each field.model.items as item}
      <option key={item.itemId} value={item.value}>{item.text}</option>
    {/each}
  </select>

  <FieldValidationErrors {...$$props} />
</div>
