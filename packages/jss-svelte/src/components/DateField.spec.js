import DateField from './DateField.svelte';
import { render, fireEvent } from '@testing-library/svelte'

it('it works', async () => {
    const { getByText, getByTestId } = render(DateField, { field: { value: 'Test' } })

    const text = getByText('Test');

    expect(text).not.toBeNull();
});