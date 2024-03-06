import React from "react";
import { useSelector } from "@hooks";
import localization from "@localization";
import { Button, buttonBaseClasses, TextField } from "@mui/material";
import { registrationCanSeeSecureStageSelector } from "@slices/registration";

import AboutMeForm from "./AboutMeForm";
import RegistrationTabs from "./RegistrationTabs";

const RegistrationForm = () => {
  const [tab, setTab] = React.useState(0);
  const canSeeSecureStage = useSelector(registrationCanSeeSecureStageSelector);

  const handleTabChange = React.useCallback((_: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setTab(newValue);
  }, []);

  const toNext = React.useCallback(() => {
    setTab((tab) => tab + 1);
  }, []);

  const toPrev = React.useCallback(() => {
    setTab((tab) => tab - 1);
  }, []);

  return (
    <>
      <RegistrationTabs value={tab} onChange={handleTabChange} />
      {!tab ? (
        <>
          <AboutMeForm />
          <Button
            color="primary"
            disabled={!canSeeSecureStage}
            sx={{ [`&.${buttonBaseClasses.root}`]: { marginLeft: "auto" } }}
            variant="contained"
            onClick={toNext}
          >
            {localization.next}
          </Button>
        </>
      ) : (
        <>
          <TextField label="Username" />
          <TextField label="Email" />
          <TextField label="Password" type="password" />
          <TextField label="Confirm Password" type="password" />
        </>
      )}
    </>
  );
};

export default RegistrationForm;
