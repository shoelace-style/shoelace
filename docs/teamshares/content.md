# Content Guidelines

> Essential info on our in-house writing style, communications guidelines, and related preferences, plus guidelines for UX & UI writing and content for digital products.

<sl-tab-group>
  <sl-tab slot="nav" panel="writing-for-teamshares">Writing for Teamshares</sl-tab>
  <sl-tab slot="nav" panel="ui-writing">UX & UI writing</sl-tab>

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
     <h3 style="margin: 0; display: flex; align-items: flex-start;">Writing and Communicating for Teamshares<sl-icon library="fa" name="lock" style="margin-left: .5em; color: #2e333c;"></sl-icon></h3>
       <p class="ts-body-2 ts-text-subdued" style="margin-bottom: 0;">Login required</p>
      <div slot="footer" style="margin: 0; padding: 0;">
        <sl-button
          variant="text"
          href="https://www.notion.so/teamshares/Writing-and-Communicating-for-Teamshares-599d6c1c65474306aee5b69d0734d8ec?pvs=4"
          target="_blank">
           Open
           <sl-icon slot="suffix" library="fa" name="arrow-up-right-from-square"></sl-icon>
        </sl-button>
      </div>
    </sl-card>
    </div>
    </div>
  </sl-tab-panel>

  <sl-tab-panel name="ui-writing">
    <div class="panel-content">
    <h2>UX & UI Writing</h2>
    <p>These are some guidelines specific to writing in our digital products and interfaces. More coming soon!</p>
    <h3>Capitalization</h3>
    <p>Use sentence case for all headings and labels, including labels for UI elements like buttons.</p>
    <div class="grid-cards-2-col">
      <sl-alert class="do-dont" variant="success" open>
        <sl-icon slot="icon" library="fa" name="fas-circle-check"></sl-icon>
        <div style="margin-top:0" slot="header">Do</div>
        <div><sl-button variant="primary">Edit cap table</sl-button></div>
      </sl-alert>
      <sl-alert class="do-dont" variant="danger" open>
        <sl-icon slot="icon" library="fa" name="fas-circle-exclamation"></sl-icon>
        <div style="margin-top:0" slot="header">Don’t</div>
        <div><sl-button variant="primary">Edit Cap Table</sl-button></div>
      </sl-alert>
    </div>
    <sl-divider style="--spacing: 3rem;"></sl-divider>
    <h3>Quotation marks & apostrophes</h3>
    <p>Use curly (<code>“”</code>) instead of straight (<code>""</code>) versions of quotation marks and apostrophes.</p>
    <div class="grid-cards-2-col">
      <sl-alert class="do-dont" variant="success" open>
        <sl-icon slot="icon" library="fa" name="fas-circle-check"></sl-icon>
        <div style="margin-top:0" slot="header">Do</div>
        <div class="ts-body-large">Welcome! We’re glad you’re here.</div>
      </sl-alert>
      <sl-alert class="do-dont" variant="danger" open>
        <sl-icon slot="icon" library="fa" name="fas-circle-exclamation"></sl-icon>
        <div style="margin-top:0" slot="header">Don’t</div>
        <div class="ts-body-large">Welcome! We're glad you're here.</div>
      </sl-alert>
    </div>
    </div>
  </sl-tab-panel>

</sl-tab-group>
