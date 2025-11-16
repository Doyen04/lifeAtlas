import type { JSX } from 'react'
import { useScrollIntoView } from '../hooks'
import { AnimatedCounter } from './AnimatedCounter'

/**
 * StatsSection Component
 * Displays metrics with scroll-triggered animations
 * Each stat animates in sequence when scrolled into view
 */
export function StatsSection(): JSX.Element {
    const { ref, isVisible } = useScrollIntoView()

    return (
        <section ref={ref} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                        Our Vision for Global Wildlife Documentation
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                        These are our ambitious long-term goals to create the world's most comprehensive wildlife archive.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    {/* Stat 1 */}
                    <div className={`text-center p-4 sm:p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}>
                        <div className="mb-3 sm:mb-4">
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600">
                                {isVisible ? <AnimatedCounter target={1800000} /> : '0+'}
                            </span>
                        </div>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Wildlife Images</p>
                        <p className="text-xs sm:text-sm text-gray-500">Target by 2030</p>
                    </div>

                    {/* Stat 2 */}
                    <div className={`text-center p-4 sm:p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
                        <div className="mb-3 sm:mb-4">
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600">
                                {isVisible ? <AnimatedCounter target={220} /> : '0+'}
                            </span>
                        </div>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Countries Covered</p>
                        <p className="text-xs sm:text-sm text-gray-500">Global reach goal</p>
                    </div>

                    {/* Stat 3 */}
                    <div className={`text-center p-4 sm:p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}>
                        <div className="mb-3 sm:mb-4">
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600">
                                {isVisible ? <AnimatedCounter target={30000} /> : '0+'}
                            </span>
                        </div>
                        <p className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Active Contributors</p>
                        <p className="text-xs sm:text-sm text-gray-500">Community target</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
