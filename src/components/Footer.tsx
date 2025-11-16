import { Link } from '@tanstack/react-router'
import { useState } from 'react'

export function Footer() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.trim()) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-linear-to-b from-slate-50 to-white border-t border-emerald-100/50">
            {/* Newsletter Section */}
            <div className="border-b border-emerald-100/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="max-w-md mx-auto text-center space-y-4">
                        <div className="flex justify-center mb-2">
                            <div className="w-8 h-8 flex items-center justify-center">
                                <svg
                                    className="w-full h-full text-emerald-600"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2c1.1 0 2 .9 2 2 0 2.3-1.7 4.3-4 4.8V20c0 1.1-.9 2-2 2s-2-.9-2-2V8.8C3.7 8.3 2 6.3 2 4c0-1.1.9-2 2-2h8zm8 16c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                            Stay Updated on Wildlife
                        </h3>
                        <p className="text-sm text-slate-600">
                            Get latest wildlife discoveries, photography tips, and conservation insights.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex gap-2 mt-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 sm:px-6 py-2.5 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                        {subscribed && (
                            <p className="text-sm text-emerald-600 font-medium">
                                ✓ Thanks for subscribing!
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                            About LifeAtlas
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            LifeAtlas is a global platform documenting Earth's incredible wildlife through contributions from photographers and nature enthusiasts worldwide.
                        </p>
                        <div className="flex gap-2 pt-2 flex-wrap">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium text-slate-600 hover:text-emerald-600 transition-colors px-2.5 py-1 rounded border border-slate-200 hover:border-emerald-300"
                            >
                                Twitter
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium text-slate-600 hover:text-emerald-600 transition-colors px-2.5 py-1 rounded border border-slate-200 hover:border-emerald-300"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium text-slate-600 hover:text-emerald-600 transition-colors px-2.5 py-1 rounded border border-slate-200 hover:border-emerald-300"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                            Explore
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/gallery"
                                    className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                                >
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/upload"
                                    className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                                >
                                    Contribute Photo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                            Community
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/upload"
                                    className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                                >
                                    Upload Guide
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                                    Photographer Tips
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                                    Cookies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                                    Accessibility
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-emerald-100/50 my-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600 py-6">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center">
                            <svg
                                className="w-full h-full text-emerald-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2c1.1 0 2 .9 2 2 0 2.3-1.7 4.3-4 4.8V20c0 1.1-.9 2-2 2s-2-.9-2-2V8.8C3.7 8.3 2 6.3 2 4c0-1.1.9-2 2-2h8zm8 16c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-0">
                            <p className="font-semibold text-slate-900 text-xs sm:text-sm">LifeAtlas</p>
                            <p className="text-xs text-slate-500">Wildlife Hub</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-xs">
                        <p>© {currentYear} LifeAtlas. All rights reserved.</p>
                        <span className="hidden sm:inline text-slate-400">•</span>
                        <p className="text-slate-500">Built by <span className="font-semibold text-slate-700">Doyen</span></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
