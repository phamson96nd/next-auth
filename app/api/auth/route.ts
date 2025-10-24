import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const res = await request.json();
  const token = res.payload?.data?.token

  if (!token) {
    return Response.json({ message: "Erros!" }, {
      status: 400
    })
  }

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


  return Response.json(res.payload, { status: 200 })
}