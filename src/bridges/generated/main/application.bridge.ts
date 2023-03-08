import {Bridge} from "@lpfreelance/electron-bridge/main";
import {ipcMain} from "electron";
import {LogFunctions} from "electron-log";
import {MainApplication} from "../../../main/main-app";

export class ApplicationBridge implements Bridge {
    constructor(private app: MainApplication, private log: LogFunctions) {
    }

    public register(): void {
        ipcMain.handle('eb.application.start', async () => {
            this.log.info("start");
            this.app.start();
            return true;
        });
        ipcMain.handle('eb.application.stop', async () => {
            this.log.info("stop");
            this.app.stop();
            return true;
        });
    }

    public release(): void {
        ipcMain.removeHandler('eb.application.start');
        ipcMain.removeHandler('eb.application.stop');
    }
}
