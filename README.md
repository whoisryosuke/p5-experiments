# Ryo's P5.JS Experiments

A collection of different experiments using P5.JS, ranging from simple examples to audio and gamepad powered visualizations.

## Getting Started

1. Clone this repo.
1. Install dependencies: `yarn`
1. Run the development server: `yarn dev`
1. See the site here 👀: http://localhost:3000/

> You can also [preview and fork on CodeSandbox](https://githubbox.com/whoisryosuke/p5-experiments)

## How to use

## Creating a new sketch

To create a new P5.JS "sketch" or experiment, you can use the following command:

`yarn sketch:new YourSketchName`

You should see the new component appear in the project under `src/experiments/`. A new page will be automatically created for it as well, using a `snake-case` version of the name you picked.

> The sketch name will be used for the React component name, so make sure it's CamelCased.

### Importing media (audio, video, etc)

1. Place media in `/public/` folder.
1. Use a relative URL to your media (`yoursite.com/video.mp4` if it's in `public/video.mp4`).

## Snippets

This project features VSCode snippets for quickly creating R3F components and patterns. You can find them and add more in `.vscode\r3f.code-snippets`.

- `r3fc` - Create R3F mesh
- `r3fg` - Create R3F group
- `tsr3fc` - Create R3F mesh (with Typescript)
- `tsr3fg` - Create R3F group (with Typescript)

### Lint and Code Formatting

If you use VSCode, Prettier should run each time you save a compatible file.

> If you don't like this, go to `.vscode\settings.json` and disable there (or you can do it via your own VSCode settings).

`yarn lint` runs ESLint and Prettier, automatically formats files and rewrites them. Make sure to stage your code before running just in case.

### Upgrading to latest

1. `yarn upgrade-interactive --latest`

> Please note that when you update a major version, you should check the dependency's documentation to see if there are any necessary changes to make to app or dependency API.

## Tips

### Syntax Highlighting for Shaders

When you browse the shaders (`.frag` and `.vert`) in VSCode, you should see a popup to install a plugin for highlighting.

There's a few, but we recommend [Shader languages support for VS Code](https://marketplace.visualstudio.com/items?itemName=slevesque.shader).

## Credits

- [r3f-next-starter](https://github.com/whoisryosuke/r3f-next-starter)
- [ToneJS](https://github.com/Tonejs/Tone.js)
- [webmidi](https://github.com/djipco/webmidi)
