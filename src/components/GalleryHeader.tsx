interface GalleryHeaderProps {
    searchQuery: string
    onSearchChange: (query: string) => void
}

export function GalleryHeader({ searchQuery, onSearchChange }: GalleryHeaderProps) {
    return (
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
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                </div>
            </div>
        </div>
    )
}
