'use client'

import { useState } from 'react'
import { Link } from '@/types'
import { Copy, Trash2, BarChart2, Check } from 'lucide-react'
import NextLink from 'next/link'

interface LinkTableProps {
    links: Link[]
    onDelete: (code: string) => void
}

export function LinkTable({ links, onDelete }: LinkTableProps) {
    const [copied, setCopied] = useState<number | null>(null)

    const copyToClipboard = (text: string, id: number) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    const handleDelete = async (code: string) => {
        if (confirm('Are you sure you want to delete this link?')) {
            onDelete(code)
        }
    }

    if (links.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">No links created yet. Create one above!</p>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Short Link
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Original URL
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Clicks
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {links.map((link) => {
                            return (
                                <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <a
                                                href={`/${link.shortCode}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary-600 hover:text-primary-800 font-medium"
                                            >
                                                /{link.shortCode}
                                            </a>
                                            <button
                                                onClick={() => copyToClipboard(`${window.location.origin}/${link.shortCode}`, link.id)}
                                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                                title="Copy full URL"
                                            >
                                                {copied === link.id ? (
                                                    <Check className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-xs truncate text-sm text-gray-500" title={link.originalUrl}>
                                            {link.originalUrl}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {link.clicks}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(link.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <NextLink
                                            href={`/code/${link.shortCode}`}
                                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                        >
                                            <BarChart2 className="h-4 w-4" />
                                        </NextLink>
                                        <button
                                            onClick={() => handleDelete(link.shortCode)}
                                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
