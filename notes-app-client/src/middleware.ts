import axios from 'axios'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
    const aToken = request.cookies.get('a_token')

    if (aToken === undefined) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    } else if (aToken.value === "") {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    } else {
        return NextResponse.next()
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/notes'],
}