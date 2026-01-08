import type { RegisterRequestDto } from "../api/client";

export type RegisterFormModel = RegisterRequestDto & {
  confirmation: string;
};
