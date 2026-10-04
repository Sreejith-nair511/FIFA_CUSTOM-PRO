export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8">Page not found</p>
        <a href="/" className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          Go home
        </a>
      </div>
    </div>
  )
}
