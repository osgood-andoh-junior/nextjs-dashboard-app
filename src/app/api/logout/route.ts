import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the cookie by setting it to empty and expiring it
  response.cookies.set('user_email', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}