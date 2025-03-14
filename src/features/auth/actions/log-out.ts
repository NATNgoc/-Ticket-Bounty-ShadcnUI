"use server"

import { deleteCookie } from "@/action/cookie"
import { Cookie_Keys } from "@/constants/cookie-key"


export async function logOut() {
    try {
        await deleteCookie(Cookie_Keys.AccessTokenKey)
        await deleteCookie(Cookie_Keys.RefreshTokenKey)
    } catch (error) {
        console.error(error)
    }
}