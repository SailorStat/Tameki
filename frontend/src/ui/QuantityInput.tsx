import React from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { withStopPropagation } from "@utils";

import { TextFieldCounter } from "./TextFieldCounter";

interface QuantityInputProps {
  maxValue?: number;
  minValue?: number;
  onChange: (count: number) => void;
  onDecrement: () => void;
  onIncrement: () => void;
  value: number;
}

const QuantityInput = ({ maxValue, minValue, value, onChange, onDecrement, onIncrement }: QuantityInputProps) => {
  const handleQuantityChange = React.useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(Math.round(Math.min(Math.max(+target.value, minValue ?? 0), maxValue ?? Number.MAX_SAFE_INTEGER)));
    },
    [maxValue, minValue, onChange]
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 48px", height: 30.75 }}>
      <Button
        disabled={!!minValue && value <= minValue}
        size="small"
        sx={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, minWidth: 30 }}
        variant="contained"
        onClick={withStopPropagation(onDecrement)}
      >
        <RemoveIcon fontSize="small" />
      </Button>
      <TextFieldCounter value={value} variant="filled" onChange={withStopPropagation(handleQuantityChange)} />
      <Button
        disabled={!!maxValue && value >= maxValue}
        size="small"
        sx={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0, minWidth: 30 }}
        variant="contained"
        onClick={withStopPropagation(onIncrement)}
      >
        <AddIcon fontSize="small" />
      </Button>
    </div>
  );
};

export default QuantityInput;
