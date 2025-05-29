import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      {/* Main content area */}
      <div className="text-center max-w-2xl">
        {/* Purple circle with clock icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-300 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 border-4 border-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          {/* Sparkle icon */}
          <div className="absolute -top-2 -right-8">
            <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>

        {/* Coming Soon Title */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
          We're working on something magical ✨
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          This feature is being lovingly crafted to help preserve
          <br />
          precious memories
        </p>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mb-12">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Back to Chat button */}
        <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Chat
        </button>
      </div>
    </div>
  )
}
