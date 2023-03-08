
/**
 * Display native system dialogs for opening and saving files, alerting, etc.
 */
export interface SerialPortApi {
    refreshSerial(): Promise<string[]>;
}
