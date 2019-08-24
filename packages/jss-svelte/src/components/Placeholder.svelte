<script>
  import { getContext } from "svelte";
  import { getSitecoreContext } from "../contexts";

  export let name = "";
  export let rendering = null;
  export let store = null;

  let renderingComponents;

  const constructPlaceholder = () => {
    const sitecoreContext = getSitecoreContext();
    let { componentFactory } = sitecoreContext;

    const placeholders = rendering.placeholders;
    const currentPlaceholder = placeholders[name];

    function getComponentForRendering(renderingDefinition) {
      let component = componentFactory(renderingDefinition.componentName);
      return {
        renderingDefinition,
        component
      };
    }

    function getComponentsForRenderingData(placeholderData) {
      let components = placeholderData.map((rendering, index) => {
        let component = getComponentForRendering(rendering);
        return component;
      });
      return components;
    }

    renderingComponents = getComponentsForRenderingData(currentPlaceholder);
  };

  $: rendering && constructPlaceholder();
</script>

{#each renderingComponents as renderingComponent}
  {#if renderingComponent.component}
  <svelte:component
    this={renderingComponent.component}
    fields={renderingComponent.renderingDefinition.fields}
    rendering={renderingComponent.renderingDefinition}
    params={renderingComponent.renderingDefinition.params}
    />
  {:else}
    <code {...renderingComponent.renderingDefinition.attributes}>{@html renderingComponent.renderingDefinition.contents}</code>
  {/if}
{/each}
