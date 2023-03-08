
/**
 * Display native system dialogs for opening and saving files, alerting, etc.
 */
export interface TestApi {
    showOpenDialog(options: any): Promise<any>;
}
