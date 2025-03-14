import { ZodError } from "zod";

export type ActionType = "create" | "update" | "delete" | "read"

export type ActionState = {
    message: string,
    formData?: FormData,
    fieldErrors?: Record<string, string[] | undefined>, // Lưu ý phải có underfined
    timeStamp?: number,
    status?: "SUCCESS" | "ERROR",
    metaData?: Record<string, unknown>
}

export const setTimeToPreviousDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    return newDate;
};

export const EMPTY_ACTION_STATE: ActionState = {
    message: "",
    timeStamp: Date.now(),
    // status: "SUCCESS"
}

export const fromErrorToActionState = (error: unknown, formData?: FormData): ActionState => {
    if (error instanceof ZodError) {
        console.log("error", error.flatten().fieldErrors)
        return {
            timeStamp: Date.now(),
            status: "ERROR",
            message: "",
            formData: formData,
            fieldErrors: error.flatten().fieldErrors,
        }
    } else if (error instanceof Error) {
        return {
            timeStamp: Date.now(),
            status: "ERROR",
            message: error.message,
            formData: formData,
        }
    } else {
        return {
            timeStamp: Date.now(),
            status: "ERROR",
            message: "An error occurred",
        }
    }
}

export const fromSuccessToActionState = (message: string, metaData?: Record<string, unknown>): ActionState => {
    return {
        message: message,
        timeStamp: Date.now(),
        status: "SUCCESS",
        metaData: metaData
    }
}


