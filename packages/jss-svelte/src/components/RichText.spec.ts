import RichText from './RichText.svelte';
import { render } from '@testing-library/svelte'
import { richTextField as eeRichTextData } from '../testData/ee-data';

const renderRichText = (props) => {
    const { container } = render(RichText, props);
    const div = container.getElementsByTagName('div');
    const [wrapper, ...rest] = div;
    return rest;
}

describe('<RichText />', () => {
  it('should render nothing with missing field', () => {
    const field = null;
    const rendered = renderRichText({ field });
    expect(rendered.length).toEqual(0);
  });

  it('should render nothing with missing editable and value', () => {
    const field = {};
    const rendered = renderRichText({ field });
    expect(rendered.length).toEqual(0);
  });

  it('should render editable with editable value', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const [rendered, ...rest] = renderRichText({ field });
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('editable');
  });

  it('should render value with editing explicitly disabled', () => {
    const field = {
      value: 'value',
      editable: 'editable',
    };
    const [rendered, ...rest] = renderRichText({ field, editable: false });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('value');
  });

  it('should render value with with just a value', () => {
    const field = {
      value: 'value',
    };
    const [rendered, ...rest] = renderRichText({ field });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('value');
  });

  it('should render embedded html as-is', () => {
    const field = {
      value: '<input type="text">some crazy stuff<script code="whaaaat">uh oh</script>',
    };
    const [rendered, ...rest] = renderRichText({ field });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain(field.value);
  });

  it('should render ee HTML', () => {
    const field = {
      editable: eeRichTextData,
    };
    const [rendered, ...rest] = renderRichText({ field });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('<input');
    expect(rendered.outerHTML).toContain('<span class="scChromeData">');
  });

  it('should render other attributes with other props provided', () => {
    const field = {
      value: 'value',
    };
    const [rendered, ...rest] = renderRichText({ field, class: 'cssClass', id: 'lorem' });
    expect(rendered).toBeTruthy();
    expect(rest.length).toEqual(0);
    expect(rendered.outerHTML).toContain('<div class="cssClass" id="lorem">');
    expect(rendered.outerHTML).toContain('value');
  });
});