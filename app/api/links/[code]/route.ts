import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params
    try {
        const link = await prisma.link.findUnique({
            where: { shortCode: code },
        })

        if (!link) {
            return NextResponse.json({ error: 'Link not found' }, { status: 404 })
        }

        return NextResponse.json(link)
    } catch (_error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params
    try {
        await prisma.link.delete({
            where: { shortCode: code },
        })

        return NextResponse.json({ message: 'Link deleted' })
    } catch (_error) {
        return NextResponse.json({ error: 'Link not found or already deleted' }, { status: 404 })
    }
}
