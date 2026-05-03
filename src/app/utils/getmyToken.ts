import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export default async function getmyToken() {

    const myCookies = await cookies()
    
    // In production (HTTPS), NextAuth uses __Secure- prefix
    // In development it uses next-auth.session-token
    const myTokenFromCookies = 
        myCookies.get("__Secure-next-auth.session-token")?.value ||
        myCookies.get("next-auth.session-token")?.value

    if (myTokenFromCookies == null) {
        return null
    }

    const myTokenAfterDecoded = await decode({ 
        token: myTokenFromCookies, 
        secret: process.env.NEXTAUTH_SECRET! 
    })

    if (myTokenAfterDecoded == null) {
        return null
    }

    return myTokenAfterDecoded.realtoken
}
