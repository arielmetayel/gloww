export default function ProcessingPortalPage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Processing Portal</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Processing */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Processing Jobs</h2>
              
              <div className="space-y-4">
                {/* Processing item */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Voice Model Training</h3>
                    <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">In Progress</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">Analyzing 45 audio samples • Est. 2 hours remaining</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Digital Avatar Creation</h3>
                    <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Queued</span>
                  </div>
                  <p className="text-sm text-gray-600">12 photos uploaded • Waiting for voice processing</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Memory Analysis</h3>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Completed</span>
                  </div>
                  <p className="text-sm text-gray-600">Processed 127 documents and photos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Processing Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Photos Processed</span>
                    <span className="text-sm font-medium">234</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-purple-600 h-1 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Audio Samples</span>
                    <span className="text-sm font-medium">45</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-purple-600 h-1 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Documents</span>
                    <span className="text-sm font-medium">127</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-purple-600 h-1 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Digital Twin Status</h3>
              <p className="text-purple-100 mb-4">Your digital twin is 65% complete</p>
              <div className="w-full bg-purple-300 rounded-full h-2 mb-4">
                <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-sm text-purple-100">Voice and personality modeling in progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 