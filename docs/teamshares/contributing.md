# Contributing

Want to contribute to the Teamshares design system? Shoelace is straightforward to install and run on your local machine.

## Installation

If you have a new project and you want to start playing with our fork of Shoelace, you can add it to any page very easily via [linking from the CDN](/getting-started/installation?id=cdn-installation-easiest). If you're planning to contribute, you'll need to install and run it locally. Follow the "Local installation" instructions under [Installation](/getting-started/installation?id=local-installation).

Once you have Shoelace installed, running it locally is as simple as

```bash
npm start
```

## Making changes

Documentation is built directly into Shoelace, so you only need to update the markdown pages under `docs` if you're adding or changing functionality. The site should refresh automatically as you make changes.

Unless you're one of the core DS engineers, most of what you'll be doing in Shoelace will probably involve styling. Styles in Shoelace components are found in `src/components/[component].styles.ts`. Make sure that any styling changes you want to make have been approved by the design system designers and will work across all our apps.

Once you're happy with your changes, you can push your changes up to a branch and make a PR for review. (If you don't know what this means or how to do it, you probably shouldn't be editing the code directly.) **Please _DO NOT_ push your changes directly into the `next` branch!**

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

1. Add an entry to the [changelog](/teamshares/changelog)
1. Make sure everything is working locally, including tests, and run `npm run prettier`
1. Commit to `next` and push
1. Publish a release via `npm publish --access public`. Will require a 2FA/OTP via an authenticator app
1. On [Vercel](https://vercel.com/teamshares/shoelace), check that the docsite built correctly and then promote the latest preview build to production
1. On [GitHub](https://github.com/teamshares/shoelace/releases), create a new tagged release
1. Verify that `shared-ui` has pulled in the latest changes (should happen automatically via `renovate`)
