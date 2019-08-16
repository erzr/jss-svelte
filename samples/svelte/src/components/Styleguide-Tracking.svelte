<script>
  import { getFieldValue } from "jss-svelte";
  import StyleguideSpecimen from "../StyleguideSpecimen.svelte";
  import { trackingApi } from "@sitecore-jss/sitecore-jss-tracking";
  import { dataFetcher } from "../dataFetcher";
  import config from "../temp/config";

  export let fields = null;
  export let rendering = null;
  export let sitecoreContext = null;

  const specimanProps = {
    fields,
    rendering
  };

  let eventId = "";
  let goal = "";
  let outcomeName = "";
  let outcomeValue = "";
  let campaign = "";
  let pageId = "";
  let pageUrl = "";

  let trackingApiOptions = {
    host: config.sitecoreApiHost,
    querystringParams: {
      sc_apikey: config.sitecoreApiKey
    },
    fetcher: dataFetcher
  };

  function submitEvent () {
    trackingApi
      .trackEvent(
        [{ eventId: eventId }],
        trackingApiOptions
      )
      .then(() => alert("Page event pushed"))
      .catch(error => alert(error));
  };

  function submitGoal () {
    trackingApi
      .trackEvent(
        [{ goalId: goal }],
        trackingApiOptions
      )
      .then(() => alert("Goal pushed"))
      .catch(error => alert(error));
  };

  function submitOutcome () {
    trackingApi
      .trackEvent(
        [
          {
            outcomeId: outcomeName,
            currencyCode: "USD",
            monetaryValue: outcomeValue
          }
        ],
        trackingApiOptions
      )
      .then(() => alert("Outcome pushed"))
      .catch(error => alert(error));
  };

  function triggerCampaign() {
    trackingApi
      .trackEvent(
        [{ campaignId: campaign }],
        trackingApiOptions
      )
      .then(() => alert("Campaign set"))
      .catch(error => alert(error));
  };

  function submitPageView() {
    trackingApi
      .trackEvent(
        [
          { pageId: pageId, url: pageUrl }
        ],
        trackingApiOptions
      )
      .then(() => alert("Page view pushed"))
      .catch(error => alert(error));
  };

  function abandonSession() {
    const abandonOptions = {
      action: "flush",
      ...trackingApiOptions
    };

    trackingApi
      .trackEvent([], abandonOptions)
      .then(() =>
        alert(
          "Interaction has been terminated and its data pushed to xConnect."
        )
      )
      .catch(error => alert(error));
  };

  function submitBatching () {
    trackingApi
      .trackEvent(
        [
          { eventId: "Download" },
          { goalId: "Instant Demo" },
          { outcomeId: "Opportunity" },
          {
            pageId: "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}",
            url: "/arbitrary/url/you/own"
          },
          // this goal will be added to the new page/route ID set above, not the current route
          { goalId: "Register" }
        ],
        trackingApiOptions
      )
      .then(() => alert("Batch of events pushed"))
      .catch(error => alert(error));
  };
  const disconnectedMode =
    sitecoreContext.context.itemId === "available-in-connected-mode";
</script>

