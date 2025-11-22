import prisma from '@/lib/prisma'
import { Dashboard } from '@/components/Dashboard'
import { Header } from '@/components/Header'
import { Link } from '@prisma/client'

// Force dynamic rendering so we get fresh data on page load
export const dynamic = 'force-dynamic'

export default async function Home() {
    const links = await prisma.link.findMany({
        orderBy: { createdAt: 'desc' },
    })

    // Serialize dates to strings because Client Components can't handle Date objects directly from Server Components easily in some versions, 
    // or just to be safe. Prisma returns Date objects.
    const serializedLinks = links.map((link: Link) => ({
        ...link,
        lastClickedAt: link.lastClickedAt ? link.lastClickedAt.toISOString() : null,
        createdAt: link.createdAt.toISOString(),
    }))

    return (
        <div className="min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Dashboard initialLinks={serializedLinks} />
            </main>
        </div>
    )
}
