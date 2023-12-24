import { inputBaseClasses, styled, TextField, TextFieldProps } from "@mui/material";

export const TextFieldCounter = styled((props: TextFieldProps) => (
  <TextField size="small" type="number" variant="standard" {...props} />
))({
  [`& .${inputBaseClasses.input}`]: {
    padding: "4px 8px",
    textAlign: "center",
  },
  [`& .${inputBaseClasses.input}::-webkit-outer-spin-button, & .${inputBaseClasses.input}::-webkit-inner-spin-button`]:
    {
      margin: 0,
      WebkitAppearance: "none",
    },
});
