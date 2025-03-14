"use server";

import { setAuthCookies, setCookie } from "@/action/cookie";
import {
  ActionState,
  fromErrorToActionState,
  fromSuccessToActionState,
} from "@/common/utils";
import { Cookie_Keys } from "@/constants/cookie-key";
import Paths from "@/constants/paths";
import {
  AuthPrefix,
  LoginPrefix,
  LoginSchema,
} from "@/features/auth/constants/constants";
import { LoginFormFields } from "@/features/auth/constants/form-field";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginRespone = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};

export async function Login(
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // await new Promise((resolve) => setTimeout(resolve, 1000000));
  try {
    const loginPayload: LoginPayload = LoginSchema.parse({
      email: formData.get(LoginFormFields.EMAIL) as string,
      password: formData.get(LoginFormFields.PASSWORD) as string,
    });

    const response = await fetch(
      `${process.env.BE_URL}/${AuthPrefix}/${LoginPrefix}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      }
    );

    if (!response.ok) {
      // const errorMessage = (await response.json()).message;
      throw new Error("Login failed ");
    }
    const { accessToken, refreshToken, userId } = await response.json() as LoginRespone;

    await Promise.all([setCookie(Cookie_Keys.UserId, userId), setAuthCookies(accessToken, refreshToken)]);

    return fromSuccessToActionState("Login successfully", {
      redirect: Paths.HomePath(),
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
}
