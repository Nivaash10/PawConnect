function NoPets({ onReset }) {
  return (
    <div className="text-center py-16 px-6 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-md mx-auto my-8">
      <div className="text-5xl mb-4">🐾</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">No Pets Found</h3>
      <p className="text-gray-500 text-sm mb-6">
        We couldn't find any pets matching your search or filter criteria.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-sm hover:shadow-md"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}

export default NoPets;
