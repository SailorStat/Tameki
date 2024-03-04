import { registration } from "@src/api/auth/auth.request";
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

const userCreateSlice = createSlice({
  initialState,
  name: "userCreate",
  reducers: (create) => ({
    registration: create.asyncThunk(async (_, thunkApi) => {
      const state = thunkApi.getState();

      try {
        const todo = await registration(state);

        return todo;
      } catch (error) {
        throw thunkApi.rejectWithValue({
          error: error.message,
        });
      }
    }),
  }),
});

export default userCreateSlice;
