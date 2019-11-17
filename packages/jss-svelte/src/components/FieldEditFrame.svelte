<script>
  import { getSitecoreContext } from "../contexts";

  export let itemId = null;
  export let fields = [];
  export let header = "Edit Fields";
  export let icon = "/temp/iconcache/people/16x16/cubes_blue.png";
  export let disabledIcon = "/temp/cubes_blue_disabled16x16.png";
  export let tooltip = null;
  export let command = "{70C4EED5-D4CD-4D7D-9763-80C42504F5E7}";

  const sitecoreContext = getSitecoreContext();

  let shouldRender = true;

  if (
    !sitecoreContext.context.pageEditing ||
    !itemId ||
    !fields ||
    !fields.length ||
    itemId === "available-in-connected-mode"
  ) {
    shouldRender = false;
  }

  let contextItemUri;
  let commandData;

  if (shouldRender) {
    contextItemUri = `sitecore://master/${itemId}?lang=en&amp;ver=1`;

    const clickCommand = {
      click: `javascript:Sitecore.PageModes.PageEditor.postRequest('webedit:fieldeditor(command=${command},fields=${fields.join(
        "|"
      )},id=${itemId})',null,false)`,
      header: header,
      icon: icon,
      disabledIcon: disabledIcon,
      isDivider: false,
      tooltip: tooltip || `Edit the following fields: ${fields.join(", ")}`,
      type: null
    };

    commandData = {
      commands: [clickCommand],
      contextItemUri: contextItemUri,
      custom: {},
      displayName: "Edit Properties",
      expandedDisplayName: ""
    };
  }
</script>

{#if shouldRender}
  <div
    class="scLooseFrameZone scEnabledChrome"
    sc_item={contextItemUri}
    sc-part-of="editframe">
    <span class="scChromeData">{JSON.stringify(commandData)}</span>
    <slot />
  </div>
{:else}
  <slot />
{/if}
