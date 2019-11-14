<script>
  export let errors = [];
</script>

{#if errors.length}
  <div className="invalid">
    {#each errors as error, index}
      <p key={index}>{error}</p>
    {/each}
  </div>
{/if}