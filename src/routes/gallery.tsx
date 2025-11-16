import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect, useMemo } from 'react'
import type { GalleryImage, GalleryFilters } from '../types/gallery'
import {
    MOCK_GALLERY_IMAGES,
    generateBentoTiles,
    filterGalleryImages,
    getUniqueSpecies,
    getUniqueContinents,
    formatCount,
} from '../utils/galleryUtil'


export const Route = createFileRoute('/gallery')({
    component: Gallery,
})

function Gallery() {
    const [allImages] = useState<GalleryImage[]>(MOCK_GALLERY_IMAGES)
    const [filters, setFilters] = useState<GalleryFilters>({
        species: [],
        continent: [],
        country: [],
        sortBy: 'newest',
        searchQuery: '',
    })
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
    const [showLightbox, setShowLightbox] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [showFilters, setShowFilters] = useState(false)

    const filterRef = useRef<HTMLDivElement>(null)

    // Compute filtered images and tiles
    const { filteredImages, bentoTiles } = useMemo(() => {
        const filtered = filterGalleryImages(allImages, {
            species: filters.species.length > 0 ? filters.species : undefined,
            continent: filters.continent.length > 0 ? filters.continent : undefined,
            searchQuery: filters.searchQuery,
            sortBy: filters.sortBy,
        })
        const tiles = generateBentoTiles(filtered, true)
        return { filteredImages: filtered, bentoTiles: tiles }
    }, [filters, allImages])

    // Close filter panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setShowFilters(false)
            }
        }

        if (showFilters) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showFilters])

    const handleSpeciesToggle = (species: string) => {
        setFilters(prev => ({
            ...prev,
            species: prev.species.includes(species)
                ? prev.species.filter(s => s !== species)
                : [...prev.species, species],
        }))
    }

    const handleContinentToggle = (continent: string) => {
        setFilters(prev => ({
            ...prev,
            continent: prev.continent.includes(continent)
                ? prev.continent.filter(c => c !== continent)
                : [...prev.continent, continent],
        }))
    }

    const handleSortChange = (sortBy: 'newest' | 'popular' | 'mostViewed') => {
        setFilters(prev => ({ ...prev, sortBy }))
        setShowFilters(false)
    }

    const handleSearchChange = (query: string) => {
        setFilters(prev => ({ ...prev, searchQuery: query }))
    }

    const openLightbox = (image: GalleryImage) => {
        const index = filteredImages.findIndex(img => img.id === image.id)
        setSelectedImage(image)
        setSelectedImageIndex(Math.max(0, index))
        setShowLightbox(true)
    }

    const closeLightbox = () => {
        setShowLightbox(false)
    }

    const navigateLightbox = (direction: 'next' | 'prev') => {
        let newIndex = selectedImageIndex
        if (direction === 'next') {
            newIndex = (selectedImageIndex + 1) % filteredImages.length
        } else {
            newIndex = (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
        }
        setSelectedImageIndex(newIndex)
        setSelectedImage(filteredImages[newIndex])
    }

    const clearFilters = () => {
        setFilters({
            species: [],
            continent: [],
            country: [],
            sortBy: 'newest',
            searchQuery: '',
        })
    }

    const hasActiveFilters =
        filters.species.length > 0 ||
        filters.continent.length > 0 ||
        filters.searchQuery.length > 0 ||
        filters.sortBy !== 'newest'

    const uniqueSpecies = getUniqueSpecies(allImages)
    const uniqueContinents = getUniqueContinents(allImages)

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div>
                            <a href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-2 sm:mb-3 transition-colors text-sm sm:text-base">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back Home
                            </a>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                                Wildlife Gallery
                            </h1>
                            <p className="text-slate-600 mt-1 text-sm sm:text-base">
                                Browse and discover wildlife photographs from around the world
                            </p>
                        </div>
                        <a
                            href="/upload"
                            className="hidden sm:flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-emerald-700 transition-colors shrink-0 whitespace-nowrap"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Contribute
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search species, location, tags..."
                            value={filters.searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-28 space-y-6">
                            {/* Sort Options */}
                            <div className="bg-white rounded-xl border border-slate-200 p-4">
                                <h3 className="font-semibold text-slate-900 mb-3 text-sm">Sort By</h3>
                                <div className="space-y-2">
                                    {(['newest', 'popular', 'mostViewed'] as const).map((sort) => (
                                        <label key={sort} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="sort"
                                                checked={filters.sortBy === sort}
                                                onChange={() => handleSortChange(sort)}
                                                className="w-4 h-4 text-emerald-600 cursor-pointer"
                                            />
                                            <span className="text-sm text-slate-700 capitalize">
                                                {sort === 'mostViewed' ? 'Most Viewed' : sort.charAt(0).toUpperCase() + sort.slice(1)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Species Filter */}
                            <div className="bg-white rounded-xl border border-slate-200 p-4">
                                <h3 className="font-semibold text-slate-900 mb-3 text-sm">Species</h3>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {uniqueSpecies.map((species) => (
                                        <label key={species} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.species.includes(species)}
                                                onChange={() => handleSpeciesToggle(species)}
                                                className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                                            />
                                            <span className="text-sm text-slate-700">{species}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Continent Filter */}
                            <div className="bg-white rounded-xl border border-slate-200 p-4">
                                <h3 className="font-semibold text-slate-900 mb-3 text-sm">Continent</h3>
                                <div className="space-y-2">
                                    {uniqueContinents.map((continent) => (
                                        <label key={continent} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.continent.includes(continent)}
                                                onChange={() => handleContinentToggle(continent)}
                                                className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                                            />
                                            <span className="text-sm text-slate-700">{continent}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="w-full px-4 py-2 bg-slate-100 text-slate-900 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium text-sm"
                        >
                            <span>Filters & Sort</span>
                            <svg className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>

                        {/* Mobile Filter Panel */}
                        {showFilters && (
                            <div ref={filterRef} className="absolute left-4 right-4 top-64 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-30 max-h-96 overflow-y-auto">
                                <div className="space-y-4">
                                    {/* Sort */}
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2 text-sm">Sort By</h3>
                                        <div className="space-y-2">
                                            {(['newest', 'popular', 'mostViewed'] as const).map((sort) => (
                                                <label key={sort} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="sort-mobile"
                                                        checked={filters.sortBy === sort}
                                                        onChange={() => handleSortChange(sort)}
                                                        className="w-4 h-4 text-emerald-600 cursor-pointer"
                                                    />
                                                    <span className="text-sm text-slate-700 capitalize">
                                                        {sort === 'mostViewed' ? 'Most Viewed' : sort.charAt(0).toUpperCase() + sort.slice(1)}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Species */}
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2 text-sm">Species</h3>
                                        <div className="space-y-2">
                                            {uniqueSpecies.map((species) => (
                                                <label key={species} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.species.includes(species)}
                                                        onChange={() => handleSpeciesToggle(species)}
                                                        className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                                                    />
                                                    <span className="text-sm text-slate-700">{species}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Continent */}
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2 text-sm">Continent</h3>
                                        <div className="space-y-2">
                                            {uniqueContinents.map((continent) => (
                                                <label key={continent} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.continent.includes(continent)}
                                                        onChange={() => handleContinentToggle(continent)}
                                                        className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                                                    />
                                                    <span className="text-sm text-slate-700">{continent}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Clear Filters */}
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="w-full px-4 py-2 bg-slate-100 text-slate-900 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors"
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bento Grid */}
                    <div className="flex-1">
                        {filteredImages.length === 0 ? (
                            <div className="text-center py-16">
                                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No images found</h3>
                                <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 auto-rows-auto gap-3 sm:gap-4">
                                {bentoTiles.map((tile) => (
                                    <div
                                        key={tile.id}
                                        className={`group relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${tile.size === 'featured'
                                                ? 'col-span-2 sm:col-span-2 md:col-span-2 row-span-2'
                                                : tile.size === 'large'
                                                    ? 'col-span-2 sm:col-span-1 md:col-span-2 row-span-2'
                                                    : tile.size === 'medium'
                                                        ? 'col-span-2 sm:col-span-2 md:col-span-1 row-span-1'
                                                        : 'col-span-1 row-span-1'
                                            }`}
                                        onClick={() => tile.type === 'image' && openLightbox(tile.image)}
                                    >
                                        {tile.type === 'image' ? (
                                            <>
                                                {/* Image */}
                                                <div className="relative w-full h-full min-h-48 sm:min-h-56 md:min-h-64 bg-slate-100">
                                                    <img
                                                        src={tile.image.thumbnail || tile.image.url}
                                                        alt={`${tile.image.species} - ${tile.image.location}`}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        loading="lazy"
                                                    />

                                                    {/* Overlay */}
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                                                        <h3 className="font-bold text-white text-xs sm:text-sm mb-1">
                                                            {tile.image.species}
                                                        </h3>
                                                        <p className="text-white/90 text-xs mb-3">
                                                            📍 {tile.image.location}, {tile.image.country}
                                                        </p>
                                                        <div className="flex items-center justify-between text-xs text-white/80">
                                                            <div className="flex gap-3">
                                                                <span>👁️ {formatCount(tile.image.views)}</span>
                                                                <span>❤️ {formatCount(tile.image.likes)}</span>
                                                            </div>
                                                            <span className="px-2 py-1 bg-emerald-600 text-white rounded text-xs font-medium">
                                                                View
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Metadata Bar (visible on smaller tiles) */}
                                                {(tile.size === 'small' || tile.size === 'medium') && (
                                                    <div className="p-2 sm:p-3 bg-white">
                                                        <p className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
                                                            {tile.image.species}
                                                        </p>
                                                        <p className="text-slate-600 text-xs truncate">
                                                            {tile.image.country}
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            // CTA Tile
                                            <a
                                                href="/upload"
                                                className="w-full h-full min-h-48 sm:min-h-56 md:min-h-64 bg-linear-to-br from-emerald-50 to-emerald-100 border-2 border-dashed border-emerald-300 flex flex-col items-center justify-center p-4 hover:from-emerald-100 hover:to-emerald-200 transition-colors group"
                                            >
                                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <h3 className="font-bold text-emerald-900 text-sm sm:text-base text-center">
                                                    Share Your Photo
                                                </h3>
                                                <p className="text-emerald-700 text-xs sm:text-sm text-center mt-1">
                                                    Contribute to LifeAtlas
                                                </p>
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Load More */}
                        {filteredImages.length > 0 && (
                            <div className="text-center mt-12">
                                <button className="px-8 py-3 bg-slate-100 text-slate-900 font-medium rounded-lg hover:bg-slate-200 transition-colors">
                                    Load More Images
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {showLightbox && selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Lightbox Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    {selectedImage.species}
                                </h2>
                                <p className="text-sm sm:text-base text-slate-600 mt-1">
                                    {selectedImageIndex + 1} of {filteredImages.length}
                                </p>
                            </div>
                            <button
                                onClick={closeLightbox}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                aria-label="Close"
                            >
                                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Lightbox Content */}
                        <div className="p-4 sm:p-6 space-y-6">
                            {/* Main Image */}
                            <div className="bg-slate-100 rounded-lg overflow-hidden">
                                <img
                                    src={selectedImage.url}
                                    alt={`${selectedImage.species} - ${selectedImage.location}`}
                                    className="w-full h-auto max-h-96 object-cover"
                                />
                            </div>

                            {/* Image Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                                            Location
                                        </p>
                                        <p className="text-sm sm:text-base text-slate-900 font-medium">
                                            {selectedImage.location}
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            {selectedImage.country}, {selectedImage.continent}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                                            Description
                                        </p>
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {selectedImage.description}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                            Tags
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedImage.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                            Engagement
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-600">Views</span>
                                                <span className="text-sm font-semibold text-slate-900">
                                                    {formatCount(selectedImage.views)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-600">Likes</span>
                                                <span className="text-sm font-semibold text-slate-900">
                                                    {formatCount(selectedImage.likes)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                            Photographer
                                        </p>
                                        <p className="text-sm font-medium text-slate-900">
                                            {selectedImage.uploaderName}
                                        </p>
                                        <p className="text-xs text-slate-600 mt-1">
                                            Uploaded {new Date(selectedImage.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <button className="w-full px-4 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 transition-colors">
                                        ❤️ Like
                                    </button>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between gap-2 sm:gap-4 pt-4 border-t border-slate-200">
                                <button
                                    onClick={() => navigateLightbox('prev')}
                                    disabled={filteredImages.length <= 1}
                                    className="px-4 py-2 bg-slate-100 text-slate-900 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>

                                <div className="text-center flex-1">
                                    <p className="text-sm text-slate-600">
                                        {selectedImageIndex + 1} / {filteredImages.length}
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigateLightbox('next')}
                                    disabled={filteredImages.length <= 1}
                                    className="px-4 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                                >
                                    Next
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Contribute Button */}
            <a
                href="/upload"
                className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors hover:scale-110"
                aria-label="Contribute photo"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </a>
        </div>
    )
}
