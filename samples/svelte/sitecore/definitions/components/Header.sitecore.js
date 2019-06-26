// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the ContentBlock component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when `jss manifest` is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: 'Header',
    // totally optional, but fun
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'text', type: CommonFieldTypes.SingleLineText },
      { name: 'rte', type: CommonFieldTypes.RichText },
      { name: 'linktest', type: CommonFieldTypes.GeneralLink },
      { name: 'imgtest', type: CommonFieldTypes.Image }
    ],
  });
}
