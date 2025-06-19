import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  // Set the cookie using the response object
  response.cookies.set('user_email', user.email, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}