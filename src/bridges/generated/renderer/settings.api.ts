import {StoreType} from "../../../store/settings.store";

/**
 * Display native system dialogs for opening and saving files, alerting, etc.
 */
export interface SettingsApi {
    getAll(): Promise<StoreType>;
    setStore(newStore: StoreType): Promise<boolean>;
    getKey(key: keyof StoreType): Promise<any>;
    setKey(key: keyof StoreType, value: any): Promise<boolean>;
}
