import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(req: NextRequest) {
    const jwt = await getToken({ req })

    if (jwt) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
    matcher: ["/cart", "/wishlist", "/payment", "/allorders"]
}