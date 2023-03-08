import { Schema } from "@lpfreelance/electron-bridge-cli";
import { LogFunctions } from "electron-log";
import Store from "electron-store";
import { StoreType } from "../../store/settings.store";
/**
 * Display native system dialogs for opening and saving files, alerting, etc.
 */
@Schema(true)
export class Settings {
  constructor(private store: Store<StoreType>, private log: LogFunctions) {}

  public async getAll(): Promise<StoreType> {
    this.log.info("getAll");
    return this.store.store;
  }

  public async setStore(newStore: StoreType): Promise<boolean> {
    this.log.info("setStore", newStore);
    this.store.store = newStore;
    return true;
  }

  public async getKey(key: keyof StoreType): Promise<any> {
    this.log.info("getKey", key);
    return this.store.get(key);
  }

  public async setKey(key: keyof StoreType, value: any): Promise<boolean> {
    this.log.info("setKey", key, value);
    this.store.set(key, value);
    return true;
  }
}
