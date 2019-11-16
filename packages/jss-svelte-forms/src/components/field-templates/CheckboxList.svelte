<script>
  import Label from "./Label.svelte";
  import FieldValidationErrors from "./FieldValidationErrors.svelte";

  export let field = null;
  export let value = [];
  export let errors = [];
  export let onChange = null;
  export let tracker = null;

  function handleOnChange(
    field,
    originalFieldValue,
    changedElement,
    checked,
    callback
  ) {
    // we can have multiple selected values. So we need to push ALL the selected
    // values back up to the root form. This is done using an array, which the form
    // serializer knows how to expand into multiple values on post

    let value = originalFieldValue;

    if (checked) {
      value.push(changedElement);
    } else {
      value = value.filter(v => v !== changedElement);
    }

    // (fieldName, fieldValue, isValid, validationErrors)
    callback(field.valueField.name, value, true, []);
  }
</script>

<slot>
  <Label {...$$props} />
  {#each field.model.items as item, index}
    <label key={item.itemId}>
      <input
        type="checkbox"
        className={field.model.cssClass}
        id={field.valueField.id + index}
        name={field.valueField.name}
        value={item.value}
        checked={value.some(v => v === item.value)}
        on:change={e => handleOnChange(field, value, e.target.value, e.target.checked, onChange)}
        on:focus={() => tracker.onFocusField(field, value)}
        on:blur={() => tracker.onBlurField(field, value, errors)} />
      {item.text}
    </label>
  {/each}
  <FieldValidationErrors {...$$props} />
</slot>
