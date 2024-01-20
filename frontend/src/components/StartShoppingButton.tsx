import localization from "@localization";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface StartShoppingButtonProps {
  shopPath: string;
}

const StartShoppingButton = ({ shopPath }: StartShoppingButtonProps) => {
  const navigate = useNavigate();

  const handleStartShopping = () => navigate(shopPath);

  return (
    <Button variant="contained" onClick={handleStartShopping}>
      {localization.startShopping}
    </Button>
  );
};

export default StartShoppingButton;
