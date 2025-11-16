import { useState } from 'react'
import { Link } from '@tanstack/react-router'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Gallery', to: '/gallery' },
        { label: 'Upload Photo', to: '/upload' },
        { label: 'About', to: '/about' },
    ]

    return (
        <>
            {/* Main Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100/50 shadow-sm">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {/* Nature-inspired icon: Leaf */}
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <svg
                                className="w-full h-full text-emerald-600 group-hover:text-emerald-700 transition-colors"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2c1.1 0 2 .9 2 2 0 2.3-1.7 4.3-4 4.8V20c0 1.1-.9 2-2 2s-2-.9-2-2V8.8C3.7 8.3 2 6.3 2 4c0-1.1.9-2 2-2h8zm8 16c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />
                            </svg>
                        </div>
                        <span className="hidden sm:inline text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                            LifeAtlas
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="px-3 sm:px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Desktop Contribute Button */}
                        <Link
                            to="/upload"
                            className="hidden sm:inline-block px-4 sm:px-6 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 hover:shadow-md transition-all duration-300 whitespace-nowrap"
                        >
                            Contribute
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className={`w-6 h-6 text-slate-700 transition-transform ${isMenuOpen ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Navigation Panel */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-16 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Slide-in Panel */}
                    <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-emerald-100/50 shadow-lg animate-in slide-in-from-top-2 duration-300">
                        <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Mobile Contribute Button */}
                            <Link
                                to="/upload"
                                className="block w-full mt-4 px-4 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contribute Photo
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}
