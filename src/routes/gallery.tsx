import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect, useMemo } from 'react'
import type { GalleryImage, GalleryFilters } from '../types/gallery'
import {
    MOCK_GALLERY_IMAGES,
    generateBentoTiles,
    filterGalleryImages,
    getUniqueSpecies,
    getUniqueContinents,
} from '../utils/galleryUtil'
import {
    BentoGrid,
    Lightbox,
    GalleryHeader,
    FilterSidebar,
    MobileFilterPanel,
    EmptyState,
    MobileContributeButton,
} from '../components'

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
            console.log('Clicked outside', e.target, filterRef.current);
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
            <GalleryHeader searchQuery={filters.searchQuery} onSearchChange={handleSearchChange} />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Desktop Sidebar Filters */}
                    <FilterSidebar
                        sortBy={filters.sortBy}
                        onSortChange={handleSortChange}
                        species={uniqueSpecies}
                        selectedSpecies={filters.species}
                        onSpeciesToggle={handleSpeciesToggle}
                        continents={uniqueContinents}
                        selectedContinents={filters.continent}
                        onContinentToggle={handleContinentToggle}
                        hasActiveFilters={hasActiveFilters}
                        onClearFilters={clearFilters}
                    />

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden mb-4" ref={filterRef}>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium text-sm"
                            >
                                <span>Filters & Sort</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </button>

                            {/* Mobile Filter Panel */}
                            <MobileFilterPanel
                                isOpen={showFilters}
                                sortBy={filters.sortBy}
                                onSortChange={handleSortChange}
                                species={uniqueSpecies}
                                selectedSpecies={filters.species}
                                onSpeciesToggle={handleSpeciesToggle}
                                continents={uniqueContinents}
                                selectedContinents={filters.continent}
                                onContinentToggle={handleContinentToggle}
                                hasActiveFilters={hasActiveFilters}
                                onClearFilters={clearFilters}
                            />
                        </div>

                        {/* Gallery Grid or Empty State */}
                        {filteredImages.length === 0 ? (
                            <EmptyState onClearFilters={clearFilters} />
                        ) : (
                            <>
                                <BentoGrid tiles={bentoTiles} onImageClick={openLightbox} />

                                {/* Load More */}
                                <div className="text-center mt-12">
                                    <button className="px-8 py-3 bg-slate-100 text-slate-900 font-medium rounded-lg hover:bg-slate-200 transition-colors">
                                        Load More Images
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {showLightbox && selectedImage && (
                <Lightbox
                    image={selectedImage}
                    currentIndex={selectedImageIndex}
                    totalImages={filteredImages.length}
                    onClose={closeLightbox}
                    onNavigate={navigateLightbox}
                />
            )}

            {/* Mobile Contribute Button */}
            <MobileContributeButton />
        </div>
    )
}
