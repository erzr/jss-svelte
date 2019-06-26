  <script>
    import {Text, RichText} from 'jss-svelte';

    export let fields = null;
    export let rendering = null;
    export let e2eId = '';
  </script>
  
  <div class="pt-3" id={`i${rendering.uid.replace(/[{}]/g, '')}`} data-e2e-id={e2eId}>
    
    <Text tag="h4" field={fields.heading} />
    <RichText field={fields.description} />

    <p>
      <small>
        Implementation: <code>/src/components/{rendering.componentName}/index.js</code>
        <br />
        Definition:
        <code>/sitecore/definitions/components/{rendering.componentName}.sitecore.js</code>
      </small>
    </p>
    <div class="border p-2">
        <slot></slot>
    </div>
  </div>