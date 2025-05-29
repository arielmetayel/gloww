export default function LocationsPortalPage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Locations Portal</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map View */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Memory Map</h2>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 text-2xl">🗺️</span>
                </div>
                <p className="text-gray-600">Interactive memory map coming soon</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">12 locations with memories</span>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View Full Map
              </button>
            </div>
          </div>

          {/* Location List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Special Places</h2>
            <div className="space-y-4">
              {/* Location Item */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🏠</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">Childhood Home</h3>
                    <p className="text-sm text-gray-600 mb-2">42 Maple Street, Oak Valley</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>23 memories</span>
                      <span className="mx-2">•</span>
                      <span>1985-2003</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🎓</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">University Campus</h3>
                    <p className="text-sm text-gray-600 mb-2">Stanford University, California</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>47 memories</span>
                      <span className="mx-2">•</span>
                      <span>2003-2007</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">💒</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">Wedding Venue</h3>
                    <p className="text-sm text-gray-600 mb-2">Garden Chapel, Napa Valley</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>12 memories</span>
                      <span className="mx-2">•</span>
                      <span>June 2010</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🏖️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">Family Beach House</h3>
                    <p className="text-sm text-gray-600 mb-2">Mendocino Coast, California</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>31 memories</span>
                      <span className="mx-2">•</span>
                      <span>2012-Present</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium py-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
              Add New Location
            </button>
          </div>
        </div>

        {/* Recent Location Memories */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Location Memories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="bg-gray-200 rounded-lg h-32 mb-3 flex items-center justify-center">
                <span className="text-gray-500">📸</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">First Day at Stanford</h3>
              <p className="text-sm text-gray-600">Standing in front of the main quad, nervous but excited</p>
              <div className="mt-2 text-xs text-gray-500">September 2003</div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="bg-gray-200 rounded-lg h-32 mb-3 flex items-center justify-center">
                <span className="text-gray-500">📸</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Beach House Sunset</h3>
              <p className="text-sm text-gray-600">Watching the sunset with family during summer vacation</p>
              <div className="mt-2 text-xs text-gray-500">July 2023</div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="bg-gray-200 rounded-lg h-32 mb-3 flex items-center justify-center">
                <span className="text-gray-500">📸</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Wedding Day</h3>
              <p className="text-sm text-gray-600">Walking down the aisle in our dream venue</p>
              <div className="mt-2 text-xs text-gray-500">June 2010</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 