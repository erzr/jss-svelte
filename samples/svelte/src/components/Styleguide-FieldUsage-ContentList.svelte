<script>
  import { Text, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
    fields,
    rendering
  };

  const { sharedContentList, localContentList } = fields;
</script>

<StyleguideSpecimen
  {...specimanProps}
  e2eId="styleguide-fieldusage-content-list">
  <h5>Shared Content List</h5>

  {#if sharedContentList}
    {#each sharedContentList as listItem}
      <div>
        <p>
          Field:
          <Text field={listItem.fields.textField} />
        </p>
      </div>
    {/each}
  {/if}

  <h5>Local Content List</h5>

  {#if localContentList}
    {#each localContentList as listItem}
      <div>
        <p>
          Field:
          <Text field={listItem.fields.textField} />
        </p>
      </div>
    {/each}
  {/if}
</StyleguideSpecimen>
