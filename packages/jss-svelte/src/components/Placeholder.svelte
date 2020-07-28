<script type="ts">
  import { getContext } from "svelte";
  import { getSitecoreContext } from "../contexts";
  import { getComponentFactory } from "../contexts";
  import MissingComponent from "./MissingComponent.svelte";
  import type {RouteData, ComponentRendering, HtmlElementRendering} from '@sitecore-jss/sitecore-jss';

  export let name = "";
  export let rendering: RouteData;
  export let componentFactory = null;

  export let missingComponentComponent = MissingComponent;
  export let renderEachComponent = null;
  export let renderEmptyComponent = null;

  let isEmptyPlaceholder: boolean = false;

  if (!componentFactory) {
    componentFactory = getComponentFactory();
  }

  let renderingComponents = [];

  type ResolvedComponent = {
    uid: string,
    renderingDefinition: ComponentRendering,
    component: any,
    index: number
  };

  const getComponentForRendering = (renderingDefinition: ComponentRendering, index: number): ResolvedComponent => {
    let component = componentFactory(renderingDefinition.componentName);
    return {
      uid: renderingDefinition.uid,
      renderingDefinition,
      component,
      index
    };
  };

  const getComponentsForRenderingData = (placeholderData: (ComponentRendering | HtmlElementRendering)[]): ResolvedComponent[] => {
    const components: ResolvedComponent[] = [];

    placeholderData.forEach((rendering, index) => {
      const renderingAny: any = rendering;
      if (!renderingAny.componentName && renderingAny.name) {
        console.log('HTML Renderings are not supported at this time.');
      } else {
        const component: ResolvedComponent = getComponentForRendering(renderingAny, index);

        if (component) {
          components.push(component);
        }
      }
    });

    return components;
  };

  const constructPlaceholder = () => {
    while (renderingComponents.length > 0) {
      renderingComponents.pop();
    }

    const placeholders = rendering.placeholders;
    const currentPlaceholder = placeholders[name];

    let resolvedComponents: ResolvedComponent[];

    if (currentPlaceholder) {
      resolvedComponents = getComponentsForRenderingData(currentPlaceholder);
    }

    renderingComponents.push(...resolvedComponents);
    isEmptyPlaceholder = resolvedComponents.every(renderingComponent => !renderingComponent || !renderingComponent.component);

    return true;
  };

  $: {
    rendering && constructPlaceholder();
  }
</script>

{#if isEmptyPlaceholder && renderEmptyComponent}
  <svelte:component this={renderEmptyComponent} />
{:else}
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
{/if}