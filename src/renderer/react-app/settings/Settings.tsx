import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/joy/Button";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useAppSettings } from "../hooks/useAppSettings";
import Box from "@mui/joy/Box";
import { useEffect, useState } from "react";
import { StoreType } from "../../../store/settings.store";

interface FormInputProps {
  children?: React.ReactNode;
}

export const Settings: React.FC<FormInputProps> = (props) => {
  const [settings, setLocalState, updateKey, saveSettings] = useAppSettings();

  const [serialPorts, setSerialPorts] = useState<string[]>([]);

  const [refresh, setRefresh] = useState(false);

  const [serialPortSelectPlaceholder, setSerialPortSelectPlaceholder] =
    useState("Click refresh to find a receiver.");

  useEffect(() => {
    window.serialPort.refreshSerial().then((ports) => {
      console.log(ports);
      setSerialPorts(ports);

      if (ports.length > 0) {
        updateKey("serialPort", ports[0]);
      } else {
        setSerialPortSelectPlaceholder(
          "No ports found, connect the receiver and click refresh."
        );
      }
    });
  }, [refresh]);

  const updateSetting = (key: keyof StoreType, value: any) => {
    setLocalState((s) => ({ ...s, [key]: value }));
  };

  const save = () => {
    console.log("save");
    console.log(settings);
    saveSettings(settings);
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      //columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ flexGrow: 1, padding: 2 }}
    >
      <Grid xs={6} sm={6} md={6}>
        <FormControl>
          <FormLabel>OPC-UA Server host</FormLabel>
          <Input
            placeholder="127.0.0.1"
            value={settings?.opcuaHost ?? ""}
            onChange={(e) => {
              updateSetting("opcuaHost", e.target.value);
            }}
          />
          <FormHelperText>The IP address of the OPC-UA server.</FormHelperText>
        </FormControl>
      </Grid>
      <Grid xs={6} sm={6} md={6}>
        <FormControl>
          <FormLabel>OPC-UA Server port</FormLabel>
          <Input
            type="number"
            placeholder="45653"
            value={settings?.opcuaPort ?? ""}
            onChange={(e) => {
              updateSetting("opcuaPort", parseInt(e.target.value));
            }}
          />
          <FormHelperText>The port number of the OPC-UA server.</FormHelperText>
        </FormControl>
      </Grid>
      <Grid xs={6} sm={6} md={6}>
        <FormControl>
          <FormLabel
            id="select-field-demo-label"
            htmlFor="select-field-demo-button"
          >
            Serial Port
          </FormLabel>
          <Select
            sx={{
              "& .MuiSelect-button": {
                fontSize: "0.8rem",
              },
            }}
            indicator={false}
            value={settings?.serialPort ?? ""}
            onChange={(e: any) => {
              console.log(e.target.textContent);
              updateSetting("serialPort", e.target.textContent);
            }}
            placeholder={serialPortSelectPlaceholder}
            endDecorator={
              <Button
                variant="solid"
                onMouseDown={(event) => {
                  // don't open the popup when clicking on this button
                  event.stopPropagation();
                }}
                onClick={() => {
                  // click handler goes here
                  console.log("click");
                  setRefresh(!refresh);
                }}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </Button>
            }
          >
            {serialPorts.map((port) => (
              <Option key={port} value={port}>
                {port}
              </Option>
            ))}
          </Select>
          <FormHelperText id="select-field-demo-helper">
            Click the button to refresh the list of available serial ports.
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid xs={6} sm={6} md={6}>
        <FormControl>
          <FormLabel
            id="select-field-demo-label"
            htmlFor="select-field-demo-button"
          >
            Serial Speed
          </FormLabel>
          <Select
            placeholder="Port..."
            value={settings?.serialBaudRate ?? 115200}
            onChange={(e: any) => {
              console.log(e.target.textContent);
              updateSetting("serialBaudRate", parseInt(e.target.textContent));
            }}
          >
            <Option value={9600}>9600</Option>
            <Option value={115200}>115200</Option>
          </Select>
          <FormHelperText id="select-field-demo-helper">
            Normally 115200
          </FormHelperText>
        </FormControl>
      </Grid>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Button onClick={save}>Save settings</Button>
        <Button>Save & Start</Button>
      </Box>
    </Grid>
  );
};
