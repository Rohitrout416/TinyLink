'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/types'
import { CreateLinkForm } from './CreateLinkForm'
import { LinkTable } from './LinkTable'
import { Search } from 'lucide-react'

interface DashboardProps {
    initialLinks: Link[]
}

export function Dashboard({ initialLinks }: DashboardProps) {
    const [links, setLinks] = useState<Link[]>(initialLinks)
    const [search, setSearch] = useState('')

    // Poll for updates every 5 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch('/api/links')
                if (res.ok) {
                    const data = await res.json()
                    setLinks(data)
                }
            } catch (error) {
                console.error('Failed to poll links:', error)
            }
        }, 300000)

        return () => clearInterval(interval)
    }, [])

    const handleLinkCreated = (newLink: Link) => {
        setLinks([newLink, ...links])
    }

    const handleDelete = async (code: string) => {
        try {
            const res = await fetch(`/api/links/${code}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                setLinks(links.filter((l) => l.shortCode !== code))
            } else {
                alert('Failed to delete link')
            }
        } catch (error) {
            console.error(error)
            alert('Error deleting link')
        }
    }

    const filteredLinks = links.filter((link) =>
        link.shortCode.toLowerCase().includes(search.toLowerCase()) ||
        link.originalUrl.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Link</h2>
                <CreateLinkForm onLinkCreated={handleLinkCreated} />
            </section>

            <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">Your Links</h2>
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search links..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>
                </div>
                <LinkTable links={filteredLinks} onDelete={handleDelete} />
            </section>
        </div>
    )
}
