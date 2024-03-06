import RegistrationForm from "@components/RegistrationForm";
import { useSelector } from "@hooks";
import LayoutWithAppBar from "@layouts/LayoutWithAppBar";
import LayoutWithTitle from "@layouts/LayoutWithTitle";
import localization from "@localization";
import { Paths } from "@router";
import { isUserLoggedInSelector } from "@slices/user";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const isLoggedIn = useSelector(isUserLoggedInSelector);
  const navigate = useNavigate();

  isLoggedIn && navigate(Paths.base);

  return (
    <LayoutWithAppBar>
      <LayoutWithTitle title={localization.registration}>
        <RegistrationForm />
      </LayoutWithTitle>
    </LayoutWithAppBar>
  );
};

export default Registration;
