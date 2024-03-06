import React from "react";
import { useSelector } from "@hooks";
import localization from "@localization";
import { Stack, TextField } from "@mui/material";
import {
  dispatchedRegistrationActions,
  registrationBirthdayAtSelector,
  registrationFirstnameSelector,
  registrationImagesSelector,
  registrationLastnameSelector,
} from "@slices/registration";
import DatePicker from "@ui/DatePicker";
import ImageUpload from "@ui/ImageUpload";

const AboutMeForm = () => {
  const firstname = useSelector(registrationFirstnameSelector);
  const lastname = useSelector(registrationLastnameSelector);
  const birthdayAt = useSelector(registrationBirthdayAtSelector);
  const images = useSelector(registrationImagesSelector);

  const handleChangeFirstname = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatchedRegistrationActions.setData({ firstname: event.target.value });
    },
    []
  );

  const handleChangeLastname = React.useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatchedRegistrationActions.setData({ lastname: event.target.value });
  }, []);

  const handleChangeBirthdayAt = React.useCallback((value: Date | null) => {
    value && dispatchedRegistrationActions.setData({ birthdayAt: new Date(value).valueOf() });
  }, []);

  const handleChangeImages = React.useCallback((files: File[]) => {
    dispatchedRegistrationActions.setData({ images: files });
  }, []);

  return (
    <Stack spacing={2}>
      <TextField label={localization.firstname} value={firstname} onChange={handleChangeFirstname} />
      <TextField label={localization.lastname} value={lastname} onChange={handleChangeLastname} />
      <DatePicker
        maxDate={new Date()}
        openTo="year"
        value={new Date(birthdayAt)}
        views={["year", "month", "day"]}
        onChange={handleChangeBirthdayAt}
      />
      <ImageUpload images={images} maxSize={4} multiple onChange={handleChangeImages} />
    </Stack>
  );
};

export default AboutMeForm;
