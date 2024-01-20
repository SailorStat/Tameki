import Navigation from "@components/Navigation";
import { Stack } from "@mui/material";

interface LayoutWithMenuProps {
  children: React.ReactNode;
}

const LayoutWithMenu = ({ children }: LayoutWithMenuProps) => (
  <Stack display="grid" gridTemplateRows="max-content 1fr" minHeight="100vh">
    <Navigation />
    {children}
  </Stack>
);

export default LayoutWithMenu;
