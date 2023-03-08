import {BridgeModule} from "@lpfreelance/electron-bridge/preload";
import {ipcRenderer} from "electron";

export const TestModule: BridgeModule = {
    name: 'test',
    readonly: true,
    api: {
        showOpenDialog: async (options: any) => {
            return await ipcRenderer.invoke('eb.test.showOpenDialog', options);
        }
    }
};
