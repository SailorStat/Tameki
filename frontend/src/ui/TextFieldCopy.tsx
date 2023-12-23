import React from "react";
import localization from "@localization";
import { ContentPaste as ContentPasteIcon } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  Portal,
  Snackbar,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material";

const TextFieldStyled = styled(TextField)({
  [`& .${inputBaseClasses.input}`]: {
    cursor: "pointer",
  },
});

interface TextFieldCopyProps extends Omit<TextFieldProps, "InputProps" | "inputRef" | "onClick"> {
  value: string;
}

const TextFieldCopy = ({ value, ...props }: TextFieldCopyProps) => {
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
        style={{ cursor: "pointer", fontSize: "small" }}
        value={value}
        variant="outlined"
        onClick={handleCopyText}
        {...props}
      />
      <Portal>
        <Snackbar anchorOrigin={{ horizontal: "right", vertical: "bottom" }} open={openSnackbar}>
          <Alert sx={{ minWidth: 150 }}>
            <AlertTitle sx={{ margin: 0 }}>{localization.copied}</AlertTitle>
          </Alert>
        </Snackbar>
      </Portal>
    </>
  );
};

export default TextFieldCopy;
