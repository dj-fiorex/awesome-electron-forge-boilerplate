import type { Configuration } from "webpack";

import { mainRules } from "./webpack.rules";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main/index.ts",
  // Put your normal webpack config below here
  module: {
    rules: mainRules,
  },
  externals: {
    // Always load `native-hello-world` via require
    serialport: "commonjs2 serialport",
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
