interface FilterSidebarProps {
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

export function FilterSidebar({
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
}: FilterSidebarProps) {
    return (
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

                {/* Species Filter */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-900 mb-3 text-sm">Species</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
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

                {/* Continent Filter */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-900 mb-3 text-sm">Continent</h3>
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
        </aside>
    )
}
