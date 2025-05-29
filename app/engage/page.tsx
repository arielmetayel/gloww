export default function EngagePage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Engage</h1>
        
        {/* Top 4 Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Guided Memory Journal */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-3xl">📔</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Guided Memory Journal</h3>
            <p className="text-gray-600 text-sm mb-4">Capture thoughts and memories with guided prompts</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Start
            </button>
          </div>

          {/* Life Events Journal */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-3xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Life Events Journal</h3>
            <p className="text-gray-600 text-sm mb-4">Document significant moments in your life journey</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start
            </button>
          </div>

          {/* Sit in the Room */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 text-3xl">🪑</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sit in the Room</h3>
            <p className="text-gray-600 text-sm mb-4">Guided reflection sessions for deep memory capture</p>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Start
            </button>
          </div>

          {/* Wishes & Hopes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-600 text-3xl">🕊️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Wishes & Hopes</h3>
            <p className="text-gray-600 text-sm mb-4">Share your heartfelt wishes for loved ones</p>
            <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
              Start
            </button>
          </div>
        </div>

        {/* Conversations Library */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Conversations Library</h2>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Conversation
            </button>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm">📔</span>
                    </div>
                    <h3 className="font-medium text-gray-900">Childhood Summer Adventures</h3>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Memory Journal</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Reflecting on those magical summer days at grandma's house...</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>3 days ago</span>
                    <span>•</span>
                    <span>15 minutes</span>
                    <span>•</span>
                    <span>5 responses</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📅</span>
                    </div>
                    <h3 className="font-medium text-gray-900">Wedding Planning Memories</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Life Events</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">The stress, the joy, and everything in between...</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>1 week ago</span>
                    <span>•</span>
                    <span>22 minutes</span>
                    <span>•</span>
                    <span>8 responses</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 text-sm">🪑</span>
                    </div>
                    <h3 className="font-medium text-gray-900">Living Room Reflections</h3>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Sit in Room</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Quiet moments of contemplation in my favorite space...</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>2 weeks ago</span>
                    <span>•</span>
                    <span>18 minutes</span>
                    <span>•</span>
                    <span>3 responses</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-sm">🕊️</span>
                    </div>
                    <h3 className="font-medium text-gray-900">Messages for My Family</h3>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Wishes & Hopes</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Heartfelt words I want to leave behind...</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>3 weeks ago</span>
                    <span>•</span>
                    <span>12 minutes</span>
                    <span>•</span>
                    <span>2 responses</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 