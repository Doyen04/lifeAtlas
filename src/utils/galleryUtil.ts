import type { GalleryImage, BentoTile, BentoTileSize } from '../types/gallery'

/**
 * Mock gallery images for development/testing
 */
export const MOCK_GALLERY_IMAGES: GalleryImage[] = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400&h=400&fit=crop',
        species: 'African Lion',
        location: 'Serengeti National Park',
        country: 'Tanzania',
        continent: 'Africa',
        description: 'Majestic African lion resting in the golden savanna grass during sunset',
        tags: ['predator', 'savanna', 'wildlife'],
        uploaderName: 'John Wildlife',
        uploaderId: 'user-1',
        createdAt: '2025-11-10',
        updatedAt: '2025-11-10',
        views: 1240,
        likes: 89,
    },
    {
        id: '2',
        url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop',
        species: 'Bengal Tiger',
        location: 'Sundarbans Mangrove Forest',
        country: 'Bangladesh',
        continent: 'Asia',
        description: 'Rare Bengal tiger stalking through dense mangrove forests at dawn',
        tags: ['endangered', 'predator', 'forest'],
        uploaderName: 'Sarah Explorer',
        uploaderId: 'user-2',
        createdAt: '2025-11-08',
        updatedAt: '2025-11-08',
        views: 2341,
        likes: 156,
    },
    {
        id: '3',
        url: 'https://images.unsplash.com/photo-1564349f4c2d-401a-4f48-b8a3-aa5f8b2e61eb?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1564349f4c2d-401a-4f48-b8a3-aa5f8b2e61eb?w=300&h=300&fit=crop',
        species: 'Mountain Gorilla',
        location: 'Volcanoes National Park',
        country: 'Rwanda',
        continent: 'Africa',
        description: 'Powerful mountain gorilla in its natural rainforest habitat',
        tags: ['primate', 'endangered', 'rainforest'],
        uploaderName: 'Emma Photographer',
        uploaderId: 'user-3',
        createdAt: '2025-11-05',
        updatedAt: '2025-11-05',
        views: 3105,
        likes: 234,
    },
    {
        id: '4',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        species: 'African Elephant',
        location: 'Amboseli National Park',
        country: 'Kenya',
        continent: 'Africa',
        description: 'Majestic African elephant with Mount Kilimanjaro in the background',
        tags: ['herbivore', 'large-animal', 'savanna'],
        uploaderName: 'Mike Adventure',
        uploaderId: 'user-4',
        createdAt: '2025-11-02',
        updatedAt: '2025-11-02',
        views: 2876,
        likes: 198,
    },
    {
        id: '5',
        url: 'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=300&h=300&fit=crop',
        species: 'Red Panda',
        location: 'Eastern Himalayas',
        country: 'Nepal',
        continent: 'Asia',
        description: 'Adorable red panda perched on bamboo in misty mountain forest',
        tags: ['cute', 'endangered', 'forest'],
        uploaderName: 'Lisa Nature',
        uploaderId: 'user-5',
        createdAt: '2025-11-01',
        updatedAt: '2025-11-01',
        views: 4521,
        likes: 312,
    },
    {
        id: '6',
        url: 'https://images.unsplash.com/photo-1567527373883-09e169767bb1?w=600&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1567527373883-09e169767bb1?w=300&h=300&fit=crop',
        species: 'Great White Shark',
        location: 'Great White Shark Alley',
        country: 'South Africa',
        continent: 'Africa',
        description: 'Massive great white shark breaching from the ocean depths',
        tags: ['predator', 'marine', 'ocean'],
        uploaderName: 'David Ocean',
        uploaderId: 'user-6',
        createdAt: '2025-10-29',
        updatedAt: '2025-10-29',
        views: 5643,
        likes: 421,
    },
    {
        id: '7',
        url: 'https://images.unsplash.com/photo-1528761312658-3c1f58d97657?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1528761312658-3c1f58d97657?w=300&h=300&fit=crop',
        species: 'Polar Bear',
        location: 'Arctic Ice Pack',
        country: 'Canada',
        continent: 'North America',
        description: 'Powerful polar bear walking across frozen Arctic landscape',
        tags: ['predator', 'endangered', 'arctic'],
        uploaderName: 'Alex Polar',
        uploaderId: 'user-7',
        createdAt: '2025-10-25',
        updatedAt: '2025-10-25',
        views: 3234,
        likes: 276,
    },
    {
        id: '8',
        url: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop',
        species: 'Golden Eagle',
        location: 'Alpine Mountains',
        country: 'Switzerland',
        continent: 'Europe',
        description: 'Magnificent golden eagle soaring high above mountain peaks',
        tags: ['bird', 'predator', 'alpine'],
        uploaderName: 'Rachel Sky',
        uploaderId: 'user-8',
        createdAt: '2025-10-20',
        updatedAt: '2025-10-20',
        views: 2987,
        likes: 215,
    },
]

/**
 * Determines the Bento tile size based on index (creates varied layout pattern)
 * Creates a balanced, non-repetitive pattern
 */
export const getBentoTileSize = (index: number): BentoTileSize => {
    // Pattern: featured, small, small, medium, small, medium, small, large, small, medium...
    const pattern = [
        'featured',
        'small',
        'small',
        'medium',
        'small',
        'medium',
        'small',
        'large',
        'small',
        'medium',
    ]
    return (pattern[index % pattern.length] as BentoTileSize) || 'medium'
}

/**
 * Generates Bento tiles from gallery images
 * Adds a "Contribute" CTA tile at strategic positions
 */
export const generateBentoTiles = (images: GalleryImage[], includeCta = true): BentoTile[] => {
    const tiles: BentoTile[] = images.map((image, index) => ({
        id: image.id,
        size: getBentoTileSize(index),
        image,
        type: 'image',
    }))

    // Insert CTA tile after 6 images (middle position for visibility)
    if (includeCta && tiles.length > 0) {
        tiles.splice(6, 0, {
            id: 'cta-contribute',
            size: 'medium',
            image: {} as GalleryImage, // Placeholder
            type: 'cta',
        })
    }

    return tiles
}

/**
 * Filters gallery images based on criteria
 */
export const filterGalleryImages = (
    images: GalleryImage[],
    filters: {
        species?: string[]
        continent?: string[]
        searchQuery?: string
        sortBy?: 'newest' | 'popular' | 'mostViewed'
    }
): GalleryImage[] => {
    let filtered = [...images]

    // Filter by species
    if (filters.species && filters.species.length > 0) {
        filtered = filtered.filter(img => filters.species?.includes(img.species))
    }

    // Filter by continent
    if (filters.continent && filters.continent.length > 0) {
        filtered = filtered.filter(img => filters.continent?.includes(img.continent))
    }

    // Filter by search query
    if (filters.searchQuery && filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase()
        filtered = filtered.filter(
            img =>
                img.species.toLowerCase().includes(query) ||
                img.location.toLowerCase().includes(query) ||
                img.country.toLowerCase().includes(query) ||
                img.description.toLowerCase().includes(query) ||
                img.tags.some(tag => tag.toLowerCase().includes(query))
        )
    }

    // Sort results
    const sortBy = filters.sortBy || 'newest'
    switch (sortBy) {
        case 'popular':
            filtered.sort((a, b) => b.likes - a.likes)
            break
        case 'mostViewed':
            filtered.sort((a, b) => b.views - a.views)
            break
        case 'newest':
        default:
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            break
    }

    return filtered
}

/**
 * Extracts unique species from gallery images
 */
export const getUniqueSpecies = (images: GalleryImage[]): string[] => {
    return Array.from(new Set(images.map(img => img.species))).sort()
}

/**
 * Extracts unique continents from gallery images
 */
export const getUniqueContinents = (images: GalleryImage[]): string[] => {
    return Array.from(new Set(images.map(img => img.continent))).sort()
}

/**
 * Formats view/like counts for display
 */
export const formatCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
}
