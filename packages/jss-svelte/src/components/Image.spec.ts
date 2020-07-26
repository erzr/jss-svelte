import Image from './Image.svelte';
import { render } from '@testing-library/svelte'
import { imageField as eeImageData } from '../testData/ee-data';

describe('<Image />', () => {
    const renderImage = (props) => {
        const { container } = render(Image, props);
        const images = container.getElementsByTagName('img');
        return images;
    }

    describe('with direct image object, no value/editable', () => {
        const props = {
            media: {
                src: '/assets/img/test0.png',
                width: 8,
                height: 10,
            },
            id: 'some-id',
            style: {
                width: '100%',
            },
            class: 'the-dude-abides',
        }

        const [rendered, ...rest] = renderImage(props);

        it('should render <img /> with url', () => {
            expect(rest.length).toEqual(0);
            expect(rendered.getAttribute('src')).toEqual(props.media.src);
            expect(rendered.getAttribute('width')).toEqual(props.media.width.toString());
            expect(rendered.getAttribute('height')).toBe(props.media.height.toString());
        });

        it('should render <img /> with non-media props', () => {
            expect(rendered.getAttribute('id')).toEqual(props.id);
        });

        it('should render <img /> class props', () => {
            expect(rendered.getAttribute('class')).toEqual(props.class);
        });
    });

    describe('with responsive image object', () => {
        const props = {
            media: {
                src: '/assets/img/test0.png',
            },
            srcSet: [{ mw: 100 }, { mw: 300 }],
            sizes: '(min-width: 960px) 300px, 100px',
            id: 'some-id',
            class: 'the-dude-abides',
        };

        // renderImage should be called here instead of in each test
        // but it doesn't seem like things are cleaned up between
        // describe's ... revisit.

        it('should render <img /> with needed img tags', () => {
            const [rendered, ...rest] = renderImage(props);

            expect(rest.length).toEqual(0);
            expect(rendered.getAttribute('src')).toEqual(props.media.src);
            expect(rendered.getAttribute('srcset')).toEqual('/assets/img/test0.png?mw=100 100w, /assets/img/test0.png?mw=300 300w');
            expect(rendered.getAttribute('sizes')).toEqual('(min-width: 960px) 300px, 100px');
        });

        it('should render <img /> with non-media props', () => {
            const [rendered] = renderImage(props);
            expect(rendered.getAttribute('id')).toEqual(props.id);
        });

        it('should render <img /> with style and className props', () => {
            const [rendered] = renderImage(props);
            expect(rendered.getAttribute('class')).toEqual(props.class);
        });
    });

    describe('with "value" property value', () => {
        const props = {
            media: { value: { src: '/assets/img/test0.png', alt: 'my image' } },
            id: 'some-id',
            style: { width: '100%' },
            class: 'the-dude-abides',
        };

        it('should render <img /> component with "value" properties', () => {
            const [rendered, ...rest] = renderImage(props);

            expect(rest.length).toEqual(0);
            expect(rendered.getAttribute('src')).toEqual(props.media.value.src);
            expect(rendered.getAttribute('alt')).toEqual(props.media.value.alt);
        });

        it('should render <img /> with non-media props', () => {
            const [rendered] = renderImage(props);
            expect(rendered.getAttribute('id')).toEqual(props.id);
        });

        it('should render <img /> class props', () => {
            const [rendered] = renderImage(props);
            expect(rendered.getAttribute('class')).toEqual(props.class);
        });
    });

    describe('with "editable" property value', () => {
        const props = {
            media: { editable: eeImageData },
            class: 'the-dude-abides',
        };

        it('should render wrapper containing experience editor value', () => {
            const [rendered, ...rest] = renderImage(props);
            expect(rest.length).toEqual(0);
            expect(rendered).toBeTruthy();
            expect(rendered.outerHTML).toContain('<input');
        });

        it('should render <img /> class props', () => {
            const [rendered] = renderImage(props);
            expect(rendered.getAttribute('class')).toEqual(props.class);
        });
    });

});