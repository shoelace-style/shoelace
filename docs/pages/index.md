---
layout: blank.njk
---

<div class="showcase-examples-wrapper" aria-hidden="true" data-no-outline>
    <div class="showcase-examples">
        <wa-card>
            <div slot="header" class="wa-split">
                <h3 class="wa-heading-m">Your Cart</h3>
                <wa-button appearance="plain" size="small" tabindex="-1">
                    <wa-icon name="xmark" label="Close"></wa-icon>
                </wa-button>
            </div>
            <div class="wa-stack wa-gap-xl">
                <div class="wa-flank">
                    <wa-avatar
                        shape="rounded"
                        style="background-color: var(--wa-color-green-60); color: var(--wa-color-green-95)"
                    >
                        <wa-icon slot="icon" name="sword-laser"></wa-icon>
                    </wa-avatar>
                    <div class="wa-stack wa-gap-2xs">
                        <div class="wa-split wa-gap-2xs">
                            <strong>Initiate Saber</strong>
                            <strong>$179.99</strong>
                        </div>
                        <div class="wa-split wa-gap-2xs wa-caption-m">
                            <span>Green</span>
                            <a href="#" tabindex="-1">Remove</a>
                        </div>
                    </div>
                </div>
                <wa-divider></wa-divider>
                <div class="wa-flank">
                    <wa-avatar
                        shape="rounded"
                        style="background-color: var(--wa-color-cyan-60); color: var(--wa-color-cyan-95)"
                    >
                        <wa-icon slot="icon" name="robot-astromech"></wa-icon>
                    </wa-avatar>
                    <div class="wa-stack wa-gap-2xs">
                        <div class="wa-split wa-gap-2xs">
                            <strong>Repair Droid</strong>
                            <strong>$3,049.99</strong>
                        </div>
                        <div class="wa-split wa-gap-2xs wa-caption-m">
                            <span>R-series</span>
                            <a href="#" tabindex="-1">Remove</a>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="wa-stack">
                <div class="wa-split">
                    <strong>Subtotal</strong>
                    <strong>$3,229.98</strong>
                </div>
                <span class="wa-caption-m">Shipping and taxes calculated at checkout.</span>
                <wa-button tabindex="-1" variant="brand">
                    <wa-icon slot="start" name="shopping-bag"></wa-icon>
                    Checkout
                </wa-button>
            </div>
        </wa-card>
        <wa-card>
            <wa-avatar shape="rounded" style="--size: 1.8lh; float: left; margin-right: var(--wa-space-m)">
                <wa-icon slot="icon" name="hat-wizard" style="font-size: 1.75em"></wa-icon>
            </wa-avatar>
            <p
                class="wa-body-l"
                style="
                    margin: 0;
                    font-family: var(--wa-font-family-longform);
                    font-weight: var(--wa-font-weight-longform);
                "
            >
                &ldquo;All we have to decide is what to do with the time that is given to us. There are other
                forces at work in this world, Frodo, besides the will of evil.&rdquo;
            </p>
        </wa-card>
        <wa-card>
            <div class="wa-stack">
                <h3 class="wa-heading-m">Sign In</h3>
                <wa-input tabindex="-1" label="Email" placeholder="ddjarin@mandalore.gov">
                    <wa-icon slot="start" name="envelope" variant="regular"></wa-icon>
                </wa-input>
                <wa-input tabindex="-1" label="Password" type="password">
                    <wa-icon slot="start" name="lock" variant="regular"></wa-icon>
                </wa-input>
                <wa-button tabindex="-1" variant="brand">Sign In</wa-button>
                <a href="#" tabindex="-1" class="wa-body-s">I forgot my password</a>
            </div>
        </wa-card>
        <wa-card>
            <div class="wa-stack">
                <div class="wa-split">
                    <h3 class="wa-heading-m">To-Do</h3>
                    <wa-button appearance="plain" size="small" tabindex="-1">
                        <wa-icon name="plus" label="Add task"></wa-icon>
                    </wa-button>
                </div>
                <wa-checkbox tabindex="-1" checked>Umbrella for Adelard</wa-checkbox>
                <wa-checkbox tabindex="-1" checked>Waste-paper basket for Dora</wa-checkbox>
                <wa-checkbox tabindex="-1" checked>Pen and ink for Milo</wa-checkbox>
                <wa-checkbox tabindex="-1">Mirror for Angelica</wa-checkbox>
                <wa-checkbox tabindex="-1">Silver spoons for Lobelia</wa-checkbox>
            </div>
            <div slot="footer">
                <a href="" tabindex="-1">View all completed</a>
            </div>
        </wa-card>
        <wa-card>
            <div class="wa-stack">
                <div class="wa-frame wa-border-radius-m" style="align-self: center; max-inline-size: 25ch">
                    <img
                        src="https://images.unsplash.com/photo-1667514627762-521b1c815a89?q=20"
                        alt="Album art"
                    />
                </div>
                <div class="wa-flank:end wa-align-items-start">
                    <div class="wa-stack wa-gap-3xs">
                        <div class="wa-cluster wa-gap-xs" style="height: 2.25em">
                            <strong>The Stone Troll</strong>
                            <small><wa-badge variant="neutral" appearance="filled">E</wa-badge></small>
                        </div>
                        <span class="wa-caption-m">Samwise G</span>
                    </div>
                    <wa-button appearance="plain" size="small" tabindex="-1">
                        <wa-icon name="ellipsis" label="Options"></wa-icon>
                    </wa-button>
                </div>
                <div class="wa-stack wa-gap-2xs">
                    <wa-progress-bar value="34"></wa-progress-bar>
                    <div class="wa-split">
                        <span class="wa-caption-xs">1:01</span>
                        <span class="wa-caption-xs">-1:58</span>
                    </div>
                </div>
                <div
                    class="wa-grid wa-align-items-center"
                    style="--min-column-size: 1em; justify-items: center"
                >
                    <wa-button appearance="plain" tabindex="-1">
                        <wa-icon name="backward" label="Skip backward"></wa-icon>
                    </wa-button>
                    <wa-button appearance="plain" size="large" tabindex="-1">
                        <wa-icon name="pause" label="Pause"></wa-icon>
                    </wa-button>
                    <wa-button appearance="plain" tabindex="-1">
                        <wa-icon name="forward" label="Skip forward"></wa-icon>
                    </wa-button>
                </div>
            </div>
        </wa-card>
        <wa-card>
            <div class="wa-stack">
                <h3 class="wa-heading-m">Chalmun's Spaceport Cantina</h3>
                <div class="wa-cluster wa-gap-xs">
                    <wa-rating value="4.6" readonly tabindex="-1"></wa-rating>
                    <strong>4.6</strong>
                    <span>(419 reviews)</span>
                </div>
                <div class="wa-cluster wa-gap-xs">
                    <div class="wa-cluster wa-gap-3xs">
                        <wa-icon name="dollar" style="color: var(--wa-color-green-60)"></wa-icon>
                        <wa-icon name="dollar" style="color: var(--wa-color-green-60)"></wa-icon>
                        <wa-icon name="dollar" style="color: var(--wa-color-green-60)"></wa-icon>
                    </div>
                    <span class="wa-caption-m">&bull;</span>
                    <wa-tag size="small">Cocktail Bar</wa-tag>
                    <wa-tag size="small">Gastropub</wa-tag>
                    <wa-tag size="small">Local Fare</wa-tag>
                </div>
                <div class="wa-flank wa-gap-xs">
                    <wa-icon name="location-dot"></wa-icon>
                    <a href="#" class="wa-caption-m" tabindex="-1">Mos Eisley, Tatooine</a>
                </div>
            </div>
        </wa-card>
        <wa-card appearance="plain" style="--spacing: 0">
            <div class="wa-stack wa-gap-s">
                <wa-callout variant="success">
                    <wa-icon slot="icon" name="user-bounty-hunter"></wa-icon>
                    <div class="wa-split">
                        <span>This is the way.</span>
                        <wa-button variant="success" size="small"> Follow the Creed </wa-button>
                    </div>
                </wa-callout>
                <wa-callout variant="warning">
                    <wa-icon slot="icon" name="starfighter-twin-ion-engine"></wa-icon>
                    <div class="wa-split">
                        <span>It's a trap!</span>
                        <wa-button variant="warning" size="small"> Take Evasive Action </wa-button>
                    </div>
                </wa-callout>
                <wa-callout variant="danger">
                    <wa-icon slot="icon" name="space-station-moon"></wa-icon>
                    <div class="wa-split">
                        <span>That's no moon.</span>
                        <wa-button variant="danger" size="small"> Turn Around </wa-button>
                    </div>
                </wa-callout>
            </div>
        </wa-card>
        <wa-card>
            <div class="wa-stack">
                <div class="wa-flank:end">
                    <h3 id="odds-label" class="wa-heading-m">Tell Me the Odds</h3>
                    <wa-switch size="large" aria-labelledby="odds-label" tabindex="-1"></wa-switch>
                </div>
                <p class="wa-body-s">
                    Allow protocol droids to inform you of probabilities, such as the success rate of navigating
                    an asteroid field. We recommend setting this to "Never."
                </p>
            </div>
        </wa-card>
        <wa-card>
            <div class="wa-stack">
                <div class="wa-split wa-align-items-start">
                    <dl class="wa-stack wa-gap-2xs">
                        <dt class="wa-heading-s">Amount</dt>
                        <dd class="wa-heading-l">$5,610.00</dd>
                    </dl>
                    <wa-badge appearance="filled-outlined" variant="success">Paid</wa-badge>
                </div>
                <wa-divider></wa-divider>
                <dl class="wa-stack">
                    <div class="wa-flank wa-align-items-center">
                        <dt><wa-icon name="user" label="Name"></wa-icon></dt>
                        <dd>Tom Bombadil</dd>
                    </div>
                    <div class="wa-flank wa-align-items-center">
                        <dt><wa-icon name="calendar-days" label="Date"></wa-icon></dt>
                        <dd><wa-format-date date="2025-03-15"></wa-format-date></dd>
                    </div>
                    <div class="wa-flank wa-align-items-center">
                        <dt><wa-icon name="coin-vertical"></wa-icon></dt>
                        <dd>Paid with copper pennies</dd>
                    </div>
                </dl>
            </div>
            <div slot="footer">
                <a href="" class="wa-cluster wa-gap-2xs" tabindex="-1">
                    <span>Download Receipt</span>
                    <wa-icon name="arrow-right"></wa-icon>
                </a>
            </div>
        </wa-card>
        <wa-card>
            <div class="wa-stack">
                <div class="wa-split">
                    <div class="wa-cluster wa-heading-l">
                        <wa-icon name="book-sparkles"></wa-icon>
                        <h3>Fellowship</h3>
                    </div>
                    <wa-badge>Most Popular</wa-badge>
                </div>
                <span class="wa-flank wa-align-items-baseline wa-gap-2xs">
                    <span class="wa-heading-2xl">$120</span>
                    <span class="wa-caption-l">per year</span>
                </span>
                <p class="wa-caption-l">Carry great power (and great responsibility).</p>
                <wa-button variant="brand" tabindex="-1">Get this Plan</wa-button>
            </div>
            <div slot="footer" class="wa-stack wap-gap-s">
                <h4 class="wa-heading-s">What You Get</h4>
                <div class="wa-stack">
                    <div class="wa-flank">
                        <wa-icon name="user"></wa-icon>
                        <span class="wa-caption-m">9 users</span>
                    </div>
                    <div class="wa-flank">
                        <wa-icon name="ring"></wa-icon>
                        <span class="wa-caption-m">1 ring</span>
                    </div>
                    <div class="wa-flank">
                        <wa-icon name="chess-rook"></wa-icon>
                        <span class="wa-caption-m">API access to Isengard</span>
                    </div>
                    <div class="wa-flank">
                        <wa-icon name="feather"></wa-icon>
                        <span class="wa-caption-m">Priority eagle support</span>
                    </div>
                </div>
            </div>
        </wa-card>
        <wa-card class="showcase-code-sample">
            <pre>
