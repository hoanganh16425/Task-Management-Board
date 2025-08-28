import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const res = NextResponse.json({ success: true });
    res.cookies.delete({
        httpOnly: true,
        name: 'auth-token',
        path: '/',
        sameSite: 'strict',
    });
    return res;
}
