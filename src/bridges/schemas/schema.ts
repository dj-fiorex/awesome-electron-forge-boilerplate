import { Schema } from "@lpfreelance/electron-bridge-cli";

/**
 * Display native system dialogs for opening and saving files, alerting, etc.
 */
@Schema(true)
export class Test {
  public async showOpenDialog(options: any): Promise<any> {
    console.log("showOpenDialog");
    return true;
  }
}
