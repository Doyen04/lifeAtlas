/**
 * Type definitions for the wildlife gallery page
 */

/**
 * Represents a wildlife image in the gallery
 */
export interface GalleryImage {
    id: string
    url: string
    species: string
    location: string
    country: string
    continent: string
    description: string
    tags: string[]
    uploaderName: string
    uploaderId: string
    createdAt: string
    updatedAt: string
    views: number
    likes: number
    thumbnail?: string
}

/**
 * Filter options for the gallery
 */
export interface GalleryFilters {
    species: string[]
    continent: string[]
    country: string[]
    sortBy: 'newest' | 'popular' | 'mostViewed'
    searchQuery: string
}

/**
 * Bento grid tile size variations
 */
export type BentoTileSize = 'small' | 'medium' | 'large' | 'featured'

/**
 * Configuration for a tile in the Bento grid
 */
export interface BentoTile {
    id: string
    size: BentoTileSize
    image: GalleryImage
    type: 'image' | 'cta' // CTA = call-to-action
}

/**
 * Gallery pagination data
 */
export interface GalleryPaginationData {
    images: GalleryImage[]
    total: number
    page: number
    pageSize: number
    hasMore: boolean
}
