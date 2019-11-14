<script>
  import "cross-fetch/polyfill";
  import {
    serializeForm,
    instanceOfValueFormField,
    getFieldValueFromModel,
    submitForm,
    FormTracker
  } from "@sitecore-jss/sitecore-jss-forms";
  import DefaultFieldFactory from "../default-field-factory";

  export let form = null;
  export let fieldFactory = DefaultFieldFactory;
  export let sitecoreApiHost = null;
  export let sitecoreApiKey = null;
  export let formFetcher = null;
  export let trackerFetcher = null;
  export let fieldWrapperComponent = null;

  let formState = {};
  let submitButtonName = null;
  let errors = [];
  let nextForm = null;
  let fieldComponents = [];

  const formToRender = nextForm || form;
  const action = `${sitecoreApiHost}/api/jss/formbuilder?fxb.FormItemId=${formToRender.metadata.itemId}&fxb.HtmlPrefix=${formToRender.htmlPrefix}&sc_apikey=${sitecoreApiKey}`;
  const trackerAction = `${sitecoreApiHost}/api/jss/fieldtracking/register?sc_apikey=${sitecoreApiKey}`;

  const formTracker = new FormTracker({
    endpoint: trackerAction,
    fetcher: trackerFetcher
  });

  const onFieldChange = (key, value, valid, errors) => {
    formState[key] = { value, isValid: valid, errors };
  };

  const onButtonClick = buttonName => {
    submitButtonName = buttonName;
  };

  const getCurrentFieldState = field => {
    // non-valued fields, i.e. text, section, do not have a value or validity state
    if (!instanceOfValueFormField(field)) {
      return null;
    }

    const fieldName = field.valueField.name || null;

    if (!fieldName) {
      return null;
    }

    const fieldState = formState[fieldName];

    // field has a value in react state i.e. due to user change
    if (fieldState) {
      const result = {
        isValid: fieldState.isValid,
        errors: fieldState.errors || []
      };

      if (typeof fieldState.value !== "undefined") {
        // field state from changed field value (in this.state)
        result.value = fieldState.value;
      } else {
        result.value = getFieldValueFromModel(field);
      }

      return result;
    }

    // default state from form API model
    return {
      isValid: true,
      errors: [],
      value: getFieldValueFromModel(field)
    };
  };

  const createFieldComponent = field => {
    const props = {
      field,
      key: field.model.itemId,
      fieldFactory: createFieldComponent,
      onChange: onFieldChange.bind(this),
      onButtonClick: onButtonClick.bind(this),
      tracker: formTracker,
      ...getCurrentFieldState(field)
    };

    const component = fieldFactory(field);

    return {
      component,
      props
    };
  };

  const collectCurrentFieldValues = () => {
    return Object.keys(formState)
      .filter(
        fieldName =>
          formState[fieldName] &&
          typeof formState[fieldName].isValid !== "undefined"
      )
      .map(fieldName => ({
        fieldName: fieldName,
        state: formState[fieldName]
      }));
  };

  const resetFieldsState = () => {
    const keys = Object.keys(formState);
    const stateReset = keys.reduce(
      (acc, v) => ({ ...acc, [v]: undefined }),
      {}
    );

    formState = stateReset;
    errors = [];
  };

  const onSubmit = e => {
    e.preventDefault();

    const renderForm = nextForm || form;

    const fieldValues = {};

    const currentFieldValues = collectCurrentFieldValues();

    currentFieldValues.forEach(field => {
      if (typeof field.state.value !== "undefined") {
        fieldValues[field.fieldName] = field.state.value;
      }
    });

    // serialize the form data that we got from the server
    // (hidden fields with constant values, unchanged default field values, etc)
    const formData = serializeForm(form, {
      submitButtonName
    });

    // merge in user-updated field values
    formData.mergeOverwritingExisting(fieldValues);

    const submitUrl = e.target.action;

    if (!submitUrl) {
      throw new Error(
        "Submit URL was not defined. Ensure the form has an action attribute."
      );
    }

    submitForm(formData, submitUrl, { fetcher: formFetcher })
      .then(result => {
        if (result.success && result.redirectUrl) {
          // Process redirect-on-success action.
          if (onRedirect) {
            onRedirect(result.redirectUrl);
          } else {
            window.location.href = result.redirectUrl;
          }
        }

        if (result.validationErrors) {
          const stateUpdate = {};
          Object.keys(result.validationErrors).forEach(fieldKey => {
            stateUpdate[fieldKey] = {
              value: (formState[fieldKey] || {}).value,
              isValid: false,
              errors: result.validationErrors[fieldKey]
            };
          });

          formState = stateUpdate;
        }

        if (result.nextForm) {
          nextForm = result.nextForm;
        }

        if (result.success) {
          resetFieldsState();
        }

        if (result.errors && result.errors.length > 0) {
          throw result.errors;
        }

        errors = [];
      })
      .catch(error => {
        if (Array.isArray(error)) {
          errors = error;
        } else if (typeof error === "string") {
          console.log("Form submit error", error);
          errors = [error];
        } else {
          console.log("Form submit error", error);
          errors = [error.message];
        }
      });
  };

  const constructForm = () => {
    const renderForm = nextForm || form;
    fieldComponents = renderForm.fields.map(createFieldComponent);
  };

  $: {
    (nextForm || form) && constructForm();
  }
</script>

<form {action} method="POST" on:submit={onSubmit}>
  {#each fieldComponents as formComponent}
    {#if fieldWrapperComponent}
      <svelte:component this={fieldWrapperComponent}>
        <svelte:component
          this={formComponent.component}
          {...formComponent.props} />
      </svelte:component>
    {:else}
      <svelte:component
        this={formComponent.component}
        {...formComponent.props} />
    {/if}
  {/each}
</form>
