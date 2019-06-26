<script>
  import { Image, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
    fields,
    rendering
  };

  const responsiveSizes = [{ mw: 300 }, { mw: 100 }];
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-fieldusage-image">
  <p>Plain image</p>
  <Image media={fields.sample1} />
  
  <p>Advanced image (not editable)</p>
  <Image
    field={fields.sample2}
    editable={false}
    imageParams={{ mw: 100, mh: 50 }}
    height="50"
    width="94" />

  <p>Srcset responsive image</p>
  <Image
    field={fields.sample2}
    srcSet={responsiveSizes}
    sizes="(min-width: 960px) 300px, 100px"
    className="img-fluid" />
</StyleguideSpecimen>
