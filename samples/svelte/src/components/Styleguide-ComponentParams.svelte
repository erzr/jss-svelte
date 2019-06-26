<script>
  import { getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;
  export let params = null;

  const specimanProps = {
    fields,
    rendering
  };

  const { cssClass, columns, useCallToAction } = params;

  const columnsArray = columns && [...Array(parseInt(columns))];

  const typeOfuseCallToAction = typeof useCallToAction;
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-componentparams">
  <p class={cssClass}>
    The CSS class of this paragraph (
    <code>{cssClass}</code>
    ) is set using a param
  </p>
  <div>
    useCallToAction param:
    <code>{useCallToAction}</code>
    <br />
    param type:
    <code>{typeOfuseCallToAction}</code>
    {#if useCallToAction === 'true'}
      <div class="alert alert-info">the call to action is shown</div>
    {/if}
  </div>
  <p>columns param: {columns}</p>
  <div class="row">
    {#if columnsArray}
      {#each columnsArray as column, index}
        <div key={`col-${index}`} class="col-sm">Column {index} </div>
      {/each}
    {/if}
  </div>
</StyleguideSpecimen>
