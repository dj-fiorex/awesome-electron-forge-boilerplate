import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

interface ModeToggleProps {
  children?: React.ReactNode;
}

export const ModeToggle: React.FC<ModeToggleProps> = (props) => {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </Button>
  );
};
