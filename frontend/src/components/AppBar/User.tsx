import { useSelector } from "@hooks";
import localization from "@localization";
import { Button } from "@mui/material";
import { Paths } from "@router";
import { isUserLoggedInSelector } from "@slices/user";
import { useLocation, useNavigate } from "react-router-dom";

const User = () => {
  const isLoggedIn = useSelector(isUserLoggedInSelector);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    !isLoggedIn && (
      <>
        {location.pathname !== Paths.login && (
          <Button
            color="inherit"
            sx={{ marginRight: 1 }}
            variant="contained"
            onClick={async () => navigate(Paths.login)}
          >
            {localization.login}
          </Button>
        )}
        {location.pathname !== Paths.registration && (
          <Button color="inherit" variant="outlined" onClick={async () => navigate(Paths.registration)}>
            {localization.registration}
          </Button>
        )}
      </>
    )
  );
};

export default User;
