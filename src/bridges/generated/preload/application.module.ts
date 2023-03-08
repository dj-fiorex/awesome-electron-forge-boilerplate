import {BridgeModule} from "@lpfreelance/electron-bridge/preload";
import {ipcRenderer} from "electron";

export const ApplicationModule: BridgeModule = {
    name: 'application',
    readonly: true,
    api: {
        start: async () => {
            return await ipcRenderer.invoke('eb.application.start');
        },
        stop: async () => {
            return await ipcRenderer.invoke('eb.application.stop');
        }
    }
};
