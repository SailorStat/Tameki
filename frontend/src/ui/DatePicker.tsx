import { DatePicker as MuiDatePicker, DatePickerProps } from "@mui/x-date-pickers";

const DatePicker = <TDate extends Date | number>(props: DatePickerProps<TDate>) => {
  return (
    <MuiDatePicker
      dayOfWeekFormatter={(_, date) => new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(date)}
      showDaysOutsideCurrentMonth
      {...props}
    />
  );
};

export default DatePicker;
