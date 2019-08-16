<script>
  import { Text, Link } from "jss-svelte";
  import { gql } from "apollo-boost";

  import { getClient, query } from "svelte-apollo";

  export let rendering = null;
  export let sitecoreContext = null;

  const CONNECTED_QUERY = gql`
    query ConnectedDemoQuery($datasource: String!, $contextItem: String!) {
      # Datasource query
      # $datasource will always be set to the ID of the rendering's datasource item
      # (as long as the GraphQLData helper is used)
      datasource(value: $datasource) {
        id
        name
        # Strongly-typed querying on known templates is possible!
        ... on GraphQLConnectedDemo {
          # Single-line text field
          sample1 {
            # the 'jss' field is a JSON blob that represents the object that
            # should be passed to JSS field rendering helpers (i.e. text, image, link)
            jss
            value
          }
          # General Link field
          sample2 {
            jss
            # Structured querying of the field's values is possible
            text
            target
            url
            # Access to the template definition is possible
            definition {
              type
              shared
            }
          }
        }
      }

      # Context/route item query
      # $contextItem will always be set to the ID of the current context item (the route item)
      # (as long as the GraphQLData helper is used)
      contextItem: item(path: $contextItem) {
        id
        # Get the page title from the app route template
        ... on AppRoute {
          pageTitle {
            value
          }
        }

        # List the children of the current route
        children(requirePresentation: true) {
          id
          # typing fragments can be used anywhere!
          # so in this case, we're grabbing the 'pageTitle'
          # field on all child route items.
          ... on AppRoute {
            pageTitle {
              value
              jss
            }
          }
          url(options: { disableLanguageEmbedding: true })
        }
      }
    }
  `;

  const client = getClient();
  const connectedQuery = query(client, { query: CONNECTED_QUERY,
    variables: { datasource: rendering.dataSource, contextItem: sitecoreContext.context.itemId } });
</script>

<div data-e2e-id="graphql-connected">
  <h2>GraphQL Connected Demo</h2>

  <p>
    Connected GraphQL executes GraphQL queries directly against the Sitecore
    GraphQL endpoint. You can review the query execution in the browser devtools
    network tab. Note that Apollo Client maintains a query cache - so the same
    query will not execute twice (i.e. after route changes) unless either the
    page is refreshed, or the
    <em>fetch policy</em>
    is set to not use the cache. Consult the Apollo documentation for details.
  </p>

  {#await $connectedQuery}
    <p class="alert alert-info">GraphQL query is executing...</p>
  {:then result}

    {#if result.data.datasource}
      <div>
        <h4>Datasource Item (via Connected GraphQL)</h4>
        id: {result.data.datasource.id}
        <br />
        name: {result.data.datasource.name}
        <br />
        sample1: {result.data.datasource.sample1.value}
        <br />
        sample1 (editable):
        <Text field={result.data.datasource.sample1.jss} />
        <br />
        sample2:
        <br />
        <ul>
          <li>text: {result.data.datasource.sample2.text}</li>
          <li>url: {result.data.datasource.sample2.url}</li>
          <li>target: {result.data.datasource.sample2.target}</li>
          <li>
            editable:
            <Link field={result.data.datasource.sample2.jss} />
          </li>
          <li>field type: {result.data.datasource.sample2.definition.type}</li>
          <li>
            field is shared?: {result.data.datasource.sample2.definition.shared.toString()}

          </li>
        </ul>
      </div>
    {/if}

    {#if result.data.contextItem}
      <div>
        <h4>Route Item (via Connected GraphQL)</h4>
        id: {result.data.contextItem.id}
        <br />
        page title: {result.data.contextItem.pageTitle.value}
        <br />
        children:
        <ul>
          {#each result.data.contextItem.children as child}
            <li key={child.id}>
              <a href={child.url}>{child.pageTitle.value}</a>
                (editable title too!
              <Text field={child.pageTitle.jss} />
              )
            </li>
          {/each}
        </ul>
      </div>
    {/if}

  {:catch error}
    <p class="alert alert-danger">GraphQL query error: {error.toString()}</p>
  {/await}

</div>
