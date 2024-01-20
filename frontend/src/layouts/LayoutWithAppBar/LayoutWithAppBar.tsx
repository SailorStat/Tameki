import AppBar from "@components/AppBar";
import { Stack } from "@mui/material";

interface LayoutWithAppBarProps {
  children: React.ReactNode;
}

const LayoutWithAppBar = ({ children }: LayoutWithAppBarProps) => (
  <Stack display="grid" gridTemplateRows="max-content 1fr" minHeight="100vh">
    <AppBar />
    {children}
  </Stack>
);

export default LayoutWithAppBar;
