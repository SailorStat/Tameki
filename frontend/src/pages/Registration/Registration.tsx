import React from "react";
import { useSelector } from "@hooks";
import LayoutWithAppBar from "@layouts/LayoutWithAppBar";
import LayoutWithTitle from "@layouts/LayoutWithTitle";
import localization from "@localization";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import { Paths } from "@router";
import { isUserLoggedInSelector } from "@slices/user";
import DatePicker from "@ui/DatePicker";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const isLoggedIn = useSelector(isUserLoggedInSelector);
  const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (_: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setTab(newValue);
  };

  isLoggedIn && navigate(Paths.base);

  return (
    <LayoutWithAppBar>
      <LayoutWithTitle title={localization.registration}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Stage 1" />
          <Tab label="Stage 2" />
        </Tabs>
        {tab === 0 && (
          <>
            <TextField label="First Name" />
            <TextField label="Last Name" />

            <DatePicker />
            {/* Add profile photo upload component here */}
          </>
        )}
        {tab === 1 && (
          <>
            <TextField label="Username" />
            <TextField label="Email" />
            <TextField label="Password" type="password" />
            <TextField label="Confirm Password" type="password" />
          </>
        )}
        <Button color="primary" variant="contained">
          {"Submit"}
        </Button>
      </LayoutWithTitle>
    </LayoutWithAppBar>
  );
};

export default Registration;
