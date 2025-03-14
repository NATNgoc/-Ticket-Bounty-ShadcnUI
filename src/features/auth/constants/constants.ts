import { SignUpFormFields } from "@/features/auth/constants/form-field";
import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(100),
})

const passwordRegrex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

export const SignUpSchema = z.object({
    [SignUpFormFields.EMAIL]: z.string().min(3).max(100).email(),
    [SignUpFormFields.PASSWORD]: z.string().min(3).max(100).regex(passwordRegrex, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    [SignUpFormFields.NAME]: z.string().min(3).max(100),
    [SignUpFormFields.CONFIRM_PASSWORD]: z.string().min(3).max(100),
}).refine((data) => data[SignUpFormFields.PASSWORD] === data[SignUpFormFields.CONFIRM_PASSWORD], {
    message: "Passwords do not match",
    path: [SignUpFormFields.CONFIRM_PASSWORD], // lỗi sẽ gắn vào field confirmPassword
});

export const AuthPrefix = "auth";

export const LoginPrefix = "login";

export const SignUpPrefix = "sign-up";