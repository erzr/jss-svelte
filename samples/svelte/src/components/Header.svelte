<script>
  import { gql } from "apollo-boost";
  import { Text, RichText, Link, Image } from "jss-svelte";
  import { getClient, query } from "svelte-apollo";

  const ITEM_QUERY = gql`
    {
      item {
        id
      }
    }
  `;

  export let fields = null;

  const client = getClient();
  const item = query(client, { query: ITEM_QUERY, ssr: false });
</script>

<div>
  <h2>Header Component</h2>
  <h3>
    Header text:
    <Text field={fields.text} />
  </h3>

  <div>
    RTE text:
    <RichText field={fields.rte} />
  </div>

  <div>
    Link:
    <Link field={fields.linktest}>Cool!</Link>
  </div>

  <div>
    Imagse:
    <Image field={fields.imgtest} />
  </div>

  {#await $item}
    Loading...
  {:then result}
    <span>{result.data.item.id}</span>
  {:catch error}
    Error: {error}
  {/await}
</div>
