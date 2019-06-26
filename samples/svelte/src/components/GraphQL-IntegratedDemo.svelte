<script>
    import {Text, Link} from 'jss-svelte';

    export let fields = null;

    const { datasource, contextItem } = fields.data;
</script>

    <div data-e2e-id="graphql-integrated">
      <h2>GraphQL Integrated Demo</h2>

      <p>
        Integrated GraphQL executes GraphQL queries within the Layout Service endpoint, and merges
        the query results into the Layout Service result JSON. The query results can be seen by
        inspecting the Layout Service response in the browser devtools network tab.
      </p>

      {#if datasource}
        <div>
          <h4>Datasource Item (via Integrated GraphQL)</h4>
          id: {datasource.id}
          <br />
          name: {datasource.name}
          <br />
          sample1: {datasource.sample1.value}
          <br />
          sample1 (editable): <Text field={datasource.sample1.jss} />
          <br />
          sample2:<br />
          <ul>
            <li>text: {datasource.sample2.text}</li>
            <li>url: {datasource.sample2.url}</li>
            <li>target: {datasource.sample2.target}</li>
            <li>
              editable: <Link field={datasource.sample2.jss} />
            </li>
            <li>field type: {datasource.sample2.definition.type}</li>
            <li>field is shared?: {datasource.sample2.definition.shared.toString()}</li>
          </ul>
        </div>
      {/if}
      {#if contextItem}
        <div>
          <h4>Route Item (via Integrated GraphQL)</h4>
          id: {contextItem.id}
          <br />
          page title: {contextItem.pageTitle.value}
          <br />
          children:
          <ul>
            {#each contextItem.children as child}
              <li key={child.id}>
                <a href={child.url}>{child.pageTitle.value}</a>&nbsp; (editable
                title too! <Text field={child.pageTitle.jss} />)
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>