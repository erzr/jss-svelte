<script>
    // this class is gross but its a limitation. i'm sorry.
    export let tag = null;
    export let className = null;

    var tagProps = {
        class: className
    }
</script>

{#if tag == 'section'}
    <section {... tagProps}>
        <slot></slot>
    </section>
{:else if tag == 'h1'}
    <h1 {... tagProps}>
        <slot></slot>
    </h1>
{:else if tag == 'h2'}
    <h2 {... tagProps}>
        <slot></slot>
    </h2>
{:else if tag == 'h3'}
    <h3 {... tagProps}>
        <slot></slot>
    </h3>
{:else if tag == 'h4'}
    <h4 {... tagProps}>
        <slot></slot>
    </h4>
{:else if tag == 'h5'}
    <h5 {... tagProps}>
        <slot></slot>
    </h5>
{:else if tag == 'h6'}
    <h6 {... tagProps}>
        <slot></slot>
    </h6>
{:else if tag == 'span'}
    <span {... tagProps}>
        <slot></slot>
    </span>
{:else if tag == 'div'}
    <div {... tagProps}>
        <slot></slot>
    </div>
{:else if tag == 'p'}
    <p {... tagProps}>
        <slot></slot>
    </p>
{:else}
	<h1>TAG NOT SUPPORTED</h1>
{/if}

