import type { BentoTile, GalleryImage } from '../types/gallery'
import { formatCount } from '../utils/galleryUtil'

interface BentoGridProps {
    tiles: BentoTile[]
    onImageClick: (image: GalleryImage) => void
}

export function BentoGrid({ tiles, onImageClick }: BentoGridProps) {
    if (tiles.length === 0) {
        return null
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 auto-rows-auto gap-3 sm:gap-4">
            {tiles.map((tile) => (
                <div key={tile.id}
                    className={`group relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer 
                        ${tile.size === 'featured'
                            ? 'col-span-2 sm:col-span-2 md:col-span-2 row-span-2'
                            : tile.size === 'large'
                                ? 'col-span-2 sm:col-span-1 md:col-span-2 row-span-2'
                                : tile.size === 'medium'
                                    ? 'col-span-2 sm:col-span-2 md:col-span-1 row-span-1'
                                    : 'col-span-1 row-span-1'
                        }`}
                    onClick={() => tile.type === 'image' && onImageClick(tile.image)}
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
    )
}
