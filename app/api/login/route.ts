import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  let user;
  if (email === 'admin@taskflow.com' && password === 'password123') {
    user = { id: '1', name: 'John Doe', email, role: 'Project Manager' };
  } else if (email === 'user@taskflow.com' && password === 'password123') {
    user = { id: '2', name: 'Jane Smith', email, role: 'Developer' };
  } else {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 404 });
  }

  const res = NextResponse.json({ user }, { status: 200 });
  res.cookies.set('auth-token', 'fake-jwt-token', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
    sameSite: 'strict',
  });

  return res;
}
