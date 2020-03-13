<script>
    export let field = null;
    export let editable = true;

    const missingField = !field || (!field.editableFirstPart && !field.value && !field.href);

    let experienceEditorMarkup = null;
    let link = null;
    let rel = null;
    let linkText = null;

    if (!missingField)
    {
        experienceEditorMarkup = !editable ? null : field.editableFirstPart + field.editableLastPart;
        link = field.href ? field : field.value
        rel = field.target === '_blank' && !field.rel ? null : 'noopener noreferrer';
        linkText = link.text || link.href;
    }
</script>

{#if !missingField}
    {#if experienceEditorMarkup}
        <span class="sc-link-wrapper" key="editable">
            {@html experienceEditorMarkup}
        </span>
    {/if}

    <a href={link.href} class={link.class} title={link.title} target={link.target} rel={rel}>
        {linkText}
        <slot></slot>
    </a>
{/if}