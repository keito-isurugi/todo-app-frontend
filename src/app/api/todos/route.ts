import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const res = NextResponse.json({ msg: "hello,world!" })
    return res;
}