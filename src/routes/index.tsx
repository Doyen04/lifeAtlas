import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { StatsSection, GlobalMap } from '../components'
import { MOCK_GALLERY_IMAGES } from '../utils/galleryUtil'

export const Route = createFileRoute('/')({
    component: Index,
})

const speciesCategories = [
    { name: 'Birds', count: '45,230', icon: 'BIRDS', color: 'from-blue-50 to-cyan-50' },
    { name: 'Mammals', count: '38,920', icon: 'MAMMALS', color: 'from-orange-50 to-amber-50' },
    { name: 'Reptiles', count: '22,140', icon: 'REPTILES', color: 'from-emerald-50 to-teal-50' },
    { name: 'Amphibians', count: '18,550', icon: 'AMPHIBIANS', color: 'from-teal-50 to-cyan-50' },
    { name: 'Insects', count: '61,890', icon: 'INSECTS', color: 'from-purple-50 to-indigo-50' },
    { name: 'Marine Life', count: '29,670', icon: 'MARINE', color: 'from-cyan-50 to-blue-50' },
]

const contributionSteps = [
    {
        title: 'Upload',
        description: 'Share your wildlife photographs with the global community',
    },
    {
        title: 'Classify',
        description: 'Help identify and tag species with AI-assisted labeling',
    },
    {
        title: 'Discover',
        description: 'Browse millions of images across every ecosystem',
    },
    {
        title: 'Share',
        description: 'Support conservation efforts and scientific research',
    },
]

function Index() {
    const navigate = useNavigate()
    return (
        <main className="w-full bg-white">
            {/* Hero Section */}
            <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
                {/* Background Image with fixed positioning for responsiveness */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{
                        backgroundImage: `url('https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=2000')`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />

                {/* Content */}
                <div className="relative z-10 max-w-4xl px-4 sm:px-6 md:px-8 text-white text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
                        Discover the Wildlife of Every Continent.
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
                        LifeAtlas is the world's open visual archive of animals - powered by people like you.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        <button onClick={() => navigate({ to: '/upload' })} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
                            Upload Wildlife Image
                        </button>
                        <button onClick={() => navigate({ to: '/gallery' })} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-black/50 backdrop-blur-sm text-white font-medium rounded-full border border-white/30 hover:bg-black/70 transition-colors duration-200 text-sm sm:text-base">
                            Explore Species
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Global Map Visualization Section */}
            <section className="py-24 px-6 sm:px-8 bg-linear-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Mapping Biodiversity Worldwide
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Documenting wildlife from every corner of the globe, one photograph at a time.
                        </p>
                    </div>

                    {/* Global Map Component */}
                    <GlobalMap />
                </div>
            </section>

            {/* Community Stats Section */}
            <StatsSection />

            {/* Image Showcase Grid - Pinterest Style */}
            <section className="py-24 px-6 sm:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Featured Wildlife
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Explore stunning photographs from our community of wildlife photographers.
                        </p>
                    </div>

                    {/* Masonry Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
                        {MOCK_GALLERY_IMAGES.slice(0, 8).map((image, idx) => (
                            <div
                                key={image.id}
                                className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer ${idx % 4 === 0 ? 'md:row-span-2' : ''
                                    }`}
                            >
                                {/* Image */}
                                <img
                                    src={image.url}
                                    alt={image.species}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-semibold text-lg">{image.species}</h3>
                                    <p className="text-gray-200 text-sm">{image.country}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View More Button */}
                    <div className="text-center mt-16">
                        <button className="px-8 py-3.5 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-200">
                            View Full Gallery
                        </button>
                    </div>
                </div>
            </section>

            {/* Species Database Section */}
            <section className="py-24 px-6 sm:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Explore by Species
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Browse wildlife across six major categories, from soaring birds to deep-sea creatures.
                        </p>
                    </div>

                    {/* Category Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {speciesCategories.map((category, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate({ to: '/gallery' })}
                                className={`group p-8 rounded-2xl bg-linear-to-br ${category.color} border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                            >
                                <div className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">{category.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                                <p className="text-lg font-semibold text-gray-600">{category.count} Images</p>
                                <div className="mt-4 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                    Browse collection →
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contribution Section */}
            <section className="py-24 px-6 sm:px-8 bg-linear-to-br from-emerald-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
                            Anyone Can Contribute to LifeAtlas
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Whether you're a professional photographer or nature enthusiast, your images help advance conservation and research.
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {contributionSteps.map((step, idx) => {
                            const stepColors = [
                                { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', number: 'bg-emerald-100 text-emerald-700', line: 'from-emerald-200 to-transparent' },
                                { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', number: 'bg-orange-100 text-orange-700', line: 'from-orange-200 to-transparent' },
                                { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', number: 'bg-cyan-100 text-cyan-700', line: 'from-cyan-200 to-transparent' },
                                { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', number: 'bg-blue-100 text-blue-700', line: 'from-blue-200 to-transparent' },
                            ]
                            const colors = stepColors[idx % stepColors.length]

                            return (
                                <div key={idx} className={`relative p-6 rounded-2xl ${colors.bg} border-2 ${colors.border} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                                    {/* Step number */}
                                    <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.number} rounded-full font-bold text-lg mb-4`}>
                                        {idx + 1}
                                    </div>

                                    {/* Content */}
                                    <h3 className={`text-xl font-bold mb-2 ${colors.text}`}>{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>

                                    {/* Connector line */}
                                    {idx < contributionSteps.length - 1 && (
                                        <div className={`hidden lg:block absolute top-12 left-24 w-12 h-0.5 bg-linear-to-r ${colors.line}`} />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                        <button onClick={() => navigate({ to: '/upload' })} className="px-8 py-3.5 bg-linear-to-r from-emerald-600 to-teal-500 text-white font-medium rounded-full hover:from-emerald-700 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                            Start Contributing Today
                        </button>
                    </div>
                </div>
            </section>

            {/* CSS for animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
            `}</style>
        </main>
    )
}
