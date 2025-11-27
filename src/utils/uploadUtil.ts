import type { ImageData, AnalysisResult } from '../types/upload'

const ANALYZE_API_URL = 'https://doyen04-atlasbackend.hf.space/gemini/analyze'
const ANALYZE_PROMPT = 'You are an ecologist helping LifeAtlas catalog wildlife photos. Identify the primary species in each image and describe what you see.'
const ANALYZE_RESPONSE_SCHEMA_JSON = JSON.stringify({
    type: 'object',
    properties: {
        results: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    fileName: { type: 'string' },
                    species: { type: ['string', 'null'] },
                    description: { type: 'string' },
                    confidence: { type: 'number' },
                },
                required: ['fileName', 'species', 'description', 'confidence'],
            },
        },
    },
    required: ['results'],
})

type BackendAnalysisResult = {
    fileName?: string
    filename?: string
    name?: string
    species?: string | null
    description?: string | null
    confidence?: number | null
}

type BackendGroupItem = {
    index?: number
    fileName?: string
    filename?: string
}

type BackendAnalysisGroup = {
    group?: string
    count?: number
    summary?: {
        results?: BackendAnalysisResult[]
    }
    items?: BackendGroupItem[]
}

type BackendAnalysisResponse = {
    prompt?: string
    schema?: unknown
    gemini_model?: string
    total_images?: number
    results?: BackendAnalysisResult[]
    images?: BackendAnalysisResult[]
    groups?: BackendAnalysisGroup[]
}

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
    if (!images.length) {
        return images
    }

    const formData = new FormData()
    formData.append('prompt', ANALYZE_PROMPT)
    formData.append('schema_json', ANALYZE_RESPONSE_SCHEMA_JSON)

    images.forEach((image) => {
        formData.append('files', image.file, image.file.name)
    })

    const response = await fetch(ANALYZE_API_URL, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        throw new Error(`Image analysis failed with status ${response.status}`)
    }

    const payload = (await response.json()) as BackendAnalysisResponse
    const resultMap = new Map<string, BackendAnalysisResult>()
    const groupIndexMap = new Map<number, BackendAnalysisResult>()

    const ingestResult = (result?: BackendAnalysisResult) => {
        if (!result) {
            return
        }
        const key = result.fileName ?? result.filename ?? result.name
        if (key) {
            resultMap.set(key, result)
        }
    }

    if (Array.isArray(payload.results)) {
        payload.results.forEach(ingestResult)
    }

    if (Array.isArray(payload.images)) {
        payload.images.forEach(ingestResult)
    }

    if (Array.isArray(payload.groups)) {
        payload.groups.forEach((group) => {
            const results = group.summary?.results ?? []
            const items = group.items ?? []

            results.forEach(ingestResult)

            items.forEach((item, itemIdx) => {
                const matchedResult = (() => {
                    const byFilename = results.find((result) => {
                        const resName = result.fileName ?? result.filename ?? result.name
                        return !!resName && (resName === item.filename || resName === item.fileName)
                    })
                    if (byFilename) {
                        return byFilename
                    }
                    if (results[itemIdx]) {
                        return results[itemIdx]
                    }
                    return results[0]
                })()

                if (!matchedResult) {
                    return
                }

                const normalizedFileName = item.filename ?? item.fileName ?? matchedResult.fileName ?? matchedResult.filename ?? matchedResult.name
                if (normalizedFileName) {
                    const normalizedResult = {
                        ...matchedResult,
                        fileName: normalizedFileName,
                    }
                    ingestResult(normalizedResult)

                    if (typeof item.index === 'number') {
                        groupIndexMap.set(item.index, normalizedResult)
                    }
                } else if (typeof item.index === 'number') {
                    groupIndexMap.set(item.index, matchedResult)
                }
            })
        })
    }

    return images.map((image, idx) => {
        const match = resultMap.get(image.file.name) ?? groupIndexMap.get(idx)

        if (!match || !match.species) {
            return {
                ...image,
                analysis: null,
                isUnknown: true,
                species: '',
            }
        }

        const normalizedConfidence = typeof match.confidence === 'number'
            ? (match.confidence <= 1 ? Math.round(match.confidence * 100) : Math.round(match.confidence))
            : 0

        const analysis: AnalysisResult = {
            species: match.species,
            description: match.description ?? '',
            confidence: Math.max(0, Math.min(100, normalizedConfidence)),
        }

        return {
            ...image,
            analysis,
            species: analysis.species,
            isUnknown: false,
        }
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
