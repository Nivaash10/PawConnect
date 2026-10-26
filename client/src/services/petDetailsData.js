// Dummy data for PetDetails page

export const petDetailData = {
  id: 1,
  name: "Buddy",
  breed: "Golden Retriever",
  age: "2 Years",
  gender: "Male",
  location: "Coimbatore, Tamil Nadu",
  vaccinationStatus: "Fully Vaccinated",
  price: 18000,
  aiPriceScore: 96,
  availability: "Available Now",
  purpose: "Adoption",
  isAIPick: true,
  microchipped: true,
  friendly: true,
  indoor: true,
  images: [
    "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=800&q=80",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=800&q=80",
    "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80",
    "https://images.unsplash.com/photo-1597633125097-5a9961e1f03d?w=800&q=80",
  ],

  seller: {
    name: "Arjun Mehra",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
    rating: 4.9,
    totalAdoptions: 47,
    responseTime: "Usually within 2 hrs",
    memberSince: "March 2022",
  },

  careGuide: {
    dailyFood: "2–3 cups of high-quality dry kibble split into 2 meals",
    exerciseDuration: "60–90 minutes of active exercise per day",
    vaccinationReminders: [
      "Rabies booster due in 8 months",
      "DHPP booster due in 3 months",
      "Bordetella (kennel cough) — annual",
    ],
    groomingFrequency: "Brush 3–4 times a week; professional grooming every 6–8 weeks",
    suitableHomeType: "House with a yard or spacious apartment with daily outdoor access",
    compatibleWithKids: true,
    compatibleWithPets: true,
    firstOwnerDifficulty: "Easy — great breed for first-time owners",
  },

  priceAnalysis: {
    currentPrice: 18000,
    avgMarketPrice: 22000,
    aiRecommendation: "Good Deal",
    savingsPercent: 18,
    explanation:
      "Buddy is listed 18% below the average market price for a 2-year-old Golden Retriever in Coimbatore. Based on breed popularity, vaccination status and age, this is a great value adoption opportunity.",
    priceHistory: [
      { label: "Buddy's Price", value: 18000 },
      { label: "Avg Market", value: 22000 },
      { label: "Premium Range", value: 30000 },
    ],
  },
};

export const similarPetsData = [
  {
    id: 2,
    name: "Max",
    breed: "Labrador Retriever",
    age: "1.5 Years",
    gender: "Male",
    location: "Chennai",
    price: "₹15,000",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80",
    aiScore: 93,
    vaccinated: true,
    fairPrice: true,
    purpose: "Adoption",
  },
  {
    id: 3,
    name: "Bella",
    breed: "Beagle",
    age: "8 Months",
    gender: "Female",
    location: "Bangalore",
    price: "₹12,000",
    image:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&q=80",
    aiScore: 91,
    vaccinated: true,
    fairPrice: true,
    purpose: "Sale",
  },
  {
    id: 4,
    name: "Charlie",
    breed: "Border Collie",
    age: "3 Years",
    gender: "Male",
    location: "Hyderabad",
    price: "₹20,000",
    image:
      "https://images.unsplash.com/photo-1546491764-86a1ba68ea66?w=400&q=80",
    aiScore: 88,
    vaccinated: false,
    fairPrice: true,
    purpose: "Adoption",
  },
  {
    id: 5,
    name: "Daisy",
    breed: "Poodle",
    age: "2 Years",
    gender: "Female",
    location: "Mumbai",
    price: "₹25,000",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80",
    aiScore: 95,
    vaccinated: true,
    fairPrice: false,
    purpose: "Sale",
  },
];
