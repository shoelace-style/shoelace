# Contributing

The Teamshares Design System is owned by all of us and relies on contributions from all the teams. Thank you in advance for your input!

## Process

Because the system is shared across all our apps, we need to make sure that any changes will work for all instances of the components. This involves a few steps:

1. ### Design approval

   Any changes or additions to the UX or visual appearance of a component must be approved by the design system designers.

   **_If you're a designer_**, please seek approval within the design team before creating a ticket for engineering.

   **_If you're an engineer or PM_**, please bring the change to the designer on your team to seek buy-in from the design team.

   Bug fixes don't need approval unless they represent a change of appearance or behavior.

1. ### Component audit

   Before implementing the change, do a sanity check across the apps and make sure the change won't break any existing usage of the component. One easy way to find the usage is to do an org-wide search on GitHub for the component name. For very common components, such as buttons and inputs, this will turn up a lot of results, which is exactly why we need to be careful making changes to them. If you're only changing a specific usage of a component -- say, numeric inputs -- you should be able to filter the search results to find only those usages.

1. ### Implementation

   As much as possible, try to follow Shoelace's [conventions and best practices](/resources/contributing?id=best-practices), including test coverage. This will make it easier to maintain the library over time as we continue to pull in changes from upstream.

1. ### Code review

   Once you've made your changes and they're ready for feedback, make a PR and one of the core library maintainers will review the code to make sure it adheres to the [best practices](/resources/contributing?id=best-practices).

   !> **Caution:** Don't accidentally open a PR against the upstream repository (Shoelace itself). Many Git tools, such as Github Desktop, will default to this behavior. Doing so will expose our codebase to anyone looking at the main Shoelace repository. While `@teamshares/shoelace` is technically public, it's best to keep things in-house.

## Installation

If you have a new project and you want to start playing with our fork of Shoelace, you can add it to any page very easily via [linking from the CDN](/getting-started/installation?id=cdn-installation-easiest). If you're planning to contribute, you'll need to install and run it locally. Shoelace is straightforward to install and run on your local machine. Follow the "Local installation" instructions under [Installation](/getting-started/installation?id=local-installation).

Once you have Shoelace installed, running it locally is as simple as

```bash
npm start
```

## Making changes

Documentation is built directly into Shoelace, so you only need to update the markdown pages under `docs` if you're adding or changing functionality. The site should refresh automatically as you make changes.

Unless you're one of the core DS engineers, most of what you'll be doing in Shoelace will probably involve styling. Styles in Shoelace components are found in `src/components/[component].styles.ts`. Make sure that any styling changes you want to make have been approved by the design system designers and will work across all our apps.

Once you're happy with your changes, you can push your changes up to a branch and make a PR for review. (If you don't know what this means or how to do it, you probably shouldn't be editing the code directly.)

!> **Do not push your changes directly into the `next` branch!**

## Connecting to a local Teamshares app

**Note: These instructions should only apply to a small number of core design system engineers.**

To see your how your changes to Shoelace show up in one of our apps, you'll need to link the running instance of Shoelace to both `shared-ui` and the app itself, then run the production build within Shoelace after each change.

#### Within the Shoelace directory in your console:

```bash
yarn link
npm run build
```

#### Within `shared-ui`:

```bash
yarn link @teamshares/shoelace
yarn install --force
```

#### Within your Teamshares app:

```bash
yarn link @teamshares/ui
yarn link @teamshares/shoelace
yarn install --force
```

You can string all the above commands together into a single abomination like so:

```bash
(cd ../shoelace && npm run build) && (cd ../teamshares-ui && yarn link @teamshares/shoelace && yarn install --force) && yarn link @teamshares/ui && yarn link @teamshares/shoelace && yarn install --force
```

Once all that is set up, you'll start your app like normal, i.e. `rails server` and `yarn build:all`. After each change in Shoelace, you'll need to run `npm run build` to generate the production build that `shared-ui` picks up. If you're using `yarn build --watch` and `yarn build:css --watch`, you'll need to restart those after each change as well.

### Developer experience improvements

The above setup is far from ideal. We're working on improving that, but in the meantime, you can add the following scripts to your `package.json`:

```
    "build:sl": "cd ../shoelace && npm run build",
    "sl-dev": "yarn build:sl && yarn build:all"
```

This at least gets you the ability to run `sl-dev` and see your latest changes. In the future, we may add an additional script to Shoelace to run the production build and restart the yarn watchers.

## Cutting a new release

Updates to the library follow our standard PR process (make a branch, make a PR, get a review from a code owner, merge).

1. Cut a new branch from the `next` branch in the Teamshares repo
1. Make sure everything is working locally, including tests, and run `npm run prettier`
1. Bump the version number in `package.json` using semantic versioning
1. Add an entry to the [changelog](/teamshares/changelog)
1. Make a PR (and make sure it's on the Teamshares fork, not the upstream!)
1. Make any requested changes to the PR
1. Once PR is approved, merge to `next`
1. Publish a release on NPM
   1. First you'll need [an NPM account](https://docs.npmjs.com/creating-a-new-npm-user-account)
   1. Then you'll need to be added as a [contributor to the NPM org](https://www.npmjs.com/settings/teamshares/members) by one of the admins (Daross or Adrian)
   1. Once you've done that, you can `npm login`. You should only need to do this once.
   1. To publish, you'll need an authenticator app such as Google Authenticator or Duo
   1. Publish a release via `npm publish --access public`. This will require a OTP via the authenticator app
      1. Before you publish for real, try it with the `--dry-run` flag to see what will be created.
1. On [Vercel](https://vercel.com/teamshares/shoelace), check that the docsite built correctly and then promote the latest preview build to production
   1. You will need a [Vercel account](https://vercel.com/new/teamshares) and may need to be added to the [Teamshares Vercel org](https://vercel.com/teams/teamshares/settings/members)
1. On [GitHub](https://github.com/teamshares/shoelace/releases), create a new tagged release corresponding to the new number in package.json
1. Verify that `shared-ui` has pulled in the latest changes (should happen automatically via `renovate`)
1. Pull in the new version of `shared-ui` into your app. May need to run `yarn add https://github.com/teamshares/shared-ui.git#main` to get the `yarn.lock` to update.
