import { ApplicationApi } from "./application.api";
import { TestApi } from "./schema.api";
import { SerialPortApi } from "./serialport.api";
import { SettingsApi } from "./settings.api";

declare global
{
    interface Window
    {
        application: ApplicationApi;
        test: TestApi;
        serialPort: SerialPortApi;
        settings: SettingsApi;
    }
}