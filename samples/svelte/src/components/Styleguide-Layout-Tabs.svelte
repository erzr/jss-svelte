<script>
  import {
    Text,
    getFieldValue,
    getSitecoreContext
  } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";
  import StyleguideLayoutTabsTab from "./Styleguide-Layout-Tabs-Tab.svelte";

  export let fields = null;
  export let rendering = null;
  
  const sitecoreContext = getSitecoreContext();

  const specimanProps = {
    fields,
    rendering
  };

  let tabs = [];
  let activeTabIndex = 0;

  const isEditing = sitecoreContext.context.pageEditing;
  const tabsPlaceholder = rendering.placeholders["jss-tabs"];

  if (!isEditing) {
    tabs = (tabsPlaceholder || []).filter(tab => tab.fields);
  }
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-layout-tabs">
  <ul class="nav nav-tabs">
    {#each tabs as tab, index}
      <li class="nav-item" key={`tab${index}`}>
        <a
          class={`nav-link ${index === activeTabIndex ? 'active' : null}`}
          on:click={() => (activeTabIndex = index)}
          href="#t">
          <Text field={tab.fields.title} />
        </a>
      </li>
    {/each}
  </ul>
  <div class="p-3 border-left border-right border-bottom">
    {#each tabs as tab, index}
      {#if activeTabIndex == index || isEditing}
        <StyleguideLayoutTabsTab fields={tab.fields} sitecoreContext={sitecoreContext} />
      {/if}
    {/each}
  </div>
</StyleguideSpecimen>