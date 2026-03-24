<div align="center">

[![Shoelace is now Web Awesome — visit webawesome.com](.github/readme-banner.png)](https://webawesome.com)

</div>

> [!IMPORTANT]  
> **Shoelace is sunset.** There is no active development on this codebase. The library remains available under the MIT license for existing use, but **please do not open issues, pull requests, or feature requests here**—direct those to **[Web Awesome](https://webawesome.com)**, the successor project, at [github.com/shoelace-style/webawesome](https://github.com/shoelace-style/webawesome).

**What “Sunset” Means:** Shoelace has **no active development**. **Issues, pull requests, and feature requests** belong on **[Web Awesome](https://github.com/shoelace-style/webawesome)**, not this repository. The published package remains available under the MIT license for existing use. **Archiving** this repo on GitHub (optional but recommended) is how you mark it **read-only** on the platform—see _For Repository Maintainers_ below.

Web Awesome, like Shoelace before it, offers an even larger library of free [components](https://webawesome.com/docs/components/), plus [themes](https://webawesome.com/docs/themes/), [utilities](https://webawesome.com/docs/utilities/), [patterns](https://webawesome.com/docs/patterns/), and more.

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
- Shoelace source (sunset): [github.com/shoelace-style/shoelace](https://github.com/shoelace-style/shoelace)
- Web Awesome (active development): [website](https://webawesome.com) · [source](https://github.com/shoelace-style/webawesome)

---

## Shoemakers 🥾

The sections below are **for historical reference**—for example, running the docs or a build from source, auditing the codebase, or maintaining a **private fork**. **New components and ongoing development belong on [Web Awesome](https://webawesome.com), not here.** You will need Node >= 14.17 to build and run the project locally.

**You do not need any of this to use Shoelace as a dependency.** For installation and usage, see the [documentation website](https://shoelace.style).

### What are you using to build Shoelace?

Components are built with [LitElement](https://lit-element.polymer-project.org/), a custom elements base class that provides an intuitive API and reactive data binding. The build is a custom script with bundling powered by [esbuild](https://esbuild.github.io/).

### Forking the Repo

You can still [fork the repo](https://github.com/shoelace-style/shoelace/fork) on GitHub for your own experiments, then clone it locally and install dependencies.

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

### New Components

**Develop new components on [Web Awesome](https://webawesome.com),** not in this repository. If you maintain a private fork and still use the old tooling, the historical scaffold was `npm run create <tag-name>`—that workflow is unsupported.

### Contributing

Shoelace is open source under the MIT license, but **this repository is not accepting contributions.** For bug reports, features, and pull requests, use **[Web Awesome](https://webawesome.com)** ([repository](https://github.com/shoelace-style/webawesome)). See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Shoelace is available under the terms of the MIT license.

Whether you are using Shoelace in a project or exploring this source tree — have fun creating! 🥾
