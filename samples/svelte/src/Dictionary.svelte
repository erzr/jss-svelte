<script>
  import {
    InternationalizationContext,
    setInternationalizationContext
  } from "jss-svelte";
  
  export let dictionary = null;

  const context = new InternationalizationContext(dictionary);
  setInternationalizationContext(context);
</script>


<slot></slot>