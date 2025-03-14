
"use server";

import { HeaderKeys } from '@/constants';
import { Cookie_Keys } from '@/constants/cookie-key';
import { isTokenExpired } from '@/helper';
import { RefreshTokenRespone } from '@/types';
import { cookies } from 'next/headers';

export async function setCookie(key: string, value: string) {
    const cookieStore = await cookies();
    cookieStore.set(key, value);
}

export async function getCookie(key: string) {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value;
}



export async function deleteCookie(key: string) {
    const cookieStore = await cookies();
    return cookieStore.has(key) ? cookieStore.delete(key) : false;
}


export async function setAuthCookies(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    // Thiết lập cookie cho accessToken
    cookieStore.set(Cookie_Keys.AccessTokenKey, accessToken, {
        httpOnly: true, // Không cho phép truy cập từ JavaScript phía client
        secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS khi đang ở môi trường production
        path: '/',
        sameSite: 'strict', // Ngăn chặn tấn công CSRF
        maxAge: 60 * 60, // Cookie hết hạn sau 1 giờ
    });

    // Thiết lập cookie cho refreshToken
    cookieStore.set(Cookie_Keys.RefreshTokenKey, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // Cookie hết hạn sau 7 ngày
    });
}

export async function refreshToken(refreshToken: string): Promise<RefreshTokenRespone | undefined> {
    const response = await fetch(`${process.env.BE_URL}/auth/refreshtoken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            [HeaderKeys.REFRESH_TOKEN]: refreshToken,
        }
    });

    if (!response.ok) {
        return undefined;
    }

    const result = await response.json() as RefreshTokenRespone;

    return result;


}

export async function isTimeToRefreshToken(): Promise<void> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(Cookie_Keys.AccessTokenKey)?.value as string | undefined;
    const storedRefreshToken = cookieStore.get(Cookie_Keys.RefreshTokenKey)?.value as string | undefined;
    if (storedRefreshToken && accessToken && isTokenExpired(accessToken, parseInt(process.env.TIME_CHECK_TOKEN_EXPIRED as string))) {
        const result = await refreshToken(storedRefreshToken);
        console.log('Refresh token', result);
        if (result) {
            console.log('Refresh token successfully');
            setAuthCookies(result.accessToken, result.refreshToken);
        } else {
            console.error('Refresh token failed');
        }
    }
}



export async function isUserLoggedIn(): Promise<boolean> {
    const accessToken = await getCookie(Cookie_Keys.AccessTokenKey) as string | undefined;
    if (!accessToken) {
        return false;
    }
    if (isTokenExpired(accessToken)) {
        return false;
    }
    return true;
}

