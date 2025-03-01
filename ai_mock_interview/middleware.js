import { NextResponse } from "next/server";

export default function middleware(req) {
  // Allow all requests to pass through
  return NextResponse.next();
}

// Only match specific paths you want to handle
export const config = {
  matcher: []
};