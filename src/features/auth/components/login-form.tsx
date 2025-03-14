"use client";

import { isUserLoggedIn } from "@/action/cookie";
import { EMPTY_ACTION_STATE } from "@/common/utils";
import { FieldError } from "@/components/field-error";
import { Form } from "@/components/form";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { Login } from "@/features/auth/actions/login";
import { LoginFormFields } from "@/features/auth/constants/form-field";
import { useActionState, useEffect } from "react";

export function LoginForm() {
  const [actionState, action, isPending] = useActionState(
    Login,
    EMPTY_ACTION_STATE
  );

  const { updateLoginStatus } = useAuth();

  useEffect(() => {
    const setGlobalLoginState = async () => {
      if (await isUserLoggedIn()) {
        updateLoginStatus(true);
      }
    };
    setGlobalLoginState();
  }, [actionState, updateLoginStatus]);

  return (
    <Form
      actionState={actionState}
      action={action}
      className="flex flex-col gap-y-5"
    >
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-balance text-muted-foreground">
          Login to your account
        </p>
      </div>
      <Separator></Separator>
      <Label
        htmlFor={LoginFormFields.EMAIL}
        className="font-bold"
      >
        Email
      </Label>
      <Input
        disabled={isPending}
        id={LoginFormFields.EMAIL}
        className="h-10"
        defaultValue={
          (actionState?.formData?.get(LoginFormFields.EMAIL) as string) || ""
        }
        name={LoginFormFields.EMAIL}
        type="email"
        placeholder="email"
      ></Input>
      {actionState?.fieldErrors?.email && (
        <FieldError error={actionState.fieldErrors.email[0]} />
      )}
      <Label
        htmlFor={LoginFormFields.PASSWORD}
        className="font-bold"
      >
        Password
      </Label>
      <Input
        disabled={isPending}
        id={LoginFormFields.PASSWORD}
        defaultValue={actionState?.fieldErrors?.password || ""}
        name={LoginFormFields.PASSWORD}
        type="password"
        placeholder="Password"
        className="h-10"
      ></Input>
      {actionState?.fieldErrors?.password && (
        <FieldError error={actionState.fieldErrors.password[0]} />
      )}
      <Button
        type="submit"
        disabled={isPending}
        variant={"default"}
      >
        <div className="flex flex-row gap-x-2">
          {isPending && <Spinner />}
          Login
        </div>
      </Button>
    </Form>
  );
}
