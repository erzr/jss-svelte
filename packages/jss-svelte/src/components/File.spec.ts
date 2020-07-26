import File from './File.svelte';
import { render } from '@testing-library/svelte'

describe('<File />', () => {
    it('should render nothing with missing field', () => {
        const { container } = render(File, { field: null })
        expect(container.textContent).toHaveLength(0);
    });

    it('should render nothing with missing value', () => {
        const field = {
            editable: 'lorem',
        };
        const { container } = render(File, { field: field })
        expect(container.textContent).toHaveLength(0);
    });

    it('should render with src directly on provided field', () => {
        const field = {
            src: '/lorem',
            title: 'ipsum',
        };
        const { container } = render(File, { field: field })
        expect(container.innerHTML).toContain(field.src);
        expect(container.innerHTML).toContain(field.title);
    });

    it('should render display name if no title', () => {
        const field = {
            value: {
                src: '/lorem',
                displayName: 'ipsum',
            },
        };
        const { container } = render(File, { field: field })
        expect(container.innerHTML).toContain(field.value.displayName);
    });

    it('should render other attributes with other props provided', () => {
        const field = {
            value: {
                src: '/lorem',
                title: 'ipsum',
            },
        };
        const { container } = render(File, { field: field, id: 'my-file', 'class': 'my-css' });
        expect(container.innerHTML).toContain('id="my-file"');
        expect(container.innerHTML).toContain('class="my-css"');
    });
});