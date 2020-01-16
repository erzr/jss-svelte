<script>
  export let lang = "en";
  export let distPath = "";

  export let headHtml = null;
  export let appHtml = null;
  export let serializedState = null;
  export let cacheState = null;
</script>

<!doctype html />
<html {lang}>

  <head>
    <meta charset="utf8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="theme-color" content="#000000" />

    <title>Svelte app</title>

    <link rel="icon" type="image/png" href="favicon.png" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
      crossorigin="anonymous" />

    <link rel="stylesheet" href={distPath + '/bundle.css'} />

    {#if headHtml}
      {@html headHtml}
    {/if}
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>

    <div id="root">
      {#if appHtml}
        {@html appHtml}
      {/if}
    </div>

    <div style="display: none;" id="__JSS_STATE__">{serializedState}</div>
    <div style="display: none;" id="__CACHE_STATE__">{cacheState}</div>

    <script src={distPath + '/bundle.js'}></script>
  </body>

</html>
