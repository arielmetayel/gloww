export default function CollectPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Collect</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload and Collect Memories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Family Recipes */}
            <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600 text-xl">📝</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Family Recipes</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Upload cherished family recipes that have been passed down through generations.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Upload Recipes
              </button>
            </div>

            {/* Letters */}
            <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600 text-xl">💌</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Letters & Documents</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Upload letters written by your loved one to preserve their handwriting and words.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Upload Letters
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Uploads</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-gray-400 mr-3">📄</span>
                  <span className="text-gray-700">Grandma's Apple Pie Recipe</span>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-gray-400 mr-3">💌</span>
                  <span className="text-gray-700">Birthday Letter 1995</span>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 