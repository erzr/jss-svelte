<script>
  import { Text, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
    fields,
    rendering
  };

  const { sharedItemLink, localItemLink } = fields;
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-fieldusage-itemlink">
  <h5>Shared Item Link</h5>

  {#if sharedItemLink}
    <div>
      <p>
        Field:
        <span><Text field={sharedItemLink.fields.textField} /></span>
      </p>
    </div>
  {/if}

  <h5>Local Item Link</h5>
  {#if localItemLink}
    <div>
      <p>
        Field:
        <span><Text field={localItemLink.fields.textField} /></span>
      </p>
    </div>
  {/if}
</StyleguideSpecimen>
