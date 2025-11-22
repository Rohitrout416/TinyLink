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
            return new NextResponse('Not Found', { status: 404 })
        }

        // Async update stats
        await prisma.link.update({
            where: { id: link.id },
            data: {
                clicks: { increment: 1 },
                lastClickedAt: new Date(),
            },
        })

        return NextResponse.redirect(link.originalUrl)
    } catch (error) {
        console.error(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
