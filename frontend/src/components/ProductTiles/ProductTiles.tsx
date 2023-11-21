import { Card, CardHeader, Stack, useTheme } from "@mui/material";

const ProductTiles = () => {
  const theme = useTheme();

  console.log(theme);

  return (
    <Stack
      direction="row"
      display="grid"
      gap={{
        lg: 3,
        md: 2,
        sm: 2,
        xl: 3,
        xs: 1,
      }}
      gridTemplateColumns={{
        lg: "repeat(4, 1fr)",
        md: "repeat(3, 1fr)",
        sm: "repeat(2, 1fr)",
        xl: "repeat(5, 1fr)",
        xs: "repeat(2, 1fr)",
      }}
      justifyContent="space-between"
    >
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <Card key={index} sx={{ flex: "1 1 auto" }}>
            <CardHeader title={index + 1} />
          </Card>
        ))}
    </Stack>
  );
};

export default ProductTiles;
