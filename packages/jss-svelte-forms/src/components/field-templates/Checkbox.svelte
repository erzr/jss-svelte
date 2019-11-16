<script>
  export let field = null;
  export let value = null;
  export let handleOnChange = null;
  export let onChange = null;
  export let tracker = null;
  export let errors = null;
</script>

<slot>
  <input
    type="checkbox"
    className={field.model.cssClass}
    id={field.valueField.id}
    name={field.valueField.name}
    value="true"
    checked={value}
    on:change={e => handleOnChange(field, e.target.checked, onChange)}
    on:focus={() => tracker.onFocusField(field, value)}
    on:blur={() => tracker.onBlurField(field, value, errors)} />
</slot>