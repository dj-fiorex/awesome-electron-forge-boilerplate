import {BridgeModule} from "@lpfreelance/electron-bridge/preload";
import {ipcRenderer} from "electron";

export const SerialPortModule: BridgeModule = {
    name: 'serialPort',
    readonly: true,
    api: {
        refreshSerial: async () => {
            return await ipcRenderer.invoke('eb.serialPort.refreshSerial');
        }
    }
};
