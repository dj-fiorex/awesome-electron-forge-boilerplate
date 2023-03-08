import { createRoot } from "react-dom/client";
import { Settings } from "./settings/Settings";
import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Enhace window object with custom properties
import "../../bridges/generated/renderer/renderer";

import GlobalStyles from "@mui/joy/GlobalStyles";
import { ModeToggle } from "./dark-mode-toggle/DarkModeToggle";

export default function App() {
  return (
    <CssVarsProvider>
      {/* must be used under CssVarsProvider */}
      <CssBaseline />

      <GlobalStyles
        styles={{
          ".svg-inline--fa": {
            color: "var(--Icon-color)",
            margin: "var(--Icon-margin)",
            fontSize: "var(--Icon-fontSize, 20px)",
            height: "0.875em",
          },
        }}
      />

      {/* The rest of your application */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginRight={2}
          marginLeft={2}
        >
          <Typography level="h1">Awesome Electron-Forge Boilerplate</Typography>
          <ModeToggle />
        </Stack>

        <Settings></Settings>
      </Stack>
    </CssVarsProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
