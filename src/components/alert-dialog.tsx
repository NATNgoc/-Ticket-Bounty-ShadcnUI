"use client";

import { ActionState, EMPTY_ACTION_STATE } from "@/common/utils";
import { Form } from "@/components/form";
import Spinner from "@/components/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cloneElement, useActionState, useState } from "react";

type useAlertDialogProps = {
  title?: string;
  content?: string;
  serverAction: (
    actionState: ActionState,
    formData: FormData
  ) => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: () => void }>;
  useOpenState?: boolean;
};
export function useConfirmDialog({
  title = "Are you sure?",
  content = "This action cannot be undone. So make sure you know what you are doing.",
  serverAction,
  trigger,
}: useAlertDialogProps) {
  const [isOpen, setOpen] = useState(false);

  const [actionState, action, isPending] = useActionState<
    ActionState,
    FormData
  >(serverAction, EMPTY_ACTION_STATE);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setOpen(!isOpen),
  });

  const dialog = (
    <AlertDialog
      open={isOpen}
      onOpenChange={setOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            asChild
          >
            <Form
              action={action}
              actionState={actionState}
            >
              <Button
                type="submit"
                variant={"ghost"}
                className="hover:bg-transparent"
                disabled={isPending}
              >
                {isPending && <Spinner />}
                <span>Submit</span>
              </Button>
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
}
