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

  function formatValue(value) {
    // dates are serialized from the API as full date/times (i.e. 2019-01-11T00:00:00)
    // but the date input expects only the date. Since the format is predictably long,
    // we can just take a substring.

    if (!value || value.length < 10) {
      return value;
    }
    return value.substring(0, 10);
  }
</script>

<slot>
  <Label {...$$props} />
  <input
    type="date"
    className={field.model.cssClass}
    id={field.valueField.id}
    name={field.valueField.name}
    value={formatValue(value)}
    min={formatValue(field.model.min)}
    max={formatValue(field.model.max)}
    on:change={e => handleOnChange(field, e.target.checked, onChange)}
    on:focus={() => tracker.onFocusField(field, value)}
    on:blur={() => tracker.onBlurField(field, value, errors)} />
  <FieldValidationErrors {...$$props} />
</slot>
