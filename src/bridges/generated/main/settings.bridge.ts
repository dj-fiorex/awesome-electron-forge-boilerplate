import {Bridge} from "@lpfreelance/electron-bridge/main";
import {ipcMain, IpcMainInvokeEvent} from "electron";
import {LogFunctions} from "electron-log";
import Store from "electron-store";
import {StoreType} from "../../../store/settings.store";

export class SettingsBridge implements Bridge {
    constructor(private store: Store<StoreType>, private log: LogFunctions) {
    }

    public register(): void {
        ipcMain.handle('eb.settings.getAll', async () => {
            this.log.info("getAll");
            return this.store.store;
        });
        ipcMain.handle('eb.settings.setStore', async (_: IpcMainInvokeEvent, newStore: StoreType) => {
            this.log.info("setStore", newStore);
            this.store.store = newStore;
            return true;
        });
        ipcMain.handle('eb.settings.getKey', async (_: IpcMainInvokeEvent, key: keyof StoreType) => {
            this.log.info("getKey", key);
            return this.store.get(key);
        });
        ipcMain.handle('eb.settings.setKey', async (_: IpcMainInvokeEvent, key: keyof StoreType, value: any) => {
            this.log.info("setKey", key, value);
            this.store.set(key, value);
            return true;
        });
    }

    public release(): void {
        ipcMain.removeHandler('eb.settings.getAll');
        ipcMain.removeHandler('eb.settings.setStore');
        ipcMain.removeHandler('eb.settings.getKey');
        ipcMain.removeHandler('eb.settings.setKey');
    }
}
