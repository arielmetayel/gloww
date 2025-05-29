export default function EngagePage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Engage</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Guided Memory Journal */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-purple-600 text-2xl">📔</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Guided Memory Journal</h2>
                <p className="text-gray-600">Capture your thoughts and memories with guided prompts</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-medium text-purple-900 mb-2">Today's Prompt</h3>
                <p className="text-purple-800 mb-3">"Describe a moment when you felt most proud of yourself. What led to that feeling?"</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Start Writing
                </button>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800">Recent Entries</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">My college graduation day</span>
                    <span className="text-sm text-gray-500">3 days ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">First time riding a bike</span>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Life Events Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-blue-600 text-2xl">📅</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Life Events Journal</h2>
                <p className="text-gray-600">Document significant moments in your life journey</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Add New Life Event
              </button>
              
              <div className="space-y-3">
                <div className="border-l-4 border-blue-400 pl-4 py-2">
                  <h3 className="font-medium text-gray-900">Wedding Day</h3>
                  <p className="text-sm text-gray-600">The most beautiful day of my life</p>
                  <span className="text-xs text-gray-500">June 15, 2010</span>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4 py-2">
                  <h3 className="font-medium text-gray-900">First Child Born</h3>
                  <p className="text-sm text-gray-600">Emma came into our world</p>
                  <span className="text-xs text-gray-500">March 3, 2012</span>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4 py-2">
                  <h3 className="font-medium text-gray-900">Career Promotion</h3>
                  <p className="text-sm text-gray-600">Finally became senior designer</p>
                  <span className="text-xs text-gray-500">August 20, 2018</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dying Wishes & Sit in the Room */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Dying Wishes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-amber-600 text-2xl">🕊️</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Dying Wishes</h2>
                <p className="text-gray-600">Share your final thoughts and wishes for loved ones</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <textarea 
                className="w-full h-32 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                placeholder="Share your heartfelt wishes and thoughts for your loved ones..."
              ></textarea>
              <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Save Wishes
              </button>
            </div>
          </div>

          {/* Sit in the Room */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-indigo-600 text-2xl">🪑</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">"Sit in the Room"</h2>
                <p className="text-gray-600">Guided reflection sessions for deep memory capture</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="font-medium text-indigo-900 mb-2">Active Session</h3>
                <p className="text-indigo-800 mb-3">Childhood bedroom memories - 15 minutes remaining</p>
                <div className="w-full bg-indigo-200 rounded-full h-2 mb-3">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                  Continue Session
                </button>
              </div>
              
              <button className="w-full border border-indigo-200 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                Start New Reflection Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 