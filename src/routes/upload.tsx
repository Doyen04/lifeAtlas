import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'

export const Route = createFileRoute('/upload')({
  component: Upload,
})

type UploadStep = 'select' | 'analyzing' | 'confirm' | 'success'

interface AnalysisResult {
  species: string
  description: string
  confidence: number
}

function Upload() {
  const [step, setStep] = useState<UploadStep>('select')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadError, setUploadError] = useState('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  
  // Form fields
  const [species, setSpecies] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED_FORMATS = ['image/jpeg', 'image/png']
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return 'Please upload a JPG or PNG image'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be under 10MB'
    }
    return null
  }

  const handleImageSelect = (file: File) => {
    const error = validateFile(file)
    if (error) {
      setUploadError(error)
      return
    }

    setUploadError('')
    setSelectedImage(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleImageSelect(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return
    
    setStep('analyzing')
    
    // Simulate API call to backend for AI analysis
    setTimeout(() => {
      const mockResults: AnalysisResult[] = [
        { species: 'African Lion', description: 'A majestic African lion with a golden mane, commonly found in savanna regions across Africa.', confidence: 92 },
        { species: 'Bengal Tiger', description: 'A powerful Bengal tiger with distinctive orange and black stripes, native to the Indian subcontinent.', confidence: 88 },
        { species: 'African Elephant', description: 'An African elephant, the largest land animal, characterized by large ears and a long trunk.', confidence: 95 },
        { species: 'Mountain Gorilla', description: 'A rare mountain gorilla, an endangered primate living in the misty forests of Central Africa.', confidence: 90 },
      ]
      
      const result = mockResults[Math.floor(Math.random() * mockResults.length)]
      setAnalysisResult(result)
      setSpecies(result.species)
      setStep('confirm')
    }, 2000)
  }

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = () => {
    if (!species.trim() || !location.trim()) {
      setUploadError('Please fill in all required fields')
      return
    }
    
    setStep('success')
  }

  const resetForm = () => {
    setStep('select')
    setSelectedImage(null)
    setImagePreview('')
    setUploadError('')
    setAnalysisResult(null)
    setSpecies('')
    setTags([])
    setTagInput('')
    setLocation('')
    setNotes('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <a href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-4 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back Home
          </a>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Share Your Wildlife Photo</h1>
          <p className="text-slate-600 mt-2">Help LifeAtlas grow by contributing wildlife photographs from around the world</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
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
                className="hidden"
                onChange={(e) => e.target.files && handleImageSelect(e.target.files[0])}
              />
              
              <svg className="w-16 h-16 mx-auto text-emerald-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Upload Wildlife Photo</h2>
              <p className="text-slate-600 mb-4">Drag and drop your image here, or click to select</p>
              <p className="text-sm text-slate-500">JPG or PNG, up to 10MB</p>
            </div>

            {/* Error Message */}
            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 text-sm">{uploadError}</p>
              </div>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-4 py-3 bg-slate-100 text-slate-900 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Change Image
                  </button>
                  <button
                    onClick={handleAnalyze}
                    className="flex-1 px-4 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Analyze Image
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Analyzing */}
        {step === 'analyzing' && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 animate-spin text-emerald-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Your Image</h2>
              <p className="text-slate-600">Our AI is identifying the animal species in your photo...</p>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation & Form */}
        {step === 'confirm' && analysisResult && (
          <div className="space-y-8">
            {/* Analysis Result Summary */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/50 rounded-2xl p-6 border border-emerald-200">
              <div className="flex flex-col sm:flex-row gap-6">
                <img src={imagePreview} alt="Analysis" className="w-full sm:w-32 h-32 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-emerald-700 mb-1">IDENTIFIED SPECIES</h3>
                  <p className="text-2xl font-bold text-slate-900 mb-3">{analysisResult.species}</p>
                  <p className="text-slate-700 mb-4">{analysisResult.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-slate-200 rounded-full flex-1 max-w-xs">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${analysisResult.confidence}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-slate-600">{analysisResult.confidence}% confident</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Form */}
            <div className="space-y-6 bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900">Confirm & Add Details</h3>

              {/* Species Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Animal Species <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  placeholder="e.g., African Lion, Bengal Tiger"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <p className="text-xs text-slate-500 mt-1">Correct or confirm the detected species name</p>
              </div>

              {/* Tags Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Tags <span className="text-slate-500">(optional)</span>
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddTag(tagInput)
                        }
                      }}
                      placeholder="Type a tag and press Enter"
                      className="flex-1 px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                    <button
                      onClick={() => handleAddTag(tagInput)}
                      className="px-4 py-3 bg-slate-100 text-slate-900 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="text-emerald-700 hover:text-emerald-900"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-2">e.g. species, habitat, behavior, location</p>
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Location <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, country, or latitude/longitude"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <p className="text-xs text-slate-500 mt-1">Where did you take this photo?</p>
              </div>

              {/* Notes Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Notes <span className="text-slate-500">(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional details about when or how you took this photo..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                />
                <p className="text-xs text-slate-500 mt-1">Optional: behavior, time of day, weather conditions, etc.</p>
              </div>

              {/* Error Message */}
              {uploadError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700 text-sm">{uploadError}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-900 font-medium rounded-lg hover:bg-slate-200 transition-colors"
              >
                Edit Photo
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Confirm & Submit
              </button>
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
              <p className="text-lg text-slate-600 mb-2">Your wildlife photo has been successfully added to LifeAtlas.</p>
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
                Upload Another Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
