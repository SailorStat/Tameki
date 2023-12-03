import React from "react";
import localization from "@localization";
import { ContentPaste as ContentPasteIcon } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  Snackbar,
  styled,
  TextField,
} from "@mui/material";

const TextFieldStyled = styled(TextField)({
  [`& .${inputBaseClasses.input}`]: {
    cursor: "pointer",
  },
});

interface TextFieldCopyProps {
  value: string;
}

const TextFieldCopy = ({ value }: TextFieldCopyProps) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const textFieldRef = React.useRef<HTMLInputElement>(null);

  const handleCopyText = React.useCallback(() => {
    navigator.clipboard.writeText(value);
    setOpenSnackbar(true);
    setTimeout(() => setOpenSnackbar(false), 3000);
  }, [value]);

  return (
    <>
      <TextFieldStyled
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <ContentPasteIcon />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
        inputRef={textFieldRef}
        multiline
        rows={value.split(/\r\n|\r|\n/).length}
        style={{ cursor: "pointer" }}
        value={value}
        variant="outlined"
        onClick={handleCopyText}
      />
      <Snackbar anchorOrigin={{ horizontal: "right", vertical: "bottom" }} open={openSnackbar}>
        <Alert>
          <AlertTitle>{localization.copied}</AlertTitle>
        </Alert>
      </Snackbar>
    </>
  );
};

export default TextFieldCopy;