<StyleguideSpecimen {...specimanProps} e2eId="styleguide-tracking">
  {#if disconnectedMode}
    <p>
      The tracking API is only available in connected, integrated, or headless
      modes.
    </p>
  {:else}
    <div>
      <p class="alert alert-warning">
        Note: The JSS tracker API is disabled by default. Consult the
        <a href="https://jss.sitecore.com/docs/fundamentals/services/tracking">
          tracking documentation
        </a>
        to enable it.
      </p>
      <div class="row">
        <fieldset class="form-group col-sm">
          <legend>Event</legend>
          <p>
            Events are defined in
            <code>/sitecore/system/Settings/Analytics/Page Events</code>
          </p>
          <label htmlFor="event">Event GUID or Name</label>
          <input
            type="text"
            id="event"
            class="form-control"
            bind:value={eventId} />
          <button
            type="button"
            class="btn btn-primary mt-3"
            on:click={submitEvent}>
            Submit
          </button>
        </fieldset>

        <fieldset class="form-group col-sm">
          <legend>Goal</legend>
          <p>
            Goals are defined in
            <code>/sitecore/system/Marketing Control Panel/Goals</code>
          </p>
          <label htmlFor="goal">Goal GUID or Name</label>
          <input
            type="text"
            class="form-control"
            id="goal"
            bind:value={goal}
            placeholder="i.e. Register" />
          <button
            type="button"
            class="btn btn-primary mt-3"
            on:click={submitGoal}>
            Submit
          </button>
        </fieldset>
      </div>
      <div class="row">
        <fieldset class="form-group col-sm">
          <legend>Outcome</legend>
          <p>
            Outcomes are defined in{' '}
            <code>/sitecore/system/Marketing Control Panel/Outcomes</code>
          </p>
          <label htmlFor="outcomeName">Outcome GUID or Name</label>
          <input
            type="text"
            class="form-control"
            id="outcomeName"
            bind:value={outcomeName}
            placeholder="i.e. Marketing Lead" />
          <br />
          <label htmlFor="outcomeValue">Monetary Value (optional)</label>
          <input
            type="number"
            class="form-control"
            id="outcomeValue"
            bind:value={outcomeValue}
            placeholder="i.e. 1337.00" />
          <button
            type="button"
            class="btn btn-primary mt-3"
            on:click="{submitOutcome}">
            Submit
          </button>
        </fieldset>

        <fieldset class="form-group col-sm">
          <legend>Campaign</legend>
          <p>
            Campaigns are defined in{' '}
            <code>/sitecore/system/Marketing Control Panel/Campaigns</code>
          </p>
          <label htmlFor="campaign">Campaign GUID or Name</label>
          <input
            type="text"
            class="form-control"
            id="campaign"
            bind:value={campaign} />
          <button
            type="button"
            class="btn btn-primary mt-3"
            on:click={triggerCampaign}>
            Submit
          </button>
        </fieldset>
      </div>
      <div class="row">
        <fieldset class="form-group col-sm">
          <legend>Page View</legend>
          <p>
            Track arbitrary page views for custom routing or offline use. Note
            that Layout Service tracks page views by default unless
            <code>tracking=false</code>
            is passed in its query string.
          </p>
          <label htmlFor="pageId">Page Item GUID</label>
          <input
            type="text"
            class="form-control"
            id="pageId"
            bind:value={pageId}
            placeholder="i.e. {11111111 - 1111 - 1111 - 1111 - 111111111111}" />
          <br />
          <label htmlFor="pageUrl">Page URL</label>
          <input
            type="text"
            class="form-control"
            id="pageUrl"
            bind:value={pageUrl}
            placeholder="i.e. /foo/bar" />
          <button
            type="button"
            class="btn btn-primary mt-3"
            on:click={submitPageView}>
            Submit
          </button>
        </fieldset>

        <fieldset class="form-group col-sm">
          <legend>Batching</legend>
          <p>
            The tracking API supports pushing a whole batch of events in a
            single request. This can be useful for queuing strategies or offline
            PWA usage.
          </p>
          <button
            type="button"
            class="btn btn-primary"
            on:click={submitBatching}>
            Submit Batch of Events
          </button>
        </fieldset>
      </div>
      <div class="row">
        <fieldset class="form-group col-sm">
          <legend>Interaction Control</legend>
          <p>
            Tracking data is not pushed into the xConnect service until your
            session ends on the Sitecore server. Click this button to instantly
            end your session and flush the data - great for debugging and
            testing.
          </p>
          <p class="alert alert-warning">
            Note: By default
            <em>anonymous</em>
            contacts will not be shown in Experience Profile. If your
            interactions are not showing up in Experience Profile, you may need
            to{' '}
            <a
              href="https://doc.sitecore.net/developers/xp/xconnect/xconnect-search-indexer/enable-anonymous-contact-indexing.html">
              enable anonymous contact indexing.
            </a>
          </p>
          <button
            type="button"
            class="btn btn-primary"
            on:click={abandonSession}>
            End Interaction
          </button>
        </fieldset>
      </div>
    </div>
  {/if}
</StyleguideSpecimen>
