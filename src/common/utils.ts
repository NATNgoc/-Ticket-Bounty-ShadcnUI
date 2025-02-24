import { ZodError } from "zod"

export type ActionState = {
    message: string,
    formData?: FormData,
    fieldErrors?: Record<string, string[] | undefined>, // Lưu ý phải có underfined
    timeStamp?: number,
    status: "SUCCESS" | "ERROR"
}


export const EMPTY_ACTION_STATE: ActionState = {
    message: "",
    timeStamp: Date.now(),
    status: "SUCCESS"
}

export const fromErrorToActionState = (error: unknown, formData?: FormData): ActionState => {
    if (error instanceof ZodError) {
        console.log(error.flatten().fieldErrors)
        return {
            timeStamp: Date.now(),
            status: "ERROR",
            message: "",
            formData: formData,
            fieldErrors: error.flatten().fieldErrors
        }
    } else if (error instanceof Error) {
        return {
            timeStamp: Date.now(),
            status: "ERROR",
            message: error.message,
        }
    } else {
        return {
            timeStamp: Date.now(),
            status: "ERROR",
            message: "An error occurred",
        }
    }
}

export const fromSuccessToActionState = (message: string): ActionState => {
    return {
        message: message,
        timeStamp: Date.now(),
        status: "SUCCESS"
    }
}


