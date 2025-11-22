import prisma from '@/lib/prisma'
import { Header } from '@/components/Header'
import { notFound } from 'next/navigation'
import { ArrowLeft, MousePointer2, Calendar, Link as LinkIcon, Clock } from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function StatsPage({
    params,
}: {
    params: Promise<{ code: string }>
}) {
    const { code } = await params

    const link = await prisma.link.findUnique({
        where: { shortCode: code },
    })

    if (!link) {
        notFound()
    }

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${link.shortCode}`

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Header />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Link Statistics</h1>
                    <p className="mt-2 text-slate-600">
                        Detailed performance metrics for <span className="font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded">/{link.shortCode}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 ring-1 ring-slate-900/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-500">Total Clicks</h3>
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <MousePointer2 className="h-5 w-5 text-primary-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{link.clicks}</p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 ring-1 ring-slate-900/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-500">Created At</h3>
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <Calendar className="h-5 w-5 text-primary-600" />
                            </div>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">
                            {new Date(link.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-slate-500">
                            {new Date(link.createdAt).toLocaleTimeString()}
                        </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 ring-1 ring-slate-900/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-500">Last Clicked</h3>
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <Clock className="h-5 w-5 text-primary-600" />
                            </div>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">
                            {link.lastClickedAt ? new Date(link.lastClickedAt).toLocaleDateString() : 'Never'}
                        </p>
                        <p className="text-sm text-slate-500">
                            {link.lastClickedAt ? new Date(link.lastClickedAt).toLocaleTimeString() : '-'}
                        </p>
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 ring-1 ring-slate-900/5 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-900">Link Details</h3>
                    </div>
                    <div className="px-6 py-5 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-2">Original URL</label>
                            <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 break-all">
                                <LinkIcon className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
                                {link.originalUrl}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-2">Short URL</label>
                            <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-200 text-primary-600 font-medium">
                                <LinkIcon className="h-4 w-4 text-slate-400 mr-3 flex-shrink-0" />
                                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {shortUrl}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
