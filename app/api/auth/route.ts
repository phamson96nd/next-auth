import envConfig from '@/app/config';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  // const { access_token, refresh_token, expires_in } = data;
  const token = data.data.token

  cookies().set('sessionToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  })

  // TODO
  cookies().set('refreshToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  })


  return Response.json(data, { status: 200 })
}