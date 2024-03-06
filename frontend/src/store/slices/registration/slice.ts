import { PayloadAction } from "@reduxjs/toolkit";
import router, { Paths } from "@router";
import { registration } from "@src/api/auth/auth.request";
import { RootState } from "@src/store/store";
import { createSlice } from "@utils";

export interface RegistrationData {
  birthdayAt: number;
  email: string;
  firstname: string;
  images: File[];
  lastname: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

const initialState: {
  data: RegistrationData;
  error: string | null;
  loading: boolean;
} = {
  data: {
    birthdayAt: Date.now(),
    email: "",
    firstname: "",
    images: [],
    lastname: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  },
  error: null,
  loading: false,
};

const registrationSlice = createSlice({
  initialState,
  name: "registration",
  reducers: (create) => ({
    registration: create.asyncThunk(
      async (_, thunkApi) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const state = thunkApi.getState() as RootState;
        const user = await registration(state.registration.data);

        return user;
      },
      {
        fulfilled: (_, __) => {
          router.navigate(Paths.login);
        },
        pending: (state, _) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.error = action.error.message ?? null;
        },
        settled: (state, _) => {
          state.loading = false;
        },
      }
    ),
    setData: create.reducer((state, action: PayloadAction<Partial<RegistrationData>>) => {
      state.data = { ...state.data, ...action.payload };
    }),
  }),
});

export default registrationSlice;
