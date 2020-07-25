import DateField from './DateField.svelte';
import { render, fireEvent } from '@testing-library/svelte'

describe('<DateField />', () => {
    it('should return null if no editable or value', async () => {
        const { container } = render(DateField, { field: null })
        expect(container.textContent).toHaveLength(0);
    });

    it('should render value', () => {
        const { container } = render(DateField, { field: { value: '23-11-2001' } })
        expect(container.textContent).toEqual('23-11-2001');
    });

    it('should render value using render prop function', () => {
        const { container } = render(DateField, {
            field: {
                value: '11-23-2001'
            },
            render: (date) => date ? date.toDateString() : ''
        });
        expect(container.textContent).toEqual('Fri Nov 23 2001');
    });

    it('should render null value using render prop function', () => {
        const { container } = render(DateField, {
            field: {
                value: undefined,
                editable: 'xxx'
            },
            editable: false,
            render: (date) => date ? date.toDateString() : ''
        });
        expect(container.textContent).toHaveLength(0);
    });

    it('should render editable value', () => {
        const { container } = render(DateField, {
            field: {
                editable: '<h1 class="super">11-23-2001</h1>'
            },
            editable: true
        });
        expect(container.innerHTML).toEqual('<div><h1 class="super">11-23-2001</h1></div>');
    });
});