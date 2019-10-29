<script>
  import { getContext } from "svelte";
  import { getSitecoreContext } from "../contexts";

  export let name = "";
  export let rendering = null;
  export let store = null;

  let renderingComponents = [];

  const getComponentForRendering = renderingDefinition => {
    const sitecoreContext = getSitecoreContext();
    let { componentFactory } = sitecoreContext;
    let component = componentFactory(renderingDefinition.componentName);
    return {
      uid: renderingDefinition.uid,
      renderingDefinition,
      component
    };
  };

  const getComponentsForRenderingData = (placeholderData) => {
    let components = placeholderData.map((rendering, index) => {
      let component = getComponentForRendering(rendering);
      renderingComponents.push(component);
    });
  };

  const constructPlaceholder = () => {
    while(renderingComponents.length > 0) {
      renderingComponents.pop();
    }

    const placeholders = rendering.placeholders;
    const currentPlaceholder = placeholders[name];

    if (currentPlaceholder) {
      getComponentsForRenderingData(currentPlaceholder);
    }
    
    return true;
  };

  $: {
    rendering && constructPlaceholder();
  }
</script>

{#each renderingComponents as renderingComponent, i (renderingComponent.uid)}
  {#if renderingComponent.component}
    <svelte:component
      this={renderingComponent.component}
      fields={renderingComponent.renderingDefinition.fields}
      rendering={renderingComponent.renderingDefinition}
      params={renderingComponent.renderingDefinition.params} />
  {:else}
    <code {...renderingComponent.renderingDefinition.attributes}>
      {@html renderingComponent.renderingDefinition.contents}
    </code>
  {/if}
{/each}
