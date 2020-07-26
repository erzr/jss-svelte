import Link from './Link.svelte';
import { render } from '@testing-library/svelte'
import { generalLinkField as eeLinkData } from '../testData/ee-data';

describe('<Link />', () => {
    const renderLink = (props) => {
        const { container } = render(Link, props);
        const images = container.getElementsByTagName('a');
        return images;
    }

    it('should render nothing with missing field', () => {
        const field = null;
        const rendered = renderLink({ field });
        expect(rendered.length).toEqual(0);
    });

    it('should render nothing with missing editable and value', () => {
        const field = {};
        const rendered = renderLink({ field });
        expect(rendered.length).toEqual(0);
    });

    it('should render editable with an editable value', () => {
        const field = {
            editableFirstPart: '<a href="/services" class="yo">Lorem',
            editableLastPart: '</a>',
        };
        const [rendered] = renderLink({ field });
        expect(rendered.outerHTML).toContain(field.editableFirstPart);
    });

    it('should render value with editing explicitly disabled', () => {
        const field = {
            value: {
                href: '/lorem',
                text: 'ipsum',
            },
            editable: '<a href="/services" class="yo">Lorem</a>',
        };

        const [rendered] = renderLink({ field });

        expect(rendered.outerHTML).toContain(field.value.href);
        expect(rendered.outerHTML).toContain(field.value.text);
    });

    it('should render with href directly on provided link', () => {
        const field = {
            href: '/lorem',
            text: 'ipsum',
        };
        const [rendered] = renderLink({ link: field });
        expect(rendered.outerHTML).toContain(field.href);
        expect(rendered.outerHTML).toContain(field.text);
    });

    it('should render ee HTML', () => {
        const field = {
            editableFirstPart: eeLinkData,
        };
        const { container } = render(Link, { field });
        expect(container.outerHTML).toContain('<input');
        expect(container.outerHTML).toContain('chrometype="field"');
    });

    it('should render all value attributes', () => {
        const field = {
            value: {
                href: '/lorem',
                text: 'ipsum',
                class: 'my-link',
                title: 'My Link',
                target: '_blank',
            },
        };

        const [rendered] = renderLink({ field });
        expect(rendered.outerHTML).toContain(`href="${field.value.href}"`);
        expect(rendered.outerHTML).toContain(`class="${field.value.class}"`);
        expect(rendered.outerHTML).toContain(`title="${field.value.title}"`);
        expect(rendered.outerHTML).toContain(`target="${field.value.target}"`);
    });

    it('should render other attributes with other props provided', () => {
        const field = {
            value: {
                href: '/lorem',
                text: 'ipsum',
            },
        };
        const [rendered] = renderLink({ field, id: "my-link", accessKey: "a" });
        expect(rendered.outerHTML).toContain('id="my-link"');
        expect(rendered.outerHTML).toContain('accesskey="a"');
    });
});