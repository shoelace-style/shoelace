# Shoelace is now Web Awesome 🧡!

> [!IMPORTANT]  
> **Shoelace is in maintenance mode (LTS)**. It is no longer actively being developed but remains available for use under the MIT license. Critical fixes may be released as needed; there is no fixed end date.
> For active development and new features, check out Web Awesome at [https://webawesome.com](https://webawesome.com) and [https://github.com/shoelace-style/webawesome](https://github.com/shoelace-style/webawesome).

Web Awesome has an even larger library of free web [components](https://webawesome.com/docs/components/), plus [themes](https://webawesome.com/docs/themes/), [utilities](https://webawesome.com/docs/utilities/), [patterns](https://webawesome.com/docs/patterns/), and more.

---

# Shoelace

A forward-thinking library of web components.

- Works with all frameworks 🧩
- Works with CDNs 🚛
- Fully customizable with CSS 🎨
- Includes an official dark theme 🌛
- Built with accessibility in mind ♿️
- Open source 😸

---

- Documentation: [shoelace.style](https://shoelace.style)
- Shoelace Source (Maintenance Mode - LTS): [github.com/shoelace-style/shoelace](https://github.com/shoelace-style/shoelace)
- Web Awesome Source (Active Development): [github.com/shoelace-style/webawesome](https://github.com/shoelace-style/webawesome)

---

## Shoemakers 🥾

Shoemakers, or "Shoelace developers," can use this documentation to learn how to build Shoelace from source. You will need Node >= 14.17 to build and run the project locally.

**You don't need to do any of this to use Shoelace!** This page is for people who want to contribute to the project, tinker with the source, or create a custom build of Shoelace.

If that's not what you're trying to do, the [documentation website](https://shoelace.style) is where you want to be.

### What are you using to build Shoelace?

Components are built with [LitElement](https://lit-element.polymer-project.org/), a custom elements base class that provides an intuitive API and reactive data binding. The build is a custom script with bundling powered by [esbuild](https://esbuild.github.io/).

### Forking the Repo

Start by [forking the repo](https://github.com/shoelace-style/shoelace/fork) on GitHub, then clone it locally and install dependencies.

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/shoelace
cd shoelace
npm install
```

### Developing

Once you've cloned the repo, run the following command.

```bash
npm start
```

This will spin up the dev server. After the initial build, a browser will open automatically. There is currently no hot module reloading (HMR), as browsers don't provide a way to reregister custom elements, but most changes to the source will reload the browser automatically.

### Building

To generate a production build, run the following command.

```bash
npm run build
```

### Creating New Components

To scaffold a new component, run the following command, replacing `sl-tag-name` with the desired tag name.

```bash
npm run create sl-tag-name
```

This will generate a source file, a stylesheet, and a docs page for you. When you start the dev server, you'll find the new component in the "Components" section of the sidebar.

### Contributing

Shoelace is open source under the MIT license. Bug fixes and maintenance updates may still be considered; for new features and active development, see [Web Awesome](https://webawesome.com). If you want to contribute here, please review the [contribution guidelines](CONTRIBUTING.md) first.

## License

Shoelace is available under the terms of the MIT license.

Whether you're building Shoelace or building something _with_ Shoelace — have fun creating! 🥾
