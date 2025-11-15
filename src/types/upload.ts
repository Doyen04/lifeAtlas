/**
 * Type definitions for the wildlife photo upload component
 */

/**
 * Represents the current step in the multi-step upload workflow
 */
export type UploadStep = 'select' | 'analyzing' | 'confirm' | 'success'

/**
 * AI analysis result for a single image
 */
export interface AnalysisResult {
    species: string
    description: string
    confidence: number
}

/**
 * Complete data for a single uploaded image with all metadata
 */
export interface ImageData {
    id: string
    file: File
    preview: string
    analysis: AnalysisResult | null
    species: string
    isUnknown: boolean
    tags: string[]
    tagInput: string
    location: string
    notes: string
}
