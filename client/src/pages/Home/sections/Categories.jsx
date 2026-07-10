function Categories() {

  const categories = [
    { icon: "🐶", name: "Dogs", pets: "1200+" },
    { icon: "🐱", name: "Cats", pets: "950+" },
    { icon: "🐦", name: "Birds", pets: "320+" },
    { icon: "🐰", name: "Rabbits", pets: "180+" },
    { icon: "🐠", name: "Fish", pets: "430+" },
    { icon: "🐢", name: "Others", pets: "250+" },
  ];

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-3">
          Browse by Category
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Choose your favorite companion
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((category) => (

            <div
              key={category.name}
              className="bg-white rounded-2xl shadow-md p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border hover:border-orange-400"
            >

              <div className="text-5xl mb-4">
                {category.icon}
              </div>

              <h3 className="font-bold text-lg">
                {category.name}
              </h3>

              <p className="text-orange-500 mt-2">
                {category.pets} Pets
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;