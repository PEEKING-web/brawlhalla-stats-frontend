function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center bg-gray-800 p-8 rounded-lg max-w-md">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-white text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-400 mb-6">{message || 'Failed to load data'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage