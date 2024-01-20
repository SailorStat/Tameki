import localization from "@localization";
import { Button } from "@mui/material";
import { PathVariable } from "@router";
import { useNavigate, useParams } from "react-router-dom";

const StartShoppingButton = () => {
  const navigate = useNavigate();
  const { shopId } = useParams<{ [PathVariable.ShopId]: string }>();

  const handleStartShopping = () => navigate(`/${shopId}`);

  return (
    <Button variant="contained" onClick={handleStartShopping}>
      {localization.startShopping}
    </Button>
  );
};

export default StartShoppingButton;
