"use client";

import { EMPTY_ACTION_STATE } from "@/common/utils";
import { FieldError } from "@/components/field-error";
import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Paths from "@/constants/paths";
import { signUp } from "@/features/auth/actions/sign-up";
import { SignUpFormFields } from "@/features/auth/constants/form-field";
import Link from "next/link";

import { useActionState } from "react";

export function SignUpForm() {
  const [actionState, action, isPending] = useActionState(
    signUp,
    EMPTY_ACTION_STATE
  );

  return (
    <Form
      action={action}
      actionState={actionState}
      className="flex flex-col gap-y-3 justify-center"
    >
      <Label
        className=" text-base"
        htmlFor={SignUpFormFields.NAME}
      >
        User name
      </Label>
      <Input
        className="h-10"
        disabled={isPending}
        id={SignUpFormFields.NAME}
        name={SignUpFormFields.NAME}
        placeholder="Tên phải chứa từ 3 kí tự"
        defaultValue={
          actionState?.formData?.get(SignUpFormFields.NAME) as string
        }
        type="text"
      ></Input>
      {actionState.fieldErrors?.[SignUpFormFields.NAME] && (
        <FieldError
          error={actionState.fieldErrors?.[SignUpFormFields.NAME]?.[0] || ""}
        />
      )}
      <Label
        className=" text-base"
        htmlFor={SignUpFormFields.EMAIL}
      >
        Email
      </Label>
      <Input
        className="h-10"
        disabled={isPending}
        id={SignUpFormFields.EMAIL}
        name={SignUpFormFields.EMAIL}
        defaultValue={
          actionState?.formData?.get(SignUpFormFields.EMAIL) as string
        }
        placeholder="vd: abc@gmail.com (hoặc đuôi khác)"
        type="email"
      ></Input>
      {actionState.fieldErrors?.[SignUpFormFields.EMAIL] && (
        <FieldError
          error={actionState.fieldErrors?.[SignUpFormFields.EMAIL]?.[0] || ""}
        />
      )}
      <Label
        className=" text-base"
        htmlFor={SignUpFormFields.PASSWORD}
      >
        Password
      </Label>
      <Input
        className="h-10"
        disabled={isPending}
        id={SignUpFormFields.PASSWORD}
        name={SignUpFormFields.PASSWORD}
        placeholder="Chứa chữ cái thường, chữ hoa và số"
        type="password"
      ></Input>
      {actionState?.fieldErrors?.[SignUpFormFields.PASSWORD] && (
        <FieldError
          error={
            actionState.fieldErrors?.[SignUpFormFields.PASSWORD]?.[0] || ""
          }
        />
      )}
      <Label
        className=" text-base"
        htmlFor={SignUpFormFields.CONFIRM_PASSWORD}
      >
        Confirm password
      </Label>
      <Input
        className="h-10"
        disabled={isPending}
        id={SignUpFormFields.CONFIRM_PASSWORD}
        name={SignUpFormFields.CONFIRM_PASSWORD}
        placeholder="Confirm password"
        type="password"
      ></Input>
      {actionState?.fieldErrors?.[SignUpFormFields.CONFIRM_PASSWORD] && (
        <FieldError
          error={
            actionState.fieldErrors?.[SignUpFormFields.CONFIRM_PASSWORD]?.[0] ||
            ""
          }
        />
      )}
      <Button
        disabled={isPending}
        type="submit"
        className="mx-24"
      >
        Sign up
      </Button>
      <div className="flex flex-row justify-evenly items-center gap-x-2">
        <Separator className="max-w-16 sm:max-w-32"></Separator>
        <span className="text-muted-foreground text-xs sm:text-sm">
          Had an account?
        </span>
        <Separator className="max-w-16 sm:max-w-32"></Separator>
      </div>
      <Button
        disabled={isPending}
        variant={"outline"}
        asChild
        className="border-primary mx-24"
      >
        <Link href={Paths.LoginPath()}>Login</Link>
      </Button>
    </Form>
  );
}