&lt;<span class="tag">div</span> <span class="attribute">class</span>="<span class="value">fellowship</span>"&gt;
&lt;<span class="tag">p</span> <span class="attribute">class</span>="<span class="value">ring-bearer</span>"&gt;Frodo carries the &lt;<span class="tag">span</span> <span class="attribute">id</span>="<span class="value">one-ring</span>"&gt;One Ring&lt;/<span class="tag">span</span>&gt;&lt;/<span class="tag">p</span>&gt;
&lt;<span class="tag">ul</span> <span class="attribute">class</span>="<span class="value">companions</span>"&gt;
&lt;<span class="tag">li</span> <span class="attribute">data-race</span>="<span class="value">wizard</span>"&gt;Gandalf the Grey&lt;/<span class="tag">li</span>&gt;
&lt;<span class="tag">li</span> <span class="attribute">data-race</span>="<span class="value">elf</span>"&gt;Legolas&lt;/<span class="tag">li</span>&gt;
&lt;<span class="tag">li</span> <span class="attribute">data-race</span>="<span class="value">dwarf</span>"&gt;Gimli&lt;/<span class="tag">li</span>&gt;
&lt;/<span class="tag">ul</span>&gt;
&lt;/<span class="tag">div</span>&gt;</pre>
        </wa-card>
        <wa-card with-footer>
            <div class="wa-flank:end">
                <div class="wa-stack wa-gap-xs">
                    <div class="wa-cluster wa-gap-xs">
                        <h3 class="wa-heading-s">Migs Mayfeld</h3>
                        <wa-badge pill>Admin</wa-badge>
                    </div>
                    <span class="wa-caption-m">Imperial Sharpshooter</span>
                </div>
                <wa-avatar
                    image="https://images.unsplash.com/photo-1633268335280-a41fbde58707?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    label="Avatar of a man wearing a sci-fi helmet (Photograph by Nandu Vasudevan)"
                ></wa-avatar>
            </div>
            <div slot="footer" class="wa-grid wa-gap-xs" style="--min-column-size: 10ch">
                <wa-button appearance="outlined" tabindex="-1">
                    <wa-icon slot="start" name="at"></wa-icon>
                    Email
                </wa-button>
                <wa-button appearance="outlined" tabindex="-1">
                    <wa-icon slot="start" name="phone"></wa-icon>
                    Phone
                </wa-button>
            </div>
        </wa-card>
        <wa-card>
            <div class="wa-flank:end">
                <a href="" class="wa-flank wa-link-plain" tabindex="-1">
                    <wa-avatar
                        shape="rounded"
                        style="background-color: var(--wa-color-yellow-90); color: var(--wa-color-yellow-50)"
                    >
                        <wa-icon slot="icon" name="egg-fried"></wa-icon>
                    </wa-avatar>
                    <div class="wa-gap-2xs wa-stack">
                        <span class="wa-heading-s">Second Breakfast</span>
                        <span class="wa-caption-m">19 Items</span>
                    </div>
                </a>
                <wa-dropdown>
                    <wa-button id="more-actions-2" slot="trigger" appearance="plain" size="small" tabindex="-1">
                        <wa-icon name="ellipsis-vertical" label="View menu"></wa-icon>
                    </wa-button>
                    <wa-dropdown-item>Copy link</wa-dropdown-item>
                    <wa-dropdown-item>Rename</wa-dropdown-item>
                    <wa-dropdown-item>Move to trash</wa-dropdown-item>
                </wa-dropdown>
                <wa-tooltip for="more-actions-2">View menu</wa-tooltip>
            </div>
        </wa-card>
        <wa-card with-header with-footer>
            <div slot="header" class="wa-stack wa-gap-xs">
                <h2 class="wa-heading-m">Decks</h2>
            </div>
            <div class="wa-stack wa-gap-xl">
                <p class="wa-caption-m">
                    You haven't created any decks yet. Get started by selecting an aspect that matches your play
                    style.
                </p>
                <div class="wa-grid wa-gap-xl" style="--min-column-size: 30ch">
                    <a href="" class="wa-flank wa-align-items-start wa-link-plain" tabindex="-1">
                        <wa-avatar
                            shape="rounded"
                            style="background-color: var(--wa-color-blue-90); color: var(--wa-color-blue-50)"
                        >
                            <wa-icon slot="icon" name="shield"></wa-icon>
                        </wa-avatar>
                        <div class="wa-stack wa-gap-2xs">
                            <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
                                Vigilance <wa-icon name="arrow-right"></wa-icon>
                            </span>
                            <p class="wa-caption-m">Protect, defend, and restore as you ready heavy-hitters.</p>
                        </div>
                    </a>
                    <a href="" class="wa-flank wa-align-items-start wa-link-plain" tabindex="-1">
                        <wa-avatar
                            shape="rounded"
                            style="background-color: var(--wa-color-green-90); color: var(--wa-color-green-50)"
                        >
                            <wa-icon slot="icon" name="chevrons-up"></wa-icon>
                        </wa-avatar>
                        <div class="wa-stack wa-gap-2xs">
                            <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
                                Command <wa-icon name="arrow-right"></wa-icon>
                            </span>
                            <p class="wa-caption-m">Build imposing armies and stockpile resources.</p>
                        </div>
                    </a>
                    <a href="" class="wa-flank wa-align-items-start wa-link-plain" tabindex="-1">
                        <wa-avatar
                            shape="rounded"
                            style="background-color: var(--wa-color-red-90); color: var(--wa-color-red-50)"
                        >
                            <wa-icon slot="icon" name="explosion"></wa-icon>
                        </wa-avatar>
                        <div class="wa-stack wa-gap-2xs">
                            <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
                                Aggression <wa-icon name="arrow-right"></wa-icon>
                            </span>
                            <p class="wa-caption-m">
                                Relentlessly deal damage and apply pressure to your opponent.
                            </p>
                        </div>
                    </a>
                    <a href="" class="wa-flank wa-align-items-start wa-link-plain" tabindex="-1">
                        <wa-avatar
                            shape="rounded"
                            style="
                                background-color: var(--wa-color-yellow-90);
                                color: var(--wa-color-yellow-50);
                            "
                        >
                            <wa-icon slot="icon" name="moon-stars"></wa-icon>
                        </wa-avatar>
                        <div class="wa-stack wa-gap-2xs">
                            <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
                                Cunning <wa-icon name="arrow-right"></wa-icon>
                            </span>
                            <p class="wa-caption-m">
                                Disrupt and frustrate your opponent with dastardly tricks.
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div slot="footer">
                <a href="" class="wa-cluster wa-gap-xs" tabindex="-1">
                    <span>Or start a deck from scratch</span>
                    <wa-icon name="arrow-right"></wa-icon>
                </a>
            </div>
        </wa-card>
    </div>
