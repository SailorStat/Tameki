import { Container, Stack, Typography } from "@mui/material";

export interface LayoutMenuHeaderProps {
  children: React.ReactNode;
  subtitle?: number | string;
  title: string;
}

const LayoutMenuHeader = ({ title, subtitle, children }: LayoutMenuHeaderProps) => (
  <Container fixed>
    <Stack paddingTop={1} spacing={2}>
      <Stack alignItems="baseline" direction="row" spacing={1}>
        <Typography variant="h4">{title}</Typography>
        {subtitle ? (
          <Typography color="GrayText" fontWeight={500} variant="body1">
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
      {children}
    </Stack>
  </Container>
);

export default LayoutMenuHeader;
