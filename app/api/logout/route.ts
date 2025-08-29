import { NextResponse } from 'next/server';

export async function POST() {
    const res = NextResponse.json({ success: true });
    res.cookies.delete({
        httpOnly: true,
        name: 'auth-token',
        path: '/',
        sameSite: 'strict',
    });
    return res;
}
