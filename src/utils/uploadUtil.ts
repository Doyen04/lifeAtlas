import type { ImageData, AnalysisResult } from '../types/upload'

/**
 * Accepted image formats for upload
 */
export const ACCEPTED_FORMATS = ['image/jpeg', 'image/png']

/**
 * Maximum file size allowed: 10MB
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024

/**
 * Validates if a file meets the upload requirements
 * @param file - The file to validate
 * @returns Error message if invalid, null if valid
 */
export const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FORMATS.includes(file.type)) {
        return 'Please upload a JPG or PNG image'
    }
    if (file.size > MAX_FILE_SIZE) {
        return 'File size must be under 10MB'
    }
    return null
}

/**
 * Creates an ImageData object from a file with preview
 * @param file - The image file
 * @param preview - Base64 encoded preview image
 * @returns Initialized ImageData object
 */
export const createImageData = (file: File, preview: string): ImageData => {
    return {
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview,
        analysis: null,
        species: '',
        isUnknown: false,
        tags: [],
        tagInput: '',
        location: '',
        notes: '',
    }
}

/**
 * Reads a file as Data URL for preview
 * @param file - The file to read
 * @returns Promise resolving to Data URL string
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            resolve(e.target?.result as string)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

/**
 * Mock analysis results for development/testing
 */
export const MOCK_ANALYSIS_RESULTS: AnalysisResult[] = [
    {
        species: 'African Lion',
        description: 'A majestic African lion with a golden mane, commonly found in savanna regions across Africa.',
        confidence: 92,
    },
    {
        species: 'Bengal Tiger',
        description: 'A powerful Bengal tiger with distinctive orange and black stripes, native to the Indian subcontinent.',
        confidence: 88,
    },
    {
        species: 'African Elephant',
        description: 'An African elephant, the largest land animal, characterized by large ears and a long trunk.',
        confidence: 95,
    },
    {
        species: 'Mountain Gorilla',
        description: 'A rare mountain gorilla, an endangered primate living in the misty forests of Central Africa.',
        confidence: 90,
    },
]

/**
 * Simulates AI analysis for images (mock implementation for development)
 * In production, this would call the backend API
 * @param images - Array of images to analyze
 * @returns Promise resolving to array of analyzed images
 */
export const analyzeImages = async (images: ImageData[]): Promise<ImageData[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const updatedImages = images.map((img) => {
                const isUnknown = Math.random() < 0.2
                if (isUnknown) {
                    return {
                        ...img,
                        analysis: null,
                        isUnknown: true,
                        species: '',
                    }
                } else {
                    const result = MOCK_ANALYSIS_RESULTS[Math.floor(Math.random() * MOCK_ANALYSIS_RESULTS.length)]
                    return {
                        ...img,
                        analysis: result,
                        species: result.species,
                        isUnknown: false,
                    }
                }
            })
            resolve(updatedImages)
        }, 2000)
    })
}

/**
 * Validates that all images have required fields filled
 * @param images - Array of images to validate
 * @returns Error message if validation fails, null if all valid
 */
export const validateAllImages = (images: ImageData[]): string | null => {
    const allHaveSpecies = images.every(img => img.species.trim())
    const allHaveLocation = images.every(img => img.location.trim())

    if (!allHaveSpecies) {
        return 'Please provide species name for all images'
    }

    if (!allHaveLocation) {
        return 'Please fill in location for all images'
    }

    return null
}

/**
 * Prepares submission data from images for API submission
 * @param images - Array of images with filled metadata
 * @returns Array of submission data objects
 */
export const prepareSubmissionData = (images: ImageData[]) => {
    return images.map(img => ({
        file: img.file.name,
        species: img.species,
        tags: img.tags,
        location: img.location,
        notes: img.notes,
        analysis: img.analysis,
    }))
}
