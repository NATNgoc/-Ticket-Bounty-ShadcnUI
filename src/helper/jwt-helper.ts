import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    user_id: string;
    iat: number;
    exp: number;
}

export function parseJwtPayload(token: string): JwtPayload {
    const decoded = jwtDecode(token);
    return decoded as JwtPayload;
}

export function isTokenExpired(token: string, extraTime?: number): boolean {
    const decoded = parseJwtPayload(token);
    const time = extraTime ? decoded.exp + extraTime : decoded.exp;
    return time < Date.now() / 1000;
}
