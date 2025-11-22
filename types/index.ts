export interface Link {
    id: number
    shortCode: string
    originalUrl: string
    clicks: number
    lastClickedAt: string | null
    createdAt: string
}
