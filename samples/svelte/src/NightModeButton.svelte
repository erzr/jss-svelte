<script>
  const handleToggleNightMode = () => {
    const darkClass = "night";

    if (document.body.classList.contains(darkClass)) {
      document.body.classList.remove(darkClass);
    } else {
      document.body.classList.add(darkClass);
    }
  };
</script>

<svelte:head>
  <!-- This shouldn't really be here, but is being used to test <svelte:head> functionality -->
  <style>
    .night {
      background-color: #333;
      transition: all 0.5s;
    }
    .night .bg-white {
      background-color: #333 !important;
    }
    .night,
    .night a.text-dark,
    .night a.text-dark:hover,
    .night a.text-dark:focus,
    .night a,
    .night a:hover {
      color: whitesmoke !important;
    }
    .night .alert-dark,
    .night pre {
      background-color: cornsilk;
    }
  </style>
</svelte:head>

<style>
  #btn-night-mode {
    margin: 30px;
  }
</style>

<div class="fixed-bottom text-right">
  <button
    type="button"
    class="btn btn-danger"
    id="btn-night-mode"
    on:click={handleToggleNightMode}>
    Toggle Night Mode
  </button>
</div>
