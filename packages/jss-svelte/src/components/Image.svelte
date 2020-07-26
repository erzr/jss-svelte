<script type="ts">
  import { mediaApi } from "@sitecore-jss/sitecore-jss";
  import EditableImage from "./EditableImage.svelte";

  interface ImageFieldValue {
    src?: string;
    value: ImageFieldValue;
    /** HTML attributes that will be appended to the rendered <img /> tag. */
    [attributeName: string]: any;
  }

  interface ImageField {
    value?: ImageFieldValue;
    editable?: string;
  }

  interface ImageSizeParameters {
    /** Fixed width of the image */
    w?: number;
    /** Fixed height of the image */
    h?: number;
    /** Max width of the image */
    mw?: number;
    /** Max height of the image */
    mh?: number;
    /** Ignore aspect ratio */
    iar?: 1 | 0;
    /** Allow stretch */
    as?: 1 | 0;
    /** Image scale. Defaults to 1.0 */
    sc?: number;
  }

  export let media: ImageFieldValue = null;
  export let field: ImageField = null;
  export let srcSet: ImageSizeParameters = null;

  let imageProps = null;
  let editable = null;

  const getImageProps = (src: string) => {
    const imageProps = { ...$$props };

    //  There's something wrong with $$restProps, delete declared props for now.
    delete imageProps['media'];
    delete imageProps['field'];
    delete imageProps['srcSet'];

    if (srcSet != null) {
      const resolvedSrc = mediaApi.updateImageUrl(src);
      imageProps.srcSet = mediaApi.getSrcSet(resolvedSrc, srcSet as any);
    }

    return imageProps;
  };

  const processProps = (fieldValue: ImageFieldValue) => {
    const baseProps = getImageProps(fieldValue.src);
    const resolvedProps = {
      ...baseProps,
      ...fieldValue,
    };
    return resolvedProps;
  };

  if (media) {
    if (media.value) {
      imageProps = processProps(media.value);
    } else {
      imageProps = processProps(media);
    }
  } else if (field) {
    if (field.editable) {
      editable = field.editable;
    } else if (field.value) {
      imageProps = processProps(field.value);
    }
  }
</script>

{#if editable}
  <EditableImage {editable} />
{:else}
  <!-- svelte-ignore a11y-missing-attribute -->
  <img {...imageProps} />
{/if}
