import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/forum(.*)',
]);

export default function middleware(req) {
  // Check if the request is for the root path
  if (req.nextUrl.pathname === '/') {
    // Create URL for redirection
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    
    // Return redirect response
    return NextResponse.redirect(url);
  }

  // Continue with Clerk middleware for other routes
  return clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  })(req);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};