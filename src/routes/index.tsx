import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
    component: Index,
})

// Sample wildlife images data
const wildlifeImages = [
    {
        id: 1,
        species: 'Bengal Tiger',
        country: 'India',
        imageUrl: 'https://images.pexels.com/photos/3625154/pexels-photo-3625154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    },
    {
        id: 2,
        species: 'African Elephant',
        country: 'Kenya',
        imageUrl: 'https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    },
    {
        id: 3,
        species: 'Mountain Gorilla',
        country: 'Uganda',
        imageUrl: 'https://images.pexels.com/photos/3551632/pexels-photo-3551632.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    },
    {
        id: 4,
        species: 'Polar Bear',
        country: 'Arctic',
        imageUrl: 'https://images.pexels.com/photos/3951656/pexels-photo-3951656.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    },
    {
        id: 5,
        species: 'Giant Panda',
        country: 'China',
        imageUrl: 'https://images.pexels.com/photos/3714896/pexels-photo-3714896.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    },
    {
        id: 6,
        species: 'Snow Leopard',
        country: 'Nepal',
        imageUrl: 'https://images.pexels.com/photos/2649904/pexels-photo-2649904.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    },
    {
        id: 7,
        species: 'Sea Turtle',
        country: 'Indonesia',
        imageUrl: 'https://images.pexels.com/photos/3889865/pexels-photo-3889865.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    },
    {
        id: 8,
        species: 'Scarlet Macaw',
        country: 'Brazil',
        imageUrl: 'https://images.pexels.com/photos/50581/pexels-photo-50581.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    },
]

const speciesCategories = [
    { name: 'Birds', count: '45,230', icon: 'BIRDS', color: 'from-blue-50 to-cyan-50' },
    { name: 'Mammals', count: '38,920', icon: 'MAMMALS', color: 'from-amber-50 to-orange-50' },
    { name: 'Reptiles', count: '22,140', icon: 'REPTILES', color: 'from-green-50 to-emerald-50' },
    { name: 'Amphibians', count: '18,550', icon: 'AMPHIBIANS', color: 'from-lime-50 to-green-50' },
    { name: 'Insects', count: '61,890', icon: 'INSECTS', color: 'from-pink-50 to-rose-50' },
    { name: 'Marine Life', count: '29,670', icon: 'MARINE', color: 'from-indigo-50 to-blue-50' },
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

// Counter component with animation
function AnimatedCounter({ target }: { target: number }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let current = 0
        const increment = target / 50
        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, 30)
        return () => clearInterval(timer)
    }, [target])

    return <span>{count.toLocaleString()}+</span>
}

function Index() {
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
                        LifeAtlas is the world's open visual archive of animals — powered by people like you.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
                            Upload Wildlife Image
                        </button>
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-black/50 backdrop-blur-sm text-white font-medium rounded-full border border-white/30 hover:bg-black/70 transition-colors duration-200 text-sm sm:text-base">
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

                    {/* Map Placeholder with Glowing Hotspots */}
                    <div className="relative w-full aspect-video bg-linear-to-b from-blue-100 to-blue-50 rounded-2xl overflow-hidden shadow-xl">
                        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                            {/* World Map Background */}
                            <rect width="1000" height="600" fill="#e0f2fe" />

                            {/* Animated Hotspots */}
                            {[
                                { x: 200, y: 150, label: 'Africa' },
                                { x: 600, y: 180, label: 'Asia' },
                                { x: 400, y: 350, label: 'South America' },
                                { x: 750, y: 100, label: 'Arctic' },
                            ].map((spot, i) => (
                                <g key={i}>
                                    {/* Glow effect */}
                                    <circle
                                        cx={spot.x}
                                        cy={spot.y}
                                        r="40"
                                        fill="rgba(34, 197, 94, 0.1)"
                                        style={{
                                            animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                                            animationDelay: `${i * 0.3}s`,
                                        }}
                                    />
                                    {/* Center dot */}
                                    <circle cx={spot.x} cy={spot.y} r="8" fill="#22c55e" />
                                </g>
                            ))}
                        </svg>

                        {/* Stats overlay */}
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                            <p className="text-sm font-semibold text-gray-900">Active Uploads</p>
                            <p className="text-2xl font-bold text-green-600">2,847</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Stats Section */}
            <section className="py-20 px-6 sm:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Stat 1 */}
                        <div className="text-center">
                            <div className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2">
                                <AnimatedCounter target={1800000} />
                            </div>
                            <p className="text-lg text-gray-600">Wildlife Images</p>
                        </div>

                        {/* Stat 2 */}
                        <div className="text-center">
                            <div className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2">
                                <AnimatedCounter target={220} />
                            </div>
                            <p className="text-lg text-gray-600">Countries Covered</p>
                        </div>

                        {/* Stat 3 */}
                        <div className="text-center">
                            <div className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2">
                                <AnimatedCounter target={30000} />
                            </div>
                            <p className="text-lg text-gray-600">Active Contributors</p>
                        </div>
                    </div>
                </div>
            </section>

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
                        {wildlifeImages.map((image, idx) => (
                            <div
                                key={image.id}
                                className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer ${idx % 4 === 0 ? 'md:row-span-2' : ''
                                    }`}
                            >
                                {/* Image */}
                                <img
                                    src={image.imageUrl}
                                    alt={image.species}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                                className={`group p-8 rounded-2xl bg-gradient-to-br ${category.color} border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer`}
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
            <section className="py-24 px-6 sm:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                            Anyone Can Contribute to LifeAtlas
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Whether you're a professional photographer or nature enthusiast, your images help advance conservation and research.
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {contributionSteps.map((step, idx) => (
                            <div key={idx} className="relative">
                                {/* Step number */}
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full border border-white/20 mb-4">
                                    <span className="text-xl font-bold">{idx + 1}</span>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-300">{step.description}</p>

                                {/* Connector line */}
                                {idx < contributionSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-6 left-20 w-12 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                        <button className="px-8 py-3.5 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-200">
                            Start Contributing Today
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-16 px-6 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <h3 className="text-white font-bold text-lg mb-4">LifeAtlas</h3>
                            <p className="text-sm text-gray-400">
                                The world's open visual archive of wildlife.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Explore</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Species Index</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
                            </ul>
                        </div>

                        {/* Community */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Community</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Contribute</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Resources</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Conservation Partners</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Research Programs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-700 pt-8">
                        <p className="text-sm text-gray-400 text-center">
                            © {new Date().getFullYear()} LifeAtlas. All rights reserved. Preserving biodiversity through collaborative photography.
                        </p>
                    </div>
                </div>
            </footer>

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
