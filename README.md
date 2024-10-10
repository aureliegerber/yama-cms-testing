# Yama CMS - Yuga

This is a website developped with [Astro](https://astro.build/) and configured to interface with [Yama CMS](https://yama-cms.com/).

Yama CMS will write .md files to `./src/content`.
Once you've wired up your repository with Yama CMS, delete the ./content/pages/ and ./content/posts/ files and update the configuration to match your needs.

## 🎯 Installation and usage

You can either run this repository directly if you have the node.js tooling installed ; or you can use [Earthly](https://docs.yama-cms.com/docs/guide/build-deploy-earthly) (think Dockerfiles + Makefiles) to run the needed tools inside containers.

Running directly (to install, see [Node.js's Downloads](https://nodejs.org/en/download) or [Installing via package manager](https://nodejs.org/en/download/package-manager)):
```bash
npm install
npm run dev
```
Running via Earthly (to install, see [Earthly's Get Started](https://earthly.dev/get-earthly)):
```bash
earthly --push +update
earthly +dev
```
For more information on how to use Earthly, see [our YamaCMS specific documentation](https://docs.yama-cms.com/docs/guide/build-deploy-earthly/) or [the official Earthly documentation](https://docs.earthly.dev/basics).

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.yama-cms.com) or [the official Astro documentation](https://docs.astro.build).

## 📜 License

The code for this project is under the [GNU Affero General Public License](./LICENSE). 
The content itself (e.g., .md files in the /src/content directories, and relevant files in /src/data) is not under the free license.

