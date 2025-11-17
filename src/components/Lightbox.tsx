import type { GalleryImage } from '../types/gallery'
import { formatCount } from '../utils/galleryUtil'

interface LightboxProps {
    image: GalleryImage
    currentIndex: number
    totalImages: number
    onClose: () => void
    onNavigate: (direction: 'next' | 'prev') => void
}

export function Lightbox({ image, currentIndex, totalImages, onClose, onNavigate }: LightboxProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Lightbox Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                            {image.species}
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 mt-1">
                            {currentIndex + 1} of {totalImages}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
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
                    <div className="bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center" style={{ minHeight: '300px', maxHeight: '60vh' }}>
                        <img
                            src={image.url}
                            alt={`${image.species} - ${image.location}`}
                            className="w-full h-full object-contain"
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
                                    {image.location}
                                </p>
                                <p className="text-sm text-slate-600">
                                    {image.country}, {image.continent}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                                    Description
                                </p>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {image.description}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                    Tags
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {image.tags.map((tag) => (
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
                                            {formatCount(image.views)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Likes</span>
                                        <span className="text-sm font-semibold text-slate-900">
                                            {formatCount(image.likes)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4">
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                    Photographer
                                </p>
                                <p className="text-sm font-medium text-slate-900">
                                    {image.uploaderName}
                                </p>
                                <p className="text-xs text-slate-600 mt-1">
                                    Uploaded {new Date(image.createdAt).toLocaleDateString()}
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
                            onClick={() => onNavigate('prev')}
                            disabled={totalImages <= 1}
                            className="px-4 py-2 bg-slate-100 text-slate-900 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        <div className="text-center flex-1">
                            <p className="text-sm text-slate-600">
                                {currentIndex + 1} / {totalImages}
                            </p>
                        </div>

                        <button
                            onClick={() => onNavigate('next')}
                            disabled={totalImages <= 1}
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
    )
}
