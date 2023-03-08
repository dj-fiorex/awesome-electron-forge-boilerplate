import {Bridge} from "@lpfreelance/electron-bridge/main";
import {ipcMain, IpcMainInvokeEvent} from "electron";

export class TestBridge implements Bridge {
    public register(): void {
        ipcMain.handle('eb.test.showOpenDialog', async (_: IpcMainInvokeEvent) => {
            console.log("showOpenDialog");
            return true;
        });
    }

    public release(): void {
        ipcMain.removeHandler('eb.test.showOpenDialog');
    }
}
