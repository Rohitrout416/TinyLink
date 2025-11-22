import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { generateShortCode } from '@/lib/utils'

const createLinkSchema = z.object({
    url: z.string().url(),
    code: z.string().min(6).max(8).regex(/^[A-Za-z0-9]+$/).optional().or(z.literal('')),
})

export async function GET() {
    try {
        const links = await prisma.link.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json(links)
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Normalize URL: prepend https:// if protocol is missing
        if (body.url && !/^https?:\/\//i.test(body.url)) {
            body.url = 'https://' + body.url
        }

        const result = createLinkSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
        }

        const { url, code } = result.data

        let shortCode = code

        // Check if URL already exists
        const existingUrl = await prisma.link.findFirst({
            where: { originalUrl: url },
        })

        if (existingUrl) {
            return NextResponse.json({ error: 'Link for this URL already exists' }, { status: 409 })
        }

        if (shortCode) {
            const existing = await prisma.link.findUnique({
                where: { shortCode },
            })
            if (existing) {
                return NextResponse.json({ error: 'Code already exists' }, { status: 409 })
            }
        } else {
            let isUnique = false
            while (!isUnique) {
                shortCode = generateShortCode()
                const existing = await prisma.link.findUnique({
                    where: { shortCode },
                })
                if (!existing) isUnique = true
            }
        }

        // TS check: shortCode is definitely string here because of logic above
        if (!shortCode) throw new Error('Failed to generate code')

        const link = await prisma.link.create({
            data: {
                originalUrl: url,
                shortCode,
            },
        })

        return NextResponse.json(link, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
