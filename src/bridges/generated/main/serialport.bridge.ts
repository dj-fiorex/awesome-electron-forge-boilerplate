import {Bridge} from "@lpfreelance/electron-bridge/main";
import {ipcMain} from "electron";
import {LogFunctions} from "electron-log";
import {SerialPortModule} from "../../../main/serial";

export class SerialPortBridge implements Bridge {
    constructor(private log: LogFunctions) {
    }

    public register(): void {
        ipcMain.handle('eb.serialPort.refreshSerial', async () => {
            this.log.info("refreshSerial");
            return SerialPortModule.listPorts().then((ports) =>
                ports.map((port) => port.path)
            );
        });
    }

    public release(): void {
        ipcMain.removeHandler('eb.serialPort.refreshSerial');
    }
}
