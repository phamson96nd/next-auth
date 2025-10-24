import { NextResponse, NextRequest } from 'next/server'
 
const privatePaths = ['/profile']
const authPaths = ['/login', '/register']

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const sessionToken = request.cookies.get('sessionToken')?.value

  //
  if(
    privatePaths.some((path) => pathName.startsWith(path)) && !sessionToken
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  //
  if(
    authPaths.some((path) => pathName.startsWith(path)) && sessionToken
  ) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: [...privatePaths, ...authPaths],
}