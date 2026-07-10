function SearchBar() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            🔍 Search Your Perfect Pet
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Location */}
            <div>
              <label className="block text-gray-600 mb-2">
                Location
              </label>

              <input
                type="text"
                placeholder="Enter City"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Pet Type */}
            <div>
              <label className="block text-gray-600 mb-2">
                Pet Type
              </label>

              <select className="w-full border rounded-xl p-3">
                <option>All Pets</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Rabbit</option>
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-gray-600 mb-2">
                Purpose
              </label>

              <select className="w-full border rounded-xl p-3">
                <option>Adoption</option>
                <option>Sale</option>
              </select>
            </div>

            {/* Button */}
            <div className="flex items-end">
              <button className="w-full bg-orange-500 text-white rounded-xl p-3 hover:bg-orange-600 transition">
                Search
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;