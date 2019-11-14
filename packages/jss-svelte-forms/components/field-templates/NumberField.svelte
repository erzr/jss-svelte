<script>
  import Label from "./Label.svelte";
  import FieldValidationErrors from "./FieldValidationErrors.svelte";

  export let field = null;
  export let value = null;
  export let onChange = null;
  export let tracker = null;
  export let errors = null;

  function handleOnChange(field, fieldValue, callback) {
    let valid = true;
    const errorMessages = [];

    // custom client validation logic here
    if (field.model.required && !fieldValue) {
      valid = false;
      errorMessages.push(`${field.model.title} is required`);
    }

    callback(field.valueField.name, fieldValue, valid, errorMessages);
  }
</script>

<slot>
  <Label {...$$props} />
  <input
    type="number"
    class={field.model.cssClass}
    id={field.valueField.id}
    name={field.valueField.name}
    {value}
    rows={field.model.rows}
    maxlength={field.model.maxLength}
    placeholder={field.model.placeholderText}
    on:change={e => handleOnChange(field, e.target.value, onChange)}
    on:focus={() => tracker.onFocusField(field, value)}
    on:blur={() => tracker.onBlurField(field, value, errors)} />
  <FieldValidationErrors {...$$props} />
</slot>
