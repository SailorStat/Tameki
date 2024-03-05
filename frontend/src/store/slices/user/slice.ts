import router, { Paths } from "@router";
import { registration } from "@src/api/auth/auth.request";
import { RootState } from "@src/store";
import { createSlice } from "@utils";

const initialState: {
  data: {
    // about: string | null;
    // blockedAt: Date | null;
    // blockedReason: string | null;
    // email: string | null;
    // firstname: string | null;
    // googleUserId: string | null;
    id: number | null;
    // images: [];
    // lastname: string | null;
    // localization: string | null;
    // nickname: string | null;
    // reviewVotes: [];
    // roles: RoleNames[];
    // telegramUserId: string | null;
    // vkUserId: string | null;
  };
  error: string | null;
  loading: boolean;
} = {
  data: {
    // about: null,
    // blockedAt: null,
    // blockedReason: null,
    // email: null,
    // firstname: null,
    // googleUserId: null,
    id: null,
    // images: [],
    // lastname: null,
    // localization: null,
    // nickname: null,
    // reviewVotes: [],
    // roles: [],
    // telegramUserId: null,
    // vkUserId: null,
  },
  error: null,
  loading: false,
};

const userSlice = createSlice({
  initialState,
  name: "user",
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
  }),
});

export default userSlice;
