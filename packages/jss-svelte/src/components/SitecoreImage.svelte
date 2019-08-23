<script>
    export let imgAttrs = null;
    const { alt, ...rest } = $$props;
</script>
 
<img {... rest} alt={alt} />
