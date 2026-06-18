import { NextResponse, NextRequest } from "next/server";

export function GET(request: NextRequest) {
    return NextResponse.json([
        { id: 1, name: 'Pellegrom'},
        {id: 2, name: 'Mirte'},
]);

}
export async function POST(request: NextRequest) {
    const body = await request.json();
    return NextResponse.json(body);

}