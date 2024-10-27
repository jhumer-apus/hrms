import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

//   const guestPath = ['/login', '/about']
//   const currentPath = request.nextUrl.pathname
//   const accessToken = process.env.NEXT_APP_STATUS=="development"? "abc" : request.cookies.get('access_token')?.value
 
//   // if (accessToken && !request.nextUrl.pathname.startsWith('/')) {
//   //   return Response.redirect(new URL('/', request.url))
//   // }


//   if (!accessToken) {

//     // If the current path is not in the allowed paths, redirect to the login page
//     if (!guestPath.includes(currentPath)) {

//       return Response.redirect(new URL('/login', request.url))

//     }

//   } else {

//     if (guestPath.includes(currentPath) || currentPath == "/home") {

//       return Response.redirect(new URL('/', request.url))

//     }

//   }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}