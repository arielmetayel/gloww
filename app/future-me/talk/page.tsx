export default function FutureMeTalkPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Talk with Future Me</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Sarah Wilson</h2>
                <p className="text-purple-100">Your Digital Twin • Available 24/7</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">👤</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-gray-800">Hello! I'm so glad you wanted to talk with me. How can I help you today?</p>
                <span className="text-xs text-gray-500 mt-1 block">2:34 PM</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 justify-end">
              <div className="bg-purple-600 text-white rounded-lg p-3 max-w-xs">
                <p>I've been thinking about that conversation we had about pursuing art. What would you say to me now?</p>
                <span className="text-xs text-purple-200 mt-1 block">2:35 PM</span>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">😊</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">👤</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-gray-800">I remember how passionate you were about art! You know, looking back, I think pursuing creative passions is never a mistake. Even if it doesn't become your career, it feeds your soul in ways that nothing else can.</p>
                <span className="text-xs text-gray-500 mt-1 block">2:36 PM</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Send
              </button>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Questions:</h3>
              <div className="flex flex-wrap gap-2">
                <button className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                  What advice would you give me?
                </button>
                <button className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                  Tell me about your proudest moment
                </button>
                <button className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                  What do you wish you had known?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 