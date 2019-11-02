<script>
  import { getContext } from "svelte";
  import { getSitecoreContext } from "../contexts";
  import MissingComponent from "./MissingComponent.svelte";

  export let name = "";
  export let rendering = null;
  export let store = null;
  export let componentFactory = null;

  export let missingComponentComponent = null;
  export let renderEachComponent = null;
  export let renderEmptyComponent = null;

  if (!componentFactory) {
    const sitecoreContext = getSitecoreContext();
    componentFactory = sitecoreContext.componentFactory;
  }

  if (missingComponentComponent) {
    missingComponentComponent = MissingComponent;
  }

  let renderingComponents = [];

  const getComponentForRendering = renderingDefinition => {
    let component = componentFactory(renderingDefinition.componentName);
    return {
      uid: renderingDefinition.uid,
      renderingDefinition,
      component
    };
  };

  const getComponentsForRenderingData = placeholderData => {
    let components = placeholderData.map((rendering, index) => {
      let component = getComponentForRendering(rendering);
      component.index = index;
      renderingComponents.push(component);
    });
  };

  const constructPlaceholder = () => {
    while (renderingComponents.length > 0) {
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
    {#if renderEachComponent}
      <svelte:component this={renderEachComponent} index={renderingComponent.index}>
        <svelte:component
          this={renderingComponent.component}
          rendering={renderingComponent.renderingDefinition}
          {...renderingComponent.renderingDefinition} />
      </svelte:component>
    {:else}
      <svelte:component
        this={renderingComponent.component}
        rendering={renderingComponent.renderingDefinition}
        {...renderingComponent.renderingDefinition} />
    {/if}
  {:else if renderingComponent.renderingDefinition.name === 'code'}
    <code {...renderingComponent.renderingDefinition.attributes}>
      {@html renderingComponent.renderingDefinition.contents}
    </code>
  {:else}
    <svelte:component
      this={missingComponentComponent}
      componentName={renderingComponent.renderingDefinition.componentName} />
  {/if}
{/each}
