export type StoreType = {
  opcuaHost: string;
  opcuaPort: number;
  serialPort: string;
  serialBaudRate: number;
};

export const schema: any = {
  opcuaHost: {
    type: "string",
    default: "localhost",
  },
  opcuaPort: {
    type: "number",
    default: 4840,
  },
  serialPort: {
    type: "string",
    default: "COM1",
  },
  serialBaudRate: {
    type: "number",
    default: 115200,
  },
};
