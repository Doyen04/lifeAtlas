import { useState, useEffect } from 'react'
import type { JSX } from 'react'

/**
 * AnimatedCounter Component
 * Animates a counter from 0 to a target number
 * @param target - The number to count up to
 */
export function AnimatedCounter({ target }: { target: number }): JSX.Element {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let current = 0
        const increment = target / 100
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
