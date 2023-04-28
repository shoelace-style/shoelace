# Content Guidelines

> Essential info on our in-house writing style, communications guidelines, and related preferences, plus guidelines for UI writing and content for digital products.

<sl-tab-group>
  <sl-tab slot="nav" panel="writing-for-teamshares">Writing for Teamshares</sl-tab>
  <sl-tab slot="nav" panel="ui-writing">UI writing</sl-tab>

  <sl-tab-panel name="writing-for-teamshares">
    <div class="panel-content">
    <h2>Writing for Teamshares</h2>
    <div class="grid-cards-2-col">
    <sl-card class="small-footer">
      <img
      slot="image"
      src="/teamshares/images/notion-links.svg"
      alt="Notion image"
      style="margin: 1px; border-radius: 8px 8px 0 0;"
      />
     <h3 style="margin: 0; display: flex; align-items: flex-start;">Writing and Communicating for Teamshares<sl-icon name="lock-closed" style="margin-left: .5em; color: #2e333c;"></sl-icon></h3>
       <p class="ts-body-2 ts-text-subdued" style="margin-bottom: 0;">Login required</p>
      <div slot="footer" style="margin: 0; padding: 0;">
        <sl-button
          variant="text"
          href="https://app.pitch.com/app/presentation/1abf8c85-db06-4d4b-a4c5-71f0fb935ab1/e4229594-37e8-442e-baa1-bc8a8e5f598b"
          target="_blank">
           Open
           <sl-icon slot="suffix" name="arrow-top-right-on-square"></sl-icon>
        </sl-button>
      </div>
    </sl-card>
    </div>
    </div>
  </sl-tab-panel>

  <sl-tab-panel name="ui-writing">
    <div class="panel-content">
    <h2>UI Writing</h2>
    <p>These are some guidelines specific to writing in our digital products and interfaces. More coming soon!</p>
    <h3>Capitalization</h3>
    <p>Use sentence case for all headings and labels, including labels for UI elements like buttons.</p>
    <div class="grid-cards-2-col">
      <sl-alert class="do-dont" variant="success" open>
        <sl-icon slot="icon" name="check-circle-solid"></sl-icon>
        <div class="ts-heading-8">Do</div>
        <div><sl-button>Edit cap table</sl-button></div>
        <div><sl-tag>In progress</sl-tag></div>
      </sl-alert>
      <sl-alert class="do-dont" variant="danger" open>
        <sl-icon slot="icon" name="x-circle-solid"></sl-icon>
        <div class="ts-heading-8">Don’t</div>
        <div><sl-button>Edit Cap Table</sl-button></div>
        <div><sl-tag>In Progress</sl-tag></div>
      </sl-alert>
    </div>
    <sl-divider style="--spacing: 3rem;"></sl-divider>
    <h3>Quotation marks & apostrophes</h3>
    <p>Use curly (<code>“”</code>) instead of straight (<code>""</code>) versions of quotation marks and apostrophes.</p>
    <div class="grid-cards-2-col">
      <sl-alert class="do-dont" variant="success" open>
        <sl-icon slot="icon" name="check-circle-solid"></sl-icon>
        <div class="ts-heading-8">Do</div>
        <div class="ts-body-large">Welcome! We’re glad you’re here.</div>
      </sl-alert>
      <sl-alert class="do-dont" variant="danger" open>
        <sl-icon slot="icon" name="x-circle-solid"></sl-icon>
        <div class="ts-heading-8">Don’t</div>
        <div class="ts-body-large">Welcome! We're glad you're here.</div>
      </sl-alert>
    </div>
    </div>
  </sl-tab-panel>

</sl-tab-group>
