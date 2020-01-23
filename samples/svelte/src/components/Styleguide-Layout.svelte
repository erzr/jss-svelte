<script>
  import {
    Text,
    Placeholder,
    getChildPlaceholder,
    getFieldValue
  } from "jss-svelte";

  export let rendering = null;
  export let sitecoreContext = null;

  const sections = getChildPlaceholder(rendering, "jss-styleguide-layout")
    .filter(section => getFieldValue(section, "heading"))
    .map(section => ({
      heading: getFieldValue(section, "heading"),
      id: `i${section.uid.replace(/[{}]/g, "")}`,
      children: getChildPlaceholder(section, "jss-styleguide-section")
        .filter(component => getFieldValue(component, "heading"))
        .map(component => ({
          heading: getFieldValue(component, "heading"),
          id: `i${component.uid.replace(/[{}]/g, "")}`
        }))
    }));
</script>

<div class="row">
  <div class="col-sm-8 col-lg-10">
    <Placeholder name="jss-styleguide-layout" {rendering} {sitecoreContext} />
  </div>
  <div class="col-sm-4 col-lg-2 order-sm-first pt-2">
    {#each sections as section}
      <nav key={section.heading} class="nav flex-column pt-2">
        <a href={`#${section.id}`} class="nav-item font-weight-bold">
           {section.heading}
        </a>
        {#if section.children}
          <nav class="nav flex-column">
            {#each section.children as child}
              {#if child.heading}
                <a key={child.id} href={`#${child.id}`}> {child.heading} </a>
              {/if}
            {/each}
          </nav>
        {/if}
      </nav>
    {/each}
  </div>
</div>
