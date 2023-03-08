# Awesome Electron-Forge Boilerplate

I created this boilerplate to start an Electron application using most popular tools:

- [electron-forge](https://github.com/electron/forge) as base project
- [electron-store](https://github.com/sindresorhus/electron-store) to be able to persist settings
- [electron-log](https://github.com/megahertz/electron-log) to be able to show and persist logs
- [@lpfreelance/electron-bridge](https://github.com/poirierlouis/electron-bridge) to be able to follow best security practices for Electron with easy!
- [@timfish/webpack-asset-relocator-loader](https://github.com/poirierlouis/electron-bridge), fork of Vercel package to be able to include native_modules to the main process that works with Electron.
- [React](https://beta.reactjs.org/) as framework for the UI
- [MUI](https://mui.com/joy-ui/getting-started/overview/) for styling the UI

Moreover the `webpack.(main|renderer).config.ts` files have been modified to be able to support electron-bridge (see [this](https://github.com/poirierlouis/electron-bridge/issues/3))

## Use this boilerplate

To use this boilerplate for your next project use the Github UI to "Use as template" or just fork the repo.

## Development

- Install package: `yarn`
- Generate bridge files from schema: `yarn run generate-schema`
- Run dev mode: `yarn start`
- Package app: `yarn run package`
