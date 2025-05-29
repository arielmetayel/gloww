'use client'

import { useState } from 'react'

export default function CollectPage() {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop logic here
  }

  const memoryItems = [
    {
      id: 1,
      name: "Family_Vacation_2023.jpg",
      date: "Jan 15, 2024",
      type: "image",
      thumbnail: "🏔️"
    },
    {
      id: 2,
      name: "Birthday_Celebration.mp4",
      date: "Jan 14, 2024",
      type: "video",
      thumbnail: "🎉"
    },
    {
      id: 3,
      name: "Recipe_Book.pdf",
      date: "Jan 13, 2024",
      type: "document",
      thumbnail: "📄"
    },
    {
      id: 4,
      name: "Wedding_Anniversary.jpg",
      date: "Jan 12, 2024",
      type: "image",
      thumbnail: "💻"
    },
    {
      id: 5,
      name: "Grandchildren_Visit.jpg",
      date: "Jan 11, 2024",
      type: "image",
      thumbnail: "👶"
    },
    {
      id: 6,
      name: "Cooking_Together.mp4",
      date: "Jan 10, 2024",
      type: "video",
      thumbnail: "🟢"
    },
    {
      id: 7,
      name: "Love_Letters.pdf",
      date: "Jan 9, 2024",
      type: "document",
      thumbnail: "📄"
    },
    {
      id: 8,
      name: "Garden_Memories.jpg",
      date: "Jan 8, 2024",
      type: "image",
      thumbnail: "🏔️"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload & Collect</h1>
          <p className="text-lg text-gray-600">Upload photos, videos, documents, and other precious memories</p>
        </div>

        {/* Upload Area */}
        <div className="mb-12">
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
              isDragging 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Drop files here or click to upload</h3>
              <p className="text-gray-600 mb-6">Support for images, videos, PDFs, and documents</p>
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Choose Files
              </button>
            </div>
          </div>
        </div>

        {/* Memory Collection */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Memory Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {memoryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl">
                  {item.thumbnail}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-600">8 items • Upload more to build a richer memory collection</p>
          </div>
        </div>
      </div>
    </div>
  )
} 