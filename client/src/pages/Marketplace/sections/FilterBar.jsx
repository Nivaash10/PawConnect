function FilterBar() {
  return (

    <section className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-5 gap-4">

          <input
            type="text"
            placeholder="Search pets..."
            className="border rounded-xl px-4 py-3"
          />

          <select className="border rounded-xl px-4 py-3">

            <option>All Pets</option>

            <option>Dog</option>

            <option>Cat</option>

            <option>Bird</option>

            <option>Rabbit</option>

          </select>

          <select className="border rounded-xl px-4 py-3">

            <option>Any Location</option>

            <option>Coimbatore</option>

            <option>Chennai</option>

            <option>Bangalore</option>

          </select>

          <select className="border rounded-xl px-4 py-3">

            <option>Any Price</option>

            <option>Free Adoption</option>

            <option>₹5k - ₹10k</option>

            <option>₹10k - ₹20k</option>

          </select>

          <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold">
            Search
          </button>

        </div>

      </div>

    </section>

  );
}

export default FilterBar;