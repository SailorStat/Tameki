import { Close as CloseIcon } from "@mui/icons-material";
import { IconButton, Paper, styled } from "@mui/material";

export const ProductPaper = styled(Paper)(({ theme }) => ({
  boxSizing: "border-box",
  height: "calc(100% - 20px)",
  left: "50%",
  outline: "none",
  padding: 16,
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 20px)",

  [theme.breakpoints.up("md")]: {
    height: "80%",
    width: "80%",
  },
}));

export const CloseButton = styled((props: { onClick: () => void }) => (
  <div style={{ position: "relative" }}>
    <IconButton {...props}>
      <CloseIcon />
    </IconButton>
  </div>
))({ position: "absolute", right: -16, top: -16 });
