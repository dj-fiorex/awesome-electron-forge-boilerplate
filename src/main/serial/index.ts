import { DelimiterParser, SerialPort } from "serialport";

interface ISerialPort {
  start(): boolean;
  stop(): boolean;
  destroy(): boolean;
  write(data: any, cb: (error: Error | null | undefined) => void): boolean;
}

export class SerialPortModule implements ISerialPort {
  private port: string;
  private baudRate: number;
  private delimiter: any;
  private started = false;
  private serialPort: SerialPort;
  private parser: DelimiterParser;
  private logger: any;

  public static listPorts() {
    // Do something
    return SerialPort.list();
  }

  constructor(port?: string, baudRate?: number, delimiter?: any, logger?: any) {
    // Do something
    if (port) {
      this.port = port;
    }
    if (baudRate) {
      this.baudRate = baudRate;
    }
    if (delimiter) {
      this.delimiter = delimiter;
    }
    if (logger) {
      this.logger = logger;
    } else {
      this.logger = console;
    }
  }

  public start(): boolean {
    // Do something
    if (this.started) {
      return false;
    }
    this.logger.info(
      `Starting serial port with port: ${this.port} and baud rate: ${this.baudRate}`
    );
    // Create a port
    this.serialPort = new SerialPort({
      path: this.port,
      baudRate: this.baudRate,
    });

    // Add event listeners

    // The open event is always emitted
    this.serialPort.on("open", this.onPortOpen.bind(this));

    // The close event is always emitted
    this.serialPort.on("close", this.onPortClosed.bind(this));

    // The error event is always emitted
    this.serialPort.on("error", this.onPortError.bind(this));

    // The data event is always emitted
    this.serialPort.on("data", this.onPortData.bind(this));

    // The drain event is always emitted
    this.serialPort.on("drain", this.onPortDrain.bind(this));

    this.parser = this.serialPort.pipe(
      new DelimiterParser({ delimiter: this.delimiter })
    );

    this.parser.on("data", this.onParserData.bind(this));

    this.parser.on("error", this.onParserError.bind(this));

    this.started = true;
    return true;
  }

  public stop(): boolean {
    // Do something
    if (!this.started) {
      return false;
    }

    this.logger.info(`Stopping serial port`);

    this.serialPort.flush();
    this.serialPort.close();
    this.started = false;
    return true;
  }

  public destroy(): boolean {
    // Do something
    if (!this.started) {
      return false;
    }

    this.logger.info(`Destroying serial port`);
    this.serialPort.flush();
    this.serialPort.destroy();
    this.started = false;
    return true;
  }

  public write(
    data: any,
    cb: (error: Error | null | undefined) => void
  ): boolean {
    // Do something
    if (!this.started) {
      return false;
    }
    this.serialPort.write(data, cb);
    return true;
  }

  private onPortOpen() {
    this.logger.info(`Port opened`);
    // Do something
    //logger?.emit("added", `${LOG_TAG} Port opened`);
    //openCb();
  }

  private onPortError(error: Error) {
    this.logger.error(`Error:`, error);
    // Do something
    //logger?.emit("added", `${LOG_TAG} Error: ${error}`);
    //errorCb(error);
  }

  private onPortClosed() {
    this.logger.info(`Port closed`);
    // Do something
    //logger?.emit("added", `${LOG_TAG} Port closed`);
    //closeCb();
  }

  private onPortData(data: any) {
    this.logger.info(`Data: `, data);
    // Do something
    //logger?.emit("added", `${LOG_TAG} Data: ${data}`);
    //dataCb(data);
  }

  private onPortDrain() {
    this.logger.info(`Drain`);
    // Do something
    //logger?.emit("added", `${LOG_TAG} Drain`);
    //drainCb();
  }

  private onParserData(data: any) {
    this.logger.info(`Parser data: `, data);
    // Do something
    //logger?.emit("added", `${LOG_TAG} Parser data: ${data}`);
    //parserDataCb(data);
  }

  private onParserError(error: Error) {
    this.logger.error(`Parser error: `, error);
    // Do something
    //logger?.emit("added", `${LOG_TAG} Parser error: ${error}`);
    //parserErrorCb(error);
  }
}