</div>

<style>
    html,
    body,
    .theme-showcase {
        background-color: var(--wa-color-surface-lowered);
    }

    .showcase-examples-wrapper {
        container-type: inline-size;
        inline-size: 100%;
        min-block-size: 100%;
        box-sizing: border-box;
        padding: 1.75rem;
        background-color: var(--wa-color-surface-lowered);
    }

    .showcase-examples {
        column-count: 1;
        column-gap: var(--wa-space-l);

        & wa-card {
            display: inline-flex;
            width: 100%;

            &:has(+ wa-card) {
                margin-block-end: var(--wa-space-l);
            }

            &[appearance="plain"] {
                background-color: transparent !important;
                border-color: transparent !important;
            }
        }

        @container (width > 500px) {
            column-count: 2;
        }

        @container (width > 750px) {
            column-count: 3;
        }

        @container (width > 950px) {
            column-count: auto;
            column-width: 22rem;
        }
    }

    .showcase-code-sample {
        --spacing: 0;
        overflow: hidden;

        pre {
            color: var(--wa-color-text-quiet);
        }

        .tag {
            color: var(--wa-color-indigo-40);
        }

        .attribute {
            color: var(--wa-color-green-40);
        }

        .value {
            color: var(--wa-color-brand-40);
        }

        .wa-dark & {
            .tag {
                color: var(--wa-color-indigo-70);
            }

            .attribute {
                color: var(--wa-color-green-70);
            }

            .value {
                color: var(--wa-color-brand-70);
            }
        }
    }

    .theme-showcase {
        isolation: isolate;
        background-color: var(--wa-color-surface-lowered);
        border-radius: var(--wa-border-radius-l);
        overflow: hidden;

        @media (width < 500px) {
            flex-flow: column;
        }

        header {
            min-width: min(25ch, 100vw);
            align-self: center;
            padding: var(--wa-space-xl);
            box-sizing: border-box;

            h1 {
                margin-bottom: var(--wa-space-2xs);
            }

            wa-breadcrumb-item:not(:first-of-type, :last-of-type) {
                display: none;
            }

            p:empty {
                display: none;
            }
        }
    }

    wa-progress-bar {
        --track-height: 0.5em;
    }
</style>
