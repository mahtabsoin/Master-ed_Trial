import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Protect teacher-only routes
  if (request.nextUrl.pathname.startsWith('/teacher') && token.role !== 'TEACHER') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Protect student-only routes
  if (request.nextUrl.pathname.startsWith('/student') && token.role !== 'STUDENT') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/teacher/:path*', '/student/:path*'],
}