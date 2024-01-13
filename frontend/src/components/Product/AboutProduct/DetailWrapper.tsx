import React from "react";
import { Typography } from "@mui/material";
import { capitalize } from "lodash";

interface DetailWrapperProps {
  children: React.ReactNode;
  direction: "column" | "row";
  title: string;
}

const DetailWrapper = ({ children, direction, title }: DetailWrapperProps) => {
  return (
    <div style={{ display: "flex", flexDirection: direction, gap: 2 }}>
      <Typography fontWeight={500} paddingRight={1} variant="subtitle1">
        {capitalize(title)}
        {":"}
      </Typography>
      {children}
    </div>
  );
};

export default DetailWrapper;
