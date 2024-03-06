import React from "react";
import { useSelector } from "@hooks";
import localization from "@localization";
import { Tab, Tabs } from "@mui/material";
import { registrationCanSeeSecureStageSelector } from "@slices/registration";

interface RegistrationTabsProps {
  onChange: (event: React.SyntheticEvent<Element, Event>, value: number) => void;
  value: number;
}

const RegistrationTabs = (props: RegistrationTabsProps) => {
  const canSeeSecureStage = useSelector(registrationCanSeeSecureStageSelector);

  return (
    <Tabs {...props}>
      <Tab label={localization.aboutMe} />
      <Tab disabled={!canSeeSecureStage} label={localization.security} />
    </Tabs>
  );
};

export default RegistrationTabs;
