import {BridgeModule} from "@lpfreelance/electron-bridge/preload";
import {ipcRenderer} from "electron";
import {StoreType} from "../../../store/settings.store";

export const SettingsModule: BridgeModule = {
    name: 'settings',
    readonly: true,
    api: {
        getAll: async () => {
            return await ipcRenderer.invoke('eb.settings.getAll');
        },
        setStore: async (newStore: StoreType) => {
            return await ipcRenderer.invoke('eb.settings.setStore', newStore);
        },
        getKey: async (key: keyof StoreType) => {
            return await ipcRenderer.invoke('eb.settings.getKey', key);
        },
        setKey: async (key: keyof StoreType, value: any) => {
            return await ipcRenderer.invoke('eb.settings.setKey', key, value);
        }
    }
};
