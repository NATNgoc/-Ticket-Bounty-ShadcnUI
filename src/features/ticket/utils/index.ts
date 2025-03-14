
import { getCookie } from "@/action/cookie";
import { Cookie_Keys } from "@/constants";
const getCredentials = async () => {
    const userId = await getCookie(Cookie_Keys.UserId) as string;
    const accessToken = await getCookie(Cookie_Keys.AccessTokenKey) as string;
    return { userId, accessToken };
}

export { getCredentials };
