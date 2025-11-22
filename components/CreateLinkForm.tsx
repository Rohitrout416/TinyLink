'use client'

import { useState } from 'react'
import { Loader2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CreateLinkFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onLinkCreated: (link: any) => void
}

export function CreateLinkForm({ onLinkCreated }: CreateLinkFormProps) {
    const [url, setUrl] = useState('')
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, code }),
            })

            const data = await res.json()

            if (!res.ok) {
                // Handle Zod validation errors
                if (data.error && typeof data.error === 'object' && data.error.fieldErrors) {
                    const fieldErrors = data.error.fieldErrors
                    const errorMessages = []

                    if (fieldErrors.url) {
                        errorMessages.push(`URL: ${fieldErrors.url.join(', ')}`)
                    }
                    if (fieldErrors.code) {
                        errorMessages.push(`Code: ${fieldErrors.code.join(', ')}`)
                    }

                    throw new Error(errorMessages.join(' | ') || 'Validation failed')
                }

                throw new Error(data.error || 'Something went wrong')
            }

            onLinkCreated(data)
            setUrl('')
            setCode('')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                        Destination URL
                    </label>
                    <input
                        type="text"
                        id="url"
                        required
                        placeholder="https://example.com or www.example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                        Custom Code (Optional)
                    </label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            /
                        </span>
                        <input
                            type="text"
                            id="code"
                            placeholder="custom-code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className={cn(
                    "w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors",
                    loading && "opacity-75 cursor-not-allowed"
                )}
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Creating...
                    </>
                ) : (
                    <>
                        <Plus className="-ml-1 mr-2 h-4 w-4" />
                        Shorten URL
                    </>
                )}
            </button>
        </form>
    )
}
