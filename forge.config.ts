import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

import { renameSync, rmSync } from "fs";
import { spawn } from "child_process";
import { join } from "path";

const packageAfterPruneHooks = async (
  _: any,
  buildPath: string,
  __: any,
  platform: string
): Promise<void> => {
  const commands = ["install", "--no-package-lock", "--no-save", "serialport"];

  return new Promise((resolve, reject) => {
    const oldPckgJson = join(buildPath, "package.json");
    const newPckgJson = join(buildPath, "_package.json");

    renameSync(oldPckgJson, newPckgJson);

    const npmInstall = spawn("npm", commands, {
      cwd: buildPath,
      stdio: "inherit",
      shell: true,
    });

    npmInstall.on("close", (code) => {
      if (code === 0) {
        renameSync(newPckgJson, oldPckgJson);

        /**
         * On windows code signing fails for ARM binaries etc.,
         * we remove them here
         */
        if (platform === "win32") {
          const problematicPaths = [
            "android-arm",
            "android-arm64",
            "darwin-x64+arm64",
            "linux-arm",
            "linux-arm64",
            "linux-x64",
          ];

          problematicPaths.forEach((binaryFolder) => {
            rmSync(
              join(
                buildPath,
                "node_modules",
                "@serialport",
                "bindings-cpp",
                "prebuilds",
                binaryFolder
              ),
              { recursive: true, force: true }
            );
          });
        }

        resolve();
      } else {
        reject(new Error("process finished with error code " + code));
      }
    });

    npmInstall.on("error", (error) => {
      reject(error);
    });
  });
};

const config: ForgeConfig = {
  hooks: {
    packageAfterPrune: packageAfterPruneHooks,
  },
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/renderer/index.html",
            js: "./src/renderer/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/renderer/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
