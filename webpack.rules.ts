// test: /\.(m?js|node)$/,

import type { ModuleOptions } from "webpack";

const _rendererRules: Required<ModuleOptions>["rules"] = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: "node-loader",
  },
];

const _mainRules: Required<ModuleOptions>["rules"] = [
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@timfish/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  ..._rendererRules,
];

export const mainRules = _mainRules;

export const rendererRules = _rendererRules;
