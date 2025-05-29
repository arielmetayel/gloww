export default function DigitalTwinPage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Digital Twin</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Digital Twin Status */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-8 text-white mb-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🤖</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Sarah Wilson Digital Twin</h2>
                  <p className="text-purple-100 mb-4">Your AI-powered digital representation</p>
                  <div className="w-full bg-purple-300 rounded-full h-3">
                    <div className="bg-white h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-sm text-purple-100 mt-2">78% Complete • Training in progress</p>
                </div>
              </div>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-xl">🗣️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Voice Synthesis</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Voice Training</span>
                    <span className="text-sm font-medium text-green-600">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">45 audio samples processed</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xl">🧠</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Personality Model</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Personality Analysis</span>
                    <span className="text-sm font-medium text-green-600">82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">127 documents analyzed</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-xl">👁️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Visual Avatar</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avatar Training</span>
                    <span className="text-sm font-medium text-yellow-600">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">234 photos processed</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-pink-600 text-xl">💭</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Memory Integration</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Memory Processing</span>
                    <span className="text-sm font-medium text-green-600">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">1,247 memories indexed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Test Voice Synthesis
                </button>
                <button className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition-colors">
                  Preview Avatar
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Training Settings
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Training Data</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Audio Samples</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Photos</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Text Documents</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Memories</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Journal Entries</span>
                  <span className="font-medium">89</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-xs">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Upload more voice recordings</p>
                    <p className="text-xs text-gray-600">For better voice synthesis accuracy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 text-xs">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Complete personality questionnaire</p>
                    <p className="text-xs text-gray-600">Help us understand your unique traits</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-purple-600 text-xs">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Review and approve avatar</p>
                    <p className="text-xs text-gray-600">Final check before activation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 