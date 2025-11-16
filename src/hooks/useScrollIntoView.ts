import { useEffect, useRef, useState } from 'react'

/**
 * Hook that detects when an element scrolls into view
 * Returns a ref to attach to the element and isVisible boolean state
 * @param threshold - IntersectionObserver threshold (0-1), default 0.1
 * @returns Object with ref to attach to element and isVisible boolean
 */
export function useScrollIntoView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const currentRef = ref.current
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold }
        )

        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [threshold])

    return { ref, isVisible }
}
