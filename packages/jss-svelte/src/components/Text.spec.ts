import Text from './Text.svelte';
import { render } from '@testing-library/svelte'
import { textField as eeTextData } from '../testData/ee-data';

const renderText = (props) => {
    const { container } = render(Text, props);
    const elements = container.getElementsByTagName('span');
    return elements;
}

describe('<Text />', () => {
  it('should render nothing with missing field', () => {
    const field = null;
    const rendered = renderText({ field });
    expect(rendered.length).toEqual(0);
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    const rendered = renderText({ field });
    expect(rendered.length).toEqual(0);
  });

  it('should render editable with editable value', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const [rendered, ...rest] = renderText({ field });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('editable');
  });

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const [rendered, ...rest] = renderText({ field, editable: false });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('value');
  });

  it('should encode values with editing explicitly disabled', () => {
    const field = {
      value: 'value < >',
    };

    const [rendered, ...rest] = renderText({ field, editable: false });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('&lt; &gt;');
  });

  it('should render value with with just a value', () => {
    const field = {
      value: 'value',
    };
    const [rendered, ...rest] = renderText({ field });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('value');
  });

  it('should render embedded html as-is when encoding is disabled', () => {
    const field = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    const [rendered, ...rest] = renderText({ field, encode: false });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain(field.value);
  });

  it('should render ee HTML', () => {
    const field = {
      editable: eeTextData,
    };
    const [rendered] = renderText({ field });
    expect(rendered).toBeTruthy();
    expect(rendered.outerHTML).toContain('<input');
    expect(rendered.outerHTML).toContain('<span class="scChromeData">');
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: 'value',
    };
    const [rendered, ...rest] = renderText({ field, class: 'cssClass', id: 'lorem' });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('<span class="cssClass" id="lorem">');
    expect(rendered.outerHTML).toContain('value');
  });
});