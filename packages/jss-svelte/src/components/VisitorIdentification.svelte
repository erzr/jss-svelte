<script>
  import { getSitecoreContext } from "../contexts";

  const sitecoreContext = getSitecoreContext();

  let emitVI =
    typeof document !== "undefined" &&
    sitecoreContext.context.visitorIdentificationTimestamp;
</script>

<svelte:head>
  {#if emitVI}
    <script
      src="/layouts/system/VisitorIdentification.js"
      type="text/javascript">
    </script>
    <meta
      name="VIcurrentDateTime"
      content={sitecoreContext.context.visitorIdentificationTimestamp} />
  {/if}
</svelte:head>
