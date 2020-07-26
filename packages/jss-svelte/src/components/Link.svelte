<script type="ts">
  interface LinkFieldValue {
    href?: string;
    className?: string;
    title?: string;
    target?: string;
    text?: string;
    [attributeName: string]: any;
  }

  interface LinkField {
    value: LinkFieldValue;
    editableFirstPart?: string;
    editableLastPart?: string;
  }

  export let field: LinkField = null;
  export let link: LinkFieldValue = null;
  export let editable = true;

  const processProps = (field: LinkFieldValue) => {
    const linkProps = { 
        ...$$props,
        ...field
    };

    delete linkProps['field'];
    delete linkProps['link'];
    delete linkProps['editable'];

    return linkProps;
  };

  const processLink = (field: LinkFieldValue) => {
    const props = processProps(field);
    return {
      text: field.text,
      props,
    };
  };

  const processEditable = (firstPart: string, lastPart: string): string => {
    return firstPart + lastPart;
  };

  let linkProps;
  let linkText;
  let eeMarkup;

  let linkField: LinkFieldValue = null;

  if (field && field.value) {
    linkField = field.value;
  } else if (link) {
    linkField = link;
  }

  if (editable && field && field.editableFirstPart) {
    eeMarkup = processEditable(field.editableFirstPart, field.editableLastPart);
  } else if (linkField) {
    const { text, props } = processLink(linkField);
    linkProps = props;
    linkText = text;
  }
</script>

{#if linkProps}
  <!-- svelte-ignore a11y-missing-attribute -->
  <a {...linkProps}>{linkText}</a>
{:else if editable && eeMarkup}
  <span class="sc-link-wrapper">
    {@html eeMarkup}
  </span>
{/if}