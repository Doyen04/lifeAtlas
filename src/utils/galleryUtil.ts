import type { GalleryImage, BentoTile, BentoTileSize } from '../types/gallery'

/**
 * Mock gallery images for development/testing
 */
export const MOCK_GALLERY_IMAGES: GalleryImage[] = [
    {
        "id": "1",
        "url": "https://images.unsplash.com/reserve/wrev1ljvQ6KlfyljCQG0_lion.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWZyaWNhbiUyMGxpb258ZW58MHx8MHx8fDA%3D",
        "thumbnail": "https://images.unsplash.com/reserve/wrev1ljvQ6KlfyljCQG0_lion.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWZyaWNhbiUyMGxpb258ZW58MHx8MHx8fDA%3D",
        "species": "African Lion",
        "location": "Serengeti National Park",
        "country": "Tanzania",
        "continent": "Africa",
        "description": "Majestic African lion resting in the golden savanna grass during sunset",
        "tags": ["predator", "savanna", "wildlife"],
        "uploaderName": "John Wildlife",
        "uploaderId": "user-1",
        "createdAt": "2025-11-10",
        "updatedAt": "2025-11-10",
        "views": 1240,
        "likes": 89
    },
    {
        "id": "2",
        "url": "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmVuZ2FsJTIwVGlnZXJ8ZW58MHx8MHx8fDA%3D",
        "thumbnail": "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmVuZ2FsJTIwVGlnZXJ8ZW58MHx8MHx8fDA%3D",
        "species": "Bengal Tiger",
        "location": "Sundarbans Mangrove Forest",
        "country": "Bangladesh",
        "continent": "Asia",
        "description": "Rare Bengal tiger stalking through dense mangrove forests at dawn",
        "tags": ["endangered", "predator", "forest"],
        "uploaderName": "Sarah Explorer",
        "uploaderId": "user-2",
        "createdAt": "2025-11-08",
        "updatedAt": "2025-11-08",
        "views": 2341,
        "likes": 156
    },
    {
        "id": "3",
        "url": "https://images.unsplash.com/photo-1605559911928-e03606ea0dc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TW91bnRhaW4lMjBHb3JpbGxhfGVufDB8fDB8fHww",
        "thumbnail": "https://images.unsplash.com/photo-1605559911928-e03606ea0dc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TW91bnRhaW4lMjBHb3JpbGxhfGVufDB8fDB8fHww",
        "species": "Mountain Gorilla",
        "location": "Volcanoes National Park",
        "country": "Rwanda",
        "continent": "Africa",
        "description": "Powerful mountain gorilla in its natural rainforest habitat",
        "tags": ["primate", "endangered", "rainforest"],
        "uploaderName": "Emma Photographer",
        "uploaderId": "user-3",
        "createdAt": "2025-11-05",
        "updatedAt": "2025-11-05",
        "views": 3105,
        "likes": 234
    },
    {
        "id": "4",
        "url": "https://images.unsplash.com/photo-1611262084470-0e8686d7be78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QWZyaWNhbiUyMEVsZXBoYW50fGVufDB8fDB8fHww",
        "thumbnail": "https://images.unsplash.com/photo-1611262084470-0e8686d7be78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QWZyaWNhbiUyMEVsZXBoYW50fGVufDB8fDB8fHww",
        "species": "African Elephant",
        "location": "Amboseli National Park",
        "country": "Kenya",
        "continent": "Africa",
        "description": "Majestic African elephant standing tall in the background",
        "tags": ["herbivore", "large-animal", "savanna"],
        "uploaderName": "Mike Adventure",
        "uploaderId": "user-4",
        "createdAt": "2025-11-02",
        "updatedAt": "2025-11-02",
        "views": 2876,
        "likes": 198
    },
    {
        "id": "5",
        "url": "https://images.unsplash.com/photo-1656899367728-cf0194bf3aeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFJlZCUyMFBhbmRhfGVufDB8fDB8fHww",
        "thumbnail": "https://images.unsplash.com/photo-1656899367728-cf0194bf3aeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFJlZCUyMFBhbmRhfGVufDB8fDB8fHww",
        "species": "Red Panda",
        "location": "Eastern Himalayas",
        "country": "Nepal",
        "continent": "Asia",
        "description": "Adorable red panda perched on bamboo in misty mountain forest",
        "tags": ["cute", "endangered", "forest"],
        "uploaderName": "Lisa Nature",
        "uploaderId": "user-5",
        "createdAt": "2025-11-01",
        "updatedAt": "2025-11-01",
        "views": 4521,
        "likes": 312
    },
    {
        "id": "6",
        "url": "https://images.unsplash.com/photo-1586115457457-b3753fe50cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R3JlYXQlMjBXaGl0ZSUyMFNoYXJrfGVufDB8fDB8fHww",
        "thumbnail": "https://images.unsplash.com/photo-1586115457457-b3753fe50cf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R3JlYXQlMjBXaGl0ZSUyMFNoYXJrfGVufDB8fDB8fHww",
        "species": "Great White Shark",
        "location": "Great White Shark Alley",
        "country": "South Africa",
        "continent": "Africa",
        "description": "Massive great white shark breaching from the ocean depths",
        "tags": ["predator", "marine", "ocean"],
        "uploaderName": "David Ocean",
        "uploaderId": "user-6",
        "createdAt": "2025-10-29",
        "updatedAt": "2025-10-29",
        "views": 5643,
        "likes": 421
    },
    {
        "id": "7",
        "url": "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UG9sYXIlMjBCZWFyfGVufDB8fDB8fHww",
        "thumbnail": "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UG9sYXIlMjBCZWFyfGVufDB8fDB8fHww",
        "species": "Polar Bear",
        "location": "Arctic Ice Pack",
        "country": "Canada",
        "continent": "North America",
        "description": "Powerful polar bear standing in the frozen Arctic landscape",
        "tags": ["predator", "endangered", "arctic"],
        "uploaderName": "Alex Polar",
        "uploaderId": "user-7",
        "createdAt": "2025-10-25",
        "updatedAt": "2025-10-25",
        "views": 3234,
        "likes": 276
    },
    {
        "id": "8",
        "url": "https://images.unsplash.com/photo-1570964251517-9e3442ffe368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R29sZGVuJTIwRWFnbGV8ZW58MHx8MHx8fDA%3D",
        "thumbnail": "https://images.unsplash.com/photo-1570964251517-9e3442ffe368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R29sZGVuJTIwRWFnbGV8ZW58MHx8MHx8fDA%3D",
        "species": "Golden Eagle",
        "location": "Alpine Mountains",
        "country": "Switzerland",
        "continent": "Europe",
        "description": "Magnificent golden eagle resting on mountain peaks",
        "tags": ["bird", "predator", "alpine"],
        "uploaderName": "Rachel Sky",
        "uploaderId": "user-8",
        "createdAt": "2025-10-20",
        "updatedAt": "2025-10-20",
        "views": 2987,
        "likes": 215
    },
    {
        "id": "9",
        "url": "https://images.unsplash.com/photo-1624958319297-d1aa3a41378e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hlZXRhaHxlbnwwfHwwfHx8MA%3D%3D",
        "thumbnail": "https://images.unsplash.com/photo-1624958319297-d1aa3a41378e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hlZXRhaHxlbnwwfHwwfHx8MA%3D%3D",
        "species": "Cheetah",
        "location": "Savanna",
        "country": "Tanzania",
        "continent": "Africa",
        "description": "A fast and alert cheetah standing tall in golden savanna grass.",
        "tags": ["predator", "fastest", "savanna"],
        "uploaderName": "Thomas Vitali",
        "uploaderId": "user-9",
        "createdAt": "2025-11-14",
        "updatedAt": "2025-11-14",
        "views": 2671,
        "likes": 189
    },
    {
        "id": "10",
        "url": "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8S29hbGF8ZW58MHx8MHx8fDA%3D",
        "thumbnail": "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8S29hbGF8ZW58MHx8MHx8fDA%3D",
        "species": "Koala",
        "location": "Queensland Forests",
        "country": "Australia",
        "continent": "Australia",
        "description": "Cute koala relaxing calmly on a eucalyptus tree.",
        "tags": ["cute", "forest", "marsupial"],
        "uploaderName": "David Clode",
        "uploaderId": "user-10",
        "createdAt": "2025-11-14",
        "updatedAt": "2025-11-14",
        "views": 3280,
        "likes": 240
    },
    {
        "id": "11",
        "url": "https://images.unsplash.com/photo-1698472505070-6d3b90afb530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qmx1ZSUyMFdoYWxlfGVufDB8fDB8fHww",
        "thumbnail": "https://images.unsplash.com/photo-1698472505070-6d3b90afb530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qmx1ZSUyMFdoYWxlfGVufDB8fDB8fHww",
        "species": "Blue Whale",
        "location": "Pacific Ocean",
        "country": "International Waters",
        "continent": "Oceania",
        "description": "A massive blue whale rising gracefully out of deep blue waters.",
        "tags": ["marine", "largest-animal", "ocean"],
        "uploaderName": "Christopher Michel",
        "uploaderId": "user-11",
        "createdAt": "2025-11-14",
        "updatedAt": "2025-11-14",
        "views": 5620,
        "likes": 445
    },
    {
        "id": "12",
        "url": "https://images.unsplash.com/photo-1595173425119-1c54835c1874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QnJvd24lMjBCZWFyfGVufDB8fDB8fHww",
        "thumbnail": "https://images.unsplash.com/photo-1595173425119-1c54835c1874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QnJvd24lMjBCZWFyfGVufDB8fDB8fHww",
        "species": "Brown Bear",
        "location": "Katmai National Park",
        "country": "USA",
        "continent": "North America",
        "description": "Large brown bear standing by a river during salmon season.",
        "tags": ["predator", "forest", "wildlife"],
        "uploaderName": "Dan Cook",
        "uploaderId": "user-12",
        "createdAt": "2025-11-14",
        "updatedAt": "2025-11-14",
        "views": 2990,
        "likes": 210
    },
    {
        "id": "13",
        "url": "https://images.unsplash.com/photo-1615982513414-d287e6b70ad6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8T3Jhbmd1dGFufGVufDB8fDB8fHww",
        "thumbnail": "https://images.unsplash.com/photo-1615982513414-d287e6b70ad6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8T3Jhbmd1dGFufGVufDB8fDB8fHww",
        "species": "Orangutan",
        "location": "Borneo Rainforest",
        "country": "Indonesia",
        "continent": "Asia",
        "description": "Young orangutan hanging playfully from vines in the rainforest canopy.",
        "tags": ["primate", "endangered", "rainforest"],
        "uploaderName": "Joshua J. Cotten",
        "uploaderId": "user-13",
        "createdAt": "2025-11-14",
        "updatedAt": "2025-11-14",
        "views": 4765,
        "likes": 367
    }
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
