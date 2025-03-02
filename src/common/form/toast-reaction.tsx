import { ActionState } from "@/common/utils";
import { useEffect } from "react";

export type CallBackArgs = {
  actionState: ActionState;
};

type optionalAction = {
  onSuccess?: ({ actionState }: CallBackArgs) => void;
  onError?: ({ actionState }: CallBackArgs) => void;
};

type actionFeedbackArgs = {
  actionState: ActionState;
  optionalAction?: optionalAction;
};

export function useActionFeedback({
  actionState,
  optionalAction,
}: actionFeedbackArgs) {
  useEffect(() => {
    if (actionState.status == "SUCCESS") {
      optionalAction?.onSuccess?.({ actionState });
    }

    if (actionState.status == "ERROR") {
      optionalAction?.onError?.({ actionState });
    }
  }, [actionState, optionalAction]);
}
