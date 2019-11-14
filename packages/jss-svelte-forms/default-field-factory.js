import Section from './components/field-templates/Section.svelte';
import { default as TextField } from './components/field-templates/TextField.svelte';
import { default as SingleLineText } from './components/field-templates/SingleLineText.svelte';
import { default as Button } from './components/field-templates/Button.svelte';
import { default as Checkbox } from './components/field-templates/Checkbox.svelte';
import { default as CheckboxList } from './components/field-templates/CheckboxList.svelte';
import { default as DropdownList } from './components/field-templates/DropdownList.svelte';
import { default as DateField } from './components/field-templates/DateField.svelte';
import { default as Email } from './components/field-templates/Email.svelte';
import { default as ListBox } from './components/field-templates/ListBox.svelte';
import { default as MultipleLineText } from './components/field-templates/MultipleLineText.svelte';
import { default as NumberField } from './components/field-templates/NumberField.svelte';
import { default as Password } from './components/field-templates/Password.svelte';
import { default as RadioButtonList } from './components/field-templates/RadioButtonList.svelte';
import { default as Telephone } from './components/field-templates/Telephone.svelte';
import { FieldTypes } from './FieldTypes';

const fieldComponents = new Map();

fieldComponents.set(FieldTypes.Section, Section);
fieldComponents.set(FieldTypes.TextField, TextField);
fieldComponents.set(FieldTypes.Button, Button);
fieldComponents.set(FieldTypes.SingleLineText, SingleLineText);
fieldComponents.set(FieldTypes.MultipleLineText, MultipleLineText);
fieldComponents.set(FieldTypes.DateField, DateField);
fieldComponents.set(FieldTypes.Email, Email);
fieldComponents.set(FieldTypes.NumberField, NumberField);
fieldComponents.set(FieldTypes.Checkbox, Checkbox);
fieldComponents.set(FieldTypes.Telephone, Telephone);

fieldComponents.set(FieldTypes.DropdownList, DropdownList);
fieldComponents.set(FieldTypes.CheckboxList, CheckboxList);
fieldComponents.set(FieldTypes.ListBox, ListBox);
fieldComponents.set(FieldTypes.RadioButtonList, RadioButtonList);

fieldComponents.set(FieldTypes.Password, Password);

export default function fieldComponentFactory(field) {
    return fieldComponents.get(field.model.fieldTypeItemId);
};