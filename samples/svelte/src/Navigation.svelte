<script>
  import { Link } from "svelte-routing";
  import { getInternationalizationContext } from 'jss-svelte';

  const i18Context = getInternationalizationContext();
  const t = i18Context.getTranslator();
</script>

<div
  class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3
  bg-white border-bottom">
  <h5 class="my-0 mr-md-auto font-weight-normal">
    <Link to="/" className="text-dark active" aria-current="page">{t('Svelte JSS')}</Link>
  </h5>
  <nav class="my-2 my-md-0 mr-md-3">
    <a
      class="p-2 text-dark"
      href="https://jss.sitecore.net"
      target="_blank"
      rel="noopener noreferrer">
       {t('Documentation')}
    </a>
    <Link to="/styleguide" className="p-2 text-dark"> {t('Styleguide')} </Link>
    <Link to="/graphql" className="p-2 text-dark"> {t('GraphQL')} </Link>
  </nav>
</div>
