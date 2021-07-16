# Integrating with NextJS

This page explains how to integrate Shoelace with a NextJS app. This is a community-maintained document. For questions about this integration, please [ask the community](/resources/community).

## Requirements

This integration has been tested with the following:

- Node >= 12.10
- NextJS >= 10.0.5

## Instructions

To get started using Shoelace with NextJS, the following packages must be installed.

```bash
yarn add @shoelace-style/shoelace @shoelace-style/react-wrapper copy-webpack-plugin next-compose-plugins next-transpile-modules
```

### Importing the Default Theme

The next step is to import Shoelace's default theme (stylesheet) in your `_app.js` file:

```css
import '@shoelace-style/shoelace/dist/themes/base.css';
```

### Defining Custom Elements

After importing the theme, you'll need to import the JavaScript files for Shoelace. However, this is a bit tricky to do in NextJS thanks to the SSR environment not having any of the required browser APIs to define endpoints.

We'll want to create a component that uses [React's `useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) to add in the custom components before the first render:

```javascript
function CustomEls({ URL }) {
  // useRef to avoid re-renders
  const customEls = useRef(false);

  useLayoutEffect(() => {
    if (customEls.current) {
      return;
    }
    
    const { setBasePath } = require("@shoelace-style/shoelace/dist/utilities/base-path");

    setBasePath(`${URL}/static/static`);
    
    // This imports all components
    require("@shoelace-style/shoelace/dist/shoelace");

    // If you want to selectively import components, replace this line with your own definitions
    // require("@shoelace-style/shoelace/dist/components/button/button");

    customEls.current = true;
  }, [URL, customEls]);

  return null;
}
```

?> If we use `useEffect` instead of `useLayoutEffect`, the initial render will occur with the expected `sl-` props applied, but the subsequent render (caused by the `useEffect`) will remove those props as the custom components initialize. We _must_ use `useLayoutEffect` to have expected behavior

?> This will import all Shoelace components for convenience. To selectively import components, refer to the [Using webpack](/getting-started/installation?id=using-webpack) section of the docs.

You may be wondering where the `URL` property is coming from. We'll address that in the next few sections.

### Using Our New Component In Code

While we need to use `useLayoutEffect` for the initial render, NextJS will throw a warning at us for trying to use `useLayoutEffect` in SSR, which is disallowed. To fix this problem, we'll conditionally render the `CustomEls` component to only render in the browser

```javascript
function MyApp({ Component, pageProps, URL }) {
  return (
    <>
      {process.browser && <CustomEls URL={URL} />}
      <Component {...pageProps} />
    </>
  )
}
```

### Environmental Variable

However, to make `setBasePath()` work as-expected, we need to know where the file is hosted. To do this, we need to set [environmental variables](https://nextjs.org/docs/basic-features/environment-variables). Create a `.local.env` file and put the following inside:

```
BASE_URL="localhost:3000"
```

Then, modify your `MyApp` class in `_app.js` to pass this process environment into your render:

```javascript
MyApp.getInitialProps = async (context) => {
  const URL = process.env.BASE_URL;

  return {
    URL
  };
};
```

?> You'll need to set this `BASE_URL` variable inside the build process of whatever local build or CI/CD you have. This will need to be an absolute URL, as a relative URL will cause shoelace to throw a warning

### webpack Config

Next we need to add Shoelace's assets to the final build output. To do this, modify `next.config.js` to look like this.

```javascript
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@shoelace-style/shoelace']);

module.exports = withPlugins([withTM], {
  webpack: config => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets/icons'),
            to: path.resolve(__dirname, 'static/icons')
          }
        ]
      })
    );
    return config;
  }
});
```

?> This will copy the files from `node_modules` into your `static` folder on every development serve or build. You may want to avoid commiting these into your repo. To do so, simply add `static/assets` into your `.gitignore` folder

## Additional Resources

- There is a third-party [example repo](https://github.com/crutchcorn/nextjs-shoelace-example), courtesy of [crutchcorn](https://github.com/crutchcorn), available to help you get started.

  
