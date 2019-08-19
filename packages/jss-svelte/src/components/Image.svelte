<script>
  import { mediaApi } from "@sitecore-jss/sitecore-jss";
  import SitecoreImage from "./SitecoreImage.svelte";

  export let media = null;
  export let field = null;
  export let editable = true;
  export let imageParams = null;
  export let srcSet = null;
  export let className = null;
  export let sizes = null;
  export let height = null;
  export let width = null;

  let editableMarkup = "";
  let imageAttrs = null;

  const otherProps = {
    srcSet,
    class: className,
    sizes
  };

  if (height) {
    otherProps.height = height;
  }

  if (width) {
    otherProps.width = width;
  }

  const getImageAttrs = ({ src, srcSet, ...otherAttrs }) => {
    if (!src) {
      return null;
    }

    const newAttrs = {
      ...otherAttrs
    };

    const resolvedSrc = mediaApi.updateImageUrl(src, imageParams);
    if (srcSet) {
      newAttrs.srcSet = mediaApi.getSrcSet(resolvedSrc, srcSet, imageParams);
    } else {
      newAttrs.src = resolvedSrc;
    }
    return newAttrs;
  };

  if (field && !media) {
    media = field;
  }

  const dynamicMedia = media;

  const isNotConfiguredProperly = !media ||
    (!dynamicMedia.editable && !dynamicMedia.value && !dynamicMedia.src);

  if (!isNotConfiguredProperly) {
    if (editable && dynamicMedia.editable) {
      const foundImg = mediaApi.findEditorImageTag(dynamicMedia.editable);
      if (!foundImg) {
        editableMarkup = dynamicMedia.editable;
      }

      const foundImgProps = foundImg.attrs;
      // Note: otherProps may override values from foundImgProps, e.g. `style`, `className` prop
      // We do not attempt to merge.
      const imgAttrs = getImageAttrs(
        { ...foundImgProps, ...otherProps },
        imageParams
      );
      if (!imgAttrs) {
        editableMarkup = dynamicMedia.editable;
      }

      const {html} = SitecoreImage.render({ imgAttrs });

      const editableMarkupReplaced = dynamicMedia.editable.replace(
        foundImg.imgTag,
        html
      );

      editableMarkup = editableMarkupReplaced;
    } else {
      const img = dynamicMedia.src ? media : dynamicMedia.value;
      if (img) {
        imageAttrs = getImageAttrs({ ...img, ...otherProps }, imageParams);
      }
    }
  }
</script>

{#if editableMarkup}
  <span class="sc-image-wrapper">
    {@html editableMarkup}
  </span>
{:else if imageAttrs}
  <SitecoreImage imgAttrs={imageAttrs} />
{/if}
