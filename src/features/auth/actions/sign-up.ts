"use server";

import {
  ActionState,
  fromErrorToActionState,
  fromSuccessToActionState,
} from "@/common/utils";
import Paths from "@/constants/paths";
import {
  AuthPrefix,
  SignUpPrefix,
  SignUpSchema,
} from "@/features/auth/constants/constants";
import { SignUpFormFields } from "@/features/auth/constants/form-field";

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

export async function signUp(
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> {
  console.log("formData", formData)
  try {

    // export const SignUpSchema = z.object({
    //     [SignUpFormFields.EMAIL]: z.string().min(3).max(100).email(),
    //     [SignUpFormFields.PASSWORD]: z.string().min(3).max(100),
    //     [SignUpFormFields.NAME]: z.string().min(3).max(100),
    //     [SignUpFormFields.CONFIRM_PASSWORD]: z.string().min(3).max(100),
    // }).refine((data) => data.password === data.confirmPassword, {
    //     message: "Passwords do not match",
    //     path: [SignUpFormFields.CONFIRM_PASSWORD], // lỗi sẽ gắn vào field confirmPassword
    // });

    const data = SignUpSchema.parse({
      [SignUpFormFields.EMAIL]: formData.get(SignUpFormFields.EMAIL) as string,
      [SignUpFormFields.PASSWORD]: formData.get(SignUpFormFields.PASSWORD) as string,
      [SignUpFormFields.NAME]: formData.get(SignUpFormFields.NAME) as string,
      [SignUpFormFields.CONFIRM_PASSWORD]: formData.get(
        SignUpFormFields.CONFIRM_PASSWORD
      ) as string,
    });

    const signUpPayload: SignUpPayload = {
      name: data[SignUpFormFields.NAME],
      email: data[SignUpFormFields.EMAIL],
      password: data[SignUpFormFields.PASSWORD],
    };

    const response = await fetch(
      `${process.env.BE_URL}/${AuthPrefix}/${SignUpPrefix}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpPayload),
      }
    );

    if (!response.ok) {
      const errorMessage = (await response.json()).message;
      throw new Error(errorMessage);
    }

    return fromSuccessToActionState("Sign up successfully", {
      redirect: Paths.LoginPath(),
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
}
