import api from "../api.instance";
import { RoleNames } from "../role/role.types";

export interface AuthLoginParams {
  email: string;
  password: string;
}

export const login = async (params: AuthLoginParams) => {
  return api.post("/auth/login", { json: params }).json<{ id: number }>();
};

export interface AuthRegistrationParams {
  about: string;
  email: string;
  firstname: string;
  images: File[];
  lastname: string;
  nickname: string;
  password: string;
  roleNames: RoleNames[];
}

export const registration = async (params: AuthRegistrationParams | object) => {
  return api.post("/auth/registration", { json: params });
};
