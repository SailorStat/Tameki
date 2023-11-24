import localization from "@localization";
import { Button } from "@mui/material";
import { Paths } from "@router";
import { useNavigate } from "react-router-dom";

const StartShoppingButton = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => navigate(Paths.shop());

  return (
    <Button variant="contained" onClick={handleStartShopping}>
      {localization.startShopping}
    </Button>
  );
};

export default StartShoppingButton;
