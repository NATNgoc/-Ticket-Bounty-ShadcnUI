import { CallBackArgs, useActionFeedback } from "@/common/form/toast-reaction";
import { ActionState } from "@/common/utils";
import { redirect } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

type FormProps = {
  action: (formData: FormData) => void;
  children: React.ReactNode;
  actionState: ActionState;
};

export function Form({ action, children, actionState }: FormProps) {
  const option = useMemo(() => {
    return {
      onSuccess: ({ actionState }: CallBackArgs) => {
        toast.success(actionState.message);
        if (actionState.metaData?.redirect) {
          redirect(actionState.metaData.redirect as string);
        }
      },
      onError: ({ actionState }: CallBackArgs) => {
        toast.error(actionState.message || "Check wrong fields");
      },
    };
  }, []);

  useActionFeedback({
    actionState: actionState,
    optionalAction: option,
  });

  return <form action={action}>{children}</form>;
}
