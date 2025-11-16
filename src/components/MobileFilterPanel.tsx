interface MobileFilterPanelProps {
    isOpen: boolean
    sortBy: 'newest' | 'popular' | 'mostViewed'
    onSortChange: (sort: 'newest' | 'popular' | 'mostViewed') => void
    species: string[]
    selectedSpecies: string[]
    onSpeciesToggle: (species: string) => void
    continents: string[]
    selectedContinents: string[]
    onContinentToggle: (continent: string) => void
    hasActiveFilters: boolean
    onClearFilters: () => void
}

export function MobileFilterPanel({
    isOpen,
    sortBy,
    onSortChange,
    species,
    selectedSpecies,
    onSpeciesToggle,
    continents,
    selectedContinents,
    onContinentToggle,
    hasActiveFilters,
    onClearFilters,
}: MobileFilterPanelProps) {
    if (!isOpen) {
        return null
    }

    return (
        <div
            className="absolute left-4 right-4 top-64 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-30 max-h-96 overflow-y-auto lg:hidden"
        >
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
                                    checked={sortBy === sort}
                                    onChange={() => onSortChange(sort)}
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
                        {species.map((sp) => (
                            <label key={sp} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedSpecies.includes(sp)}
                                    onChange={() => onSpeciesToggle(sp)}
                                    className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                                />
                                <span className="text-sm text-slate-700">{sp}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Continent */}
                <div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-sm">Continent</h3>
                    <div className="space-y-2">
                        {continents.map((continent) => (
                            <label key={continent} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedContinents.includes(continent)}
                                    onChange={() => onContinentToggle(continent)}
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
                        onClick={onClearFilters}
                        className="w-full px-4 py-2 bg-slate-100 text-slate-900 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        Clear Filters
                    </button>
                )}
            </div>
        </div>
    )
}
