import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@src/store";

const registrationFirstnameSelector = (state: RootState) => state.registration.data.firstname;
const registrationBirthdayAtSelector = (state: RootState) => state.registration.data.birthdayAt;
const registrationEmailSelector = (state: RootState) => state.registration.data.email;
const registrationLastnameSelector = (state: RootState) => state.registration.data.lastname;
const registrationImagesSelector = (state: RootState) => state.registration.data.images;
const registrationPasswordSelector = (state: RootState) => state.registration.data.password;
const registrationPasswordConfirmSelector = (state: RootState) => state.registration.data.passwordConfirm;

const registrationCanSeeSecureStageSelector = createSelector(
  [registrationFirstnameSelector, registrationBirthdayAtSelector, registrationLastnameSelector],
  (...fields) => fields.every((field) => field)
);

export {
  registrationFirstnameSelector,
  registrationBirthdayAtSelector,
  registrationEmailSelector,
  registrationLastnameSelector,
  registrationImagesSelector,
  registrationPasswordSelector,
  registrationPasswordConfirmSelector,
  registrationCanSeeSecureStageSelector,
};
