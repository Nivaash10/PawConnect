import PetCard from "./PetCard";
import pets from "../../../services/petsData";

function PetGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold mb-8">
        Available Pets
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

    </section>
  );
}

export default PetGrid;