
export interface ApplicationApi {
    start(): Promise<boolean>;
    stop(): Promise<boolean>;
}
