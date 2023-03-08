// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { PreloadService } from "@lpfreelance/electron-bridge/preload";
import { ApplicationModule } from "../bridges/generated/preload/application.module";
import { SettingsModule } from "../bridges/generated/preload/settings.module";
import { SerialPortModule } from "../bridges/generated/preload/serialport.module";


process.once('loaded', () => {
  const preloadService = new PreloadService();

  preloadService
    .add("dialog")
    // .add(TestModule)
    .add(SettingsModule)
    .add(SerialPortModule)
    .add(ApplicationModule)
    .expose();
})



