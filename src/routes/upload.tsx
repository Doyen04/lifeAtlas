import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import type { UploadStep, ImageData } from '../types/upload'
import {
    validateFile,
    createImageData,
    readFileAsDataURL,
    analyzeImages,
    validateAllImages,
    prepareSubmissionData,
} from '../utils/uploadUtil'

export const Route = createFileRoute('/upload')({
    component: Upload,
})

function Upload() {
    const [step, setStep] = useState<UploadStep>('select')
    const [images, setImages] = useState<ImageData[]>([])
    const [uploadError, setUploadError] = useState('')
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const navigate = useNavigate()

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageSelect = async (file: File) => {
        const error = validateFile(file)
        if (error) {
            setUploadError(error)
            return
        }

        setUploadError('')

        try {
            const preview = await readFileAsDataURL(file)
            const newImage = createImageData(file, preview)
            setImages((prevImages) => [...prevImages, newImage])
        } catch {
            setUploadError('Failed to read image file')
        }
    }

    const handleDragDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const files = Array.from(e.dataTransfer.files)
        files.forEach(file => handleImageSelect(file))
    }

    const handleAnalyzeImages = async () => {
        setStep('analyzing')
        try {
            const updatedImages = await analyzeImages(images)
            setImages(updatedImages)
            setStep('confirm')
        } catch {
            setUploadError('Failed to analyze images')
            setStep('select')
        }
    }

    const handleRemoveTag = (imageId: string, tagToRemove: string) => {
        setImages(images.map(img =>
            img.id === imageId
                ? { ...img, tags: img.tags.filter(tag => tag !== tagToRemove) }
                : img
        ))
    }

    const handleAddTag = (imageId: string, tag: string) => {
        setImages(images.map(img => {
            if (img.id === imageId) {
                if (tag.trim() && !img.tags.includes(tag.trim())) {
                    return { ...img, tags: [...img.tags, tag.trim()], tagInput: '' }
                }
            }
            return img
        }))
    }

    const handleSubmit = () => {
        const validationError = validateAllImages(images)
        if (validationError) {
            setUploadError(validationError)
            return
        }

        const submissionData = prepareSubmissionData(images)
        console.log('Submitting:', submissionData)
        setStep('success')
    }

    const resetForm = () => {
        setStep('select')
        setImages([])
        setUploadError('')
    }

    const goBackToSelect = () => {
        setStep('select')
        setUploadError('')
        setCurrentImageIndex(0)
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <button onClick={() => navigate({ to: '/' })} className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-4 sm:mb-5 transition-colors text-sm sm:text-base">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back Home
                    </button>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Share Your Wildlife Photo</h1>
                    <p className="text-slate-600 mt-2 sm:mt-3 text-sm sm:text-base">Help LifeAtlas grow by contributing wildlife photographs from around the world</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* Step 1: Image Selection */}
                {step === 'select' && (
                    <div className="space-y-8">
                        {/* Upload Area */}
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDragDrop}
                            className="border-2 border-dashed border-emerald-300 rounded-2xl p-8 sm:p-12 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                multiple
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        Array.from(e.target.files).forEach(file => handleImageSelect(file))
                                    }
                                }}
                            />

                            <svg className="w-16 h-16 mx-auto text-emerald-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>

                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Upload Wildlife Photos</h2>
                            <p className="text-slate-600 mb-4">Drag and drop multiple images here, or click to select</p>
                            <p className="text-sm text-slate-500">JPG or PNG, up to 10MB each</p>
                        </div>

                        {/* Error Message */}
                        {uploadError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-700 text-sm">{uploadError}</p>
                            </div>
                        )}

                        {/* Images Preview Grid */}
                        {images.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-900">Preview Images ({images.length})</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {images.map((img) => (
                                        <div key={img.id} className="relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                            <img src={img.preview} alt={`Preview`} className="w-full h-40 object-cover" />
                                            <button
                                                onClick={() => setImages(images.filter(i => i.id !== img.id))}
                                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
                                                title="Remove image"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full sm:flex-1 px-4 py-2 sm:py-3 bg-slate-100 text-slate-900 font-medium text-sm sm:text-base rounded-lg hover:bg-slate-200 transition-colors"
                                    >
                                        Add More Images
                                    </button>
                                    <button
                                        onClick={handleAnalyzeImages}
                                        className="w-full sm:flex-1 px-4 py-2 sm:py-3 bg-emerald-600 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-slate-400"
                                        disabled={images.length === 0}
                                    >
                                        Analyze Images
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 2: Analyzing Images */}
                {step === 'analyzing' && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900">Analyzing Your Photos</h2>
                            <p className="text-slate-600 mt-2">Our AI is identifying species and grouping related images...</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-slate-500">This may take a moment</p>
                        </div>
                    </div>
                )}

                {/* Step 3: Confirm & Edit - One image at a time */}
                {step === 'confirm' && images.length > 0 && (
                    <div className="space-y-8">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-2">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Review & Edit Photos</h2>
                                <span className="text-xs sm:text-sm font-medium text-slate-600">
                                    {currentImageIndex + 1} of {images.length}
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentImageIndex + 1) / images.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Current Image Form */}
                        {images[currentImageIndex] && (
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                {/* Image + Analysis Preview */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 sm:p-6 border-b border-slate-200">
                                    {/* Thumbnail */}
                                    <img src={images[currentImageIndex].preview} alt="Uploaded" className="w-full sm:w-32 h-32 object-cover rounded-lg shrink-0" />

                                    {/* AI Analysis Info */}
                                    <div className="flex-1">
                                        {images[currentImageIndex].analysis && (
                                            <div className="space-y-2">
                                                <p className="text-xs font-semibold text-emerald-700">AI DETECTED</p>
                                                <p className="text-xs sm:text-sm text-slate-700">{images[currentImageIndex].analysis.description}</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 bg-slate-200 rounded-full flex-1 max-w-xs">
                                                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${images[currentImageIndex].analysis.confidence}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-600">{images[currentImageIndex].analysis.confidence}%</span>
                                                </div>
                                            </div>
                                        )}
                                        {images[currentImageIndex].isUnknown && (
                                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                                                <p className="text-xs text-amber-800">⚠️ Unable to identify - please enter species</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Per-Image Form */}
                                <div className="p-4 sm:p-6 space-y-4">
                                    {/* Species Field */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                                            Species Name <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={images[currentImageIndex].species}
                                            onChange={(e) => {
                                                setImages(images.map((i, idx) =>
                                                    idx === currentImageIndex ? { ...i, species: e.target.value } : i
                                                ))
                                                setUploadError('')
                                            }}
                                            placeholder="e.g., African Lion"
                                            className="w-full px-3 sm:px-4 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                        />
                                    </div>

                                    {/* Location Field */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                                            Location <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={images[currentImageIndex].location}
                                            onChange={(e) => {
                                                setImages(images.map((i, idx) =>
                                                    idx === currentImageIndex ? { ...i, location: e.target.value } : i
                                                ))
                                                setUploadError('')
                                            }}
                                            placeholder="City, country, or lat/long"
                                            className="w-full px-3 sm:px-4 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">Where was this photo taken?</p>
                                    </div>

                                    {/* Tags Field */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                                            Tags <span className="text-slate-500">(optional)</span>
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={images[currentImageIndex].tagInput}
                                                onChange={(e) => {
                                                    setImages(images.map((i, idx) =>
                                                        idx === currentImageIndex ? { ...i, tagInput: e.target.value } : i
                                                    ))
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault()
                                                        handleAddTag(images[currentImageIndex].id, images[currentImageIndex].tagInput)
                                                    }
                                                }}
                                                placeholder="Add tag and press Enter"
                                                className="w-full sm:flex-1 px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                            />
                                            <button
                                                onClick={() => handleAddTag(images[currentImageIndex].id, images[currentImageIndex].tagInput)}
                                                className="w-full sm:w-auto px-3 py-2 bg-slate-100 text-slate-900 text-xs sm:text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {images[currentImageIndex].tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {images[currentImageIndex].tags.map((tag) => (
                                                    <span key={tag} className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                                                        {tag}
                                                        <button
                                                            onClick={() => handleRemoveTag(images[currentImageIndex].id, tag)}
                                                            className="text-emerald-700 hover:text-emerald-900"
                                                        >
                                                            ✕
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Notes Field */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                                            Notes <span className="text-slate-500">(optional)</span>
                                        </label>
                                        <textarea
                                            value={images[currentImageIndex].notes}
                                            onChange={(e) => {
                                                setImages(images.map((i, idx) =>
                                                    idx === currentImageIndex ? { ...i, notes: e.target.value } : i
                                                ))
                                            }}
                                            placeholder="Behavior, time of day, weather, etc."
                                            rows={3}
                                            className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {uploadError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-700 text-sm">{uploadError}</p>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sticky bottom-4 sm:bottom-6 bg-white rounded-lg p-3 sm:p-4 border border-slate-200 shadow-lg">
                            <button
                                onClick={goBackToSelect}
                                className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2 bg-slate-100 text-slate-900 font-medium text-sm sm:text-base rounded-lg hover:bg-slate-200 transition-colors"
                            >
                                Edit Photos
                            </button>
                            <button
                                onClick={() => {
                                    if (currentImageIndex > 0) {
                                        setCurrentImageIndex(currentImageIndex - 1)
                                        setUploadError('')
                                    }
                                }}
                                disabled={currentImageIndex === 0}
                                className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2 bg-slate-100 text-slate-900 font-medium text-sm sm:text-base rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ← Previous
                            </button>
                            {currentImageIndex < images.length - 1 && (
                                <button
                                    onClick={() => {
                                        if (images[currentImageIndex].species.trim() && images[currentImageIndex].location.trim()) {
                                            setCurrentImageIndex(currentImageIndex + 1)
                                            setUploadError('')
                                        } else {
                                            setUploadError('Please fill in species and location before continuing')
                                        }
                                    }}
                                    className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2 bg-emerald-600 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    Next →
                                </button>
                            )}
                            {currentImageIndex === images.length - 1 && (
                                <button
                                    onClick={handleSubmit}
                                    className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2 bg-emerald-600 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    Confirm & Submit All
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 4: Success */}
                {step === 'success' && (
                    <div className="text-center space-y-8">
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">Thank You!</h2>
                            <p className="text-lg text-slate-600 mb-2">Your wildlife photos have been successfully added to LifeAtlas.</p>
                            <p className="text-slate-500 mb-8">Your contribution helps scientists and conservationists protect endangered species worldwide.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="/"
                                className="px-6 py-3 bg-slate-100 text-slate-900 font-medium rounded-lg hover:bg-slate-200 transition-colors inline-block"
                            >
                                Back to Home
                            </a>
                            <button
                                onClick={resetForm}
                                className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                Upload More Photos
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
