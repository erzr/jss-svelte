<script>
  import { DateField, getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";

  export let fields = null;
  export let rendering = null;

  const specimanProps = {
      fields,
      rendering
  }

</script>

    <StyleguideSpecimen {...specimanProps} e2eId="styleguide-fieldusage-date">
      <ul>
        <li>
          Date helper: <DateField field={fields.date} />
        </li>
        <li>
          Date helper (datetime): <DateField field={fields.dateTime} />
        </li>
        <li>
          UTC Date string:&nbsp;
          <DateField field={fields.date} render={(date) => date.toUTCString()} />
        </li>
        <li>
          Localized Date string (local timezone):&nbsp;
          <DateField field={fields.date} render={(date) => date.toLocaleDateString()} />
        </li>
      </ul>
    </StyleguideSpecimen>