/**
 * PawConnect AI Assistant Service
 * Service layer for handling AI pet-care queries using Gemini API or built-in Pet-Care AI Engine.
 */

const SYSTEM_INSTRUCTION = `You are PawConnect AI, a pet-care assistant.
Provide practical general guidance about pet care, feeding, exercise, grooming, training, vaccination schedules, breed information, and adoption preparation.
Do not claim to diagnose medical conditions.
For serious illness, injury, poisoning, breathing problems, seizures, or other emergencies, advise the user to contact a qualified veterinarian immediately.
Ask relevant follow-up questions when necessary.`;

const EMERGENCY_KEYWORDS = [
  "bleed", "bleeding", "poison", "toxic", "seizure", "unconscious", "choking",
  "cannot breathe", "gasping", "hit by car", "broken bone", "paralyzed", "vomiting blood",
  "bloat", "collapse", "snake bite"
];

/**
 * Checks if prompt involves acute medical emergency.
 */
export function isEmergencyQuery(text = "") {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

/**
 * Intelligent Local Pet-Care Fallback AI Engine
 * Provides immediate, accurate, practical pet advice when external API key is not present.
 */
function getLocalAIResponse(userPrompt, history = [], userContext = {}) {
  const promptLower = userPrompt.toLowerCase();
  const userName = userContext?.full_name ? userContext.full_name.split(" ")[0] : "Pet Lover";

  // 1. Emergency Check
  if (isEmergencyQuery(userPrompt)) {
    return {
      text: `🚨 **URGENT VETERINARY ALERT** 🚨\n\nBased on your message, your pet may be experiencing a critical health emergency. Please **contact or visit an emergency veterinarian immediately**.\n\n• Do not wait for symptoms to resolve on their own.\n• Keep your pet calm and warm during transport.\n• Bring any suspected toxins, food packaging, or medication bottles with you to the clinic.`,
      isEmergency: true,
    };
  }

  // 2. Vaccination Queries
  if (promptLower.includes("vaccin") || promptLower.includes("shot") || promptLower.includes("deworm")) {
    return {
      text: `Hello ${userName}! Here is standard vaccination guidance for pets:\n\n🐶 **Puppy Vaccination Schedule:**\n• **6–8 Weeks:** DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza) 1st dose.\n• **10–12 Weeks:** DHPP 2nd dose + Rabies / Leptospirosis.\n• **14–16 Weeks:** DHPP 3rd booster.\n• **Annual/Triennial:** Core booster shots.\n\n🐱 **Kitten Vaccination Schedule:**\n• **6–8 Weeks:** FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia).\n• **12 Weeks & 16 Weeks:** FVRCP boosters + Rabies vaccine.\n\n💡 *Tip:* Always consult your local veterinarian to customize vaccinations based on your region! Would you like specific info for dogs or cats?`,
    };
  }

  // 3. Feeding & Diet Queries
  if (promptLower.includes("feed") || promptLower.includes("food") || promptLower.includes("diet") || promptLower.includes("eat") || promptLower.includes("nutrition")) {
    return {
      text: `Here are key nutrition & feeding guidelines for your pet:\n\n🍗 **Puppies & Kittens (Under 1 Year):**\n• Feed high-protein puppy/kitten formulated food 3–4 times daily.\n• Ensure continuous access to clean, fresh drinking water.\n\n🐕 **Adult Dogs & Cats:**\n• Feed measured portions twice daily (morning & evening).\n• Avoid dangerous human foods: **Chocolate, Onions, Garlic, Grapes, Xylitol (sweetener), and Cooked Bones**.\n\n✨ Would you like tailored portion recommendations based on your pet's breed or weight?`,
    };
  }

  // 4. Grooming Queries
  if (promptLower.includes("groom") || promptLower.includes("bath") || promptLower.includes("brush") || promptLower.includes("nail")) {
    return {
      text: `Grooming is vital for your pet's comfort and hygiene! Here are helpful tips:\n\n🚿 **Bathing:**\n• Dogs: Bath once every 3–4 weeks using specialized dog shampoo.\n• Cats: Usually self-grooming, but brush regularly to reduce hairballs.\n\n✂️ **Brushing & Nails:**\n• Brush double-coated dogs (like Golden Retrievers or Shepherds) 3x a week.\n• Trim nails every 2–3 weeks, taking care to avoid the quick.\n• Clean ears weekly with a vet-approved ear cleanser.\n\nWhat species or breed are you grooming? I can share breed-specific techniques!`,
    };
  }

  // 5. Training & Behavior Queries
  if (promptLower.includes("train") || promptLower.includes("bark") || promptLower.includes("bite") || promptLower.includes("potty") || promptLower.includes("housebreak") || promptLower.includes("leash")) {
    return {
      text: `Training works best with **positive reinforcement**! Here is a core training framework:\n\n🐾 **House Training / Potty Training:**\n• Take puppies out immediately after waking, eating, or playing.\n• Reward with treats & praise immediately when they eliminate outdoors.\n\n🦴 **Behavior & Biting:**\n• Redirect nipping onto appropriate chew toys.\n• Never use harsh physical punishment; consistency & patience yield the best results.\n\nWould you like a step-by-step routine for leash training or basic obedience commands (Sit, Stay, Recall)?`,
    };
  }

  // 6. Adoption Preparation Queries
  if (promptLower.includes("adopt") || promptLower.includes("prepare") || promptLower.includes("new pet") || promptLower.includes("bringing home")) {
    return {
      text: `Congratulations on choosing adoption! Here is your **First-Time Pet Adoption Checklist**:\n\n🏠 **Home Preparation:**\n1. Pet-proof electrical cords, trash cans, and toxic house plants.\n2. Set up a quiet, safe sleeping area with a soft bed.\n\n🛍️ **Essential Supplies:**\n• Food & water stainless-steel bowls\n• High-quality starter food & treats\n• Collar with ID tag, leash/harness\n• Litter box + scoop (for cats) or crate & toys (for dogs)\n\nHave you already chosen a pet from the PawConnect Marketplace? I can help you prepare specifically for dogs, cats, or small pets!`,
    };
  }

  // 7. Exercise & Activity
  if (promptLower.includes("exercise") || promptLower.includes("walk") || promptLower.includes("play") || promptLower.includes("energy")) {
    return {
      text: `Daily activity keeps your pet healthy, happy, and mentally stimulated!\n\n🐕 **Dogs:** High-energy breeds need 60–90 mins of daily walks/playtime; smaller breeds require 20–30 mins.\n🐱 **Cats:** Engage in 10–15 minute play sessions 2–3 times daily using feather wands, laser pointers, or puzzle toys.\n\nWhat breed or age is your pet? I can give you an exact daily activity plan!`,
    };
  }

  // 8. General / Fallback Pet Response
  return {
    text: `Welcome to PawConnect AI! I'm your dedicated pet-care assistant.\n\nI can assist you with:\n• **Nutrition & Feeding Schedules**\n• **Vaccination & Deworming Routines**\n• **Grooming & Hygiene Tips**\n• **Obedience & House Training**\n• **Breed Profiles & Adoption Prep**\n\nHow can I help you and your pet today, ${userName}? Feel free to ask any specific pet question!`,
  };
}

/**
 * Primary function to send AI message.
 * Connects to Google Gemini API if VITE_GEMINI_API_KEY is available, or uses local engine fallback.
 */
export async function sendAIMessage(conversationHistory = [], userContext = {}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
  const lastUserMessage = conversationHistory.filter((m) => m.role === "user").slice(-1)[0]?.content || "";

  if (!lastUserMessage.trim()) {
    return {
      success: false,
      error: "Please enter a valid prompt.",
    };
  }

  // Emergency safety override
  if (isEmergencyQuery(lastUserMessage)) {
    const emergencyRes = getLocalAIResponse(lastUserMessage, conversationHistory, userContext);
    return {
      success: true,
      text: emergencyRes.text,
      isEmergency: true,
    };
  }

  // If Gemini API Key is configured, make real API call
  if (apiKey && apiKey !== "your_gemini_api_key_here") {
    try {
      const contents = [
        {
          role: "user",
          parts: [{ text: `System Instruction: ${SYSTEM_INSTRUCTION}` }],
        },
        ...conversationHistory.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        }
      );

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        return {
          success: true,
          text: generatedText,
        };
      }
    } catch (err) {
      console.warn("[PawConnect AI] External API error, switching to Pet-Care AI Engine:", err);
    }
  }

  // Use Pet-Care AI Engine fallback
  const localRes = getLocalAIResponse(lastUserMessage, conversationHistory, userContext);
  return {
    success: true,
    text: localRes.text,
    isEmergency: localRes.isEmergency || false,
  };
}

/**
 * 1. AI CARE GUIDE GENERATOR
 * Generates dynamic, pet-specific educational care guidance based on pet traits.
 */
export async function generatePetCareGuide(pet = {}) {
  const species = (pet.species || "Dog").toLowerCase();
  const breed = pet.breed || "Crossbreed";
  const ageStr = (pet.age || "1 Year").toLowerCase();
  const isPuppyKitten = ageStr.includes("month") || ageStr.includes("puppy") || ageStr.includes("kitten") || ageStr.startsWith("0") || ageStr.startsWith("1 year");
  const isVaccinated = pet.vaccinated ?? true;

  // Attempt Gemini API if key is present
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey && apiKey !== "your_gemini_api_key_here") {
    try {
      const prompt = `Generate structured pet care guidance for a ${pet.age || "1 Year"} old ${pet.gender || "Male"} ${breed} (${pet.species || "Dog"}).
Vaccinated: ${isVaccinated ? "Yes" : "No"}.
Description: ${pet.description || "Friendly companion"}.
Return ONLY valid JSON matching this structure:
{
  "dailyFood": "food recommendations",
  "exerciseDuration": "exercise recommendations",
  "groomingFrequency": "grooming recommendations",
  "suitableHomeType": "home environment recommendations",
  "vaccinationReminders": ["reminder 1", "reminder 2"],
  "compatibleWithKids": true,
  "compatibleWithPets": true,
  "firstOwnerDifficulty": "Easy - explanation"
}`;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );

      if (response.ok) {
        const jsonRes = await response.json();
        const text = jsonRes?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const cleaned = text.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          return {
            success: true,
            data: {
              ...parsed,
              disclaimer: "AI-generated general educational pet-care guidance, NOT veterinary diagnosis. For medical concerns or illness, please consult a qualified veterinarian.",
            },
          };
        }
      }
    } catch (e) {
      console.warn("[PawConnect AI] Gemini Care Guide fetch failed, using local engine:", e);
    }
  }

  // Deterministic Local Pet-Care AI Engine
  if (species.includes("cat")) {
    return {
      success: true,
      data: {
        dailyFood: isPuppyKitten
          ? "3–4 small meals daily of kitten wet food + protein kibble"
          : "1/2 to 1 cup of high-protein cat food split into 2 meals",
        exerciseDuration: "15–30 minutes of interactive play (feather wand, laser, puzzle toys)",
        groomingFrequency: breed.toLowerCase().includes("persian") || breed.toLowerCase().includes("long")
          ? "Daily brushing to prevent matting & hairballs"
          : "Brush 1–2 times a week + monthly nail trim",
        suitableHomeType: "Apartment or house with indoor scratching posts and cozy window perches",
        vaccinationReminders: [
          isVaccinated ? "Core FVRCP booster due annually" : "FVRCP initial vaccine series recommended",
          "Rabies vaccination booster as required by local vet",
        ],
        compatibleWithKids: true,
        compatibleWithPets: true,
        firstOwnerDifficulty: "Easy — low-maintenance and independent indoor companion",
        disclaimer: "AI-generated general educational pet-care guidance, NOT veterinary diagnosis. For medical concerns or illness, please consult a qualified veterinarian.",
      },
    };
  }

  if (species.includes("bird")) {
    return {
      success: true,
      data: {
        dailyFood: "High-quality pellet mix + fresh leafy greens and fruit slices daily",
        exerciseDuration: "1–2 hours of out-of-cage supervised flight and foraging time",
        groomingFrequency: "Provide daily misting bath bowl; inspect beak & claw growth monthly",
        suitableHomeType: "Spacious cage placed in a warm, draft-free room with social interaction",
        vaccinationReminders: [
          "Annual avian veterinary wellness examination recommended",
        ],
        compatibleWithKids: true,
        compatibleWithPets: false,
        firstOwnerDifficulty: "Moderate — requires daily interaction and cage cleanliness",
        disclaimer: "AI-generated general educational pet-care guidance, NOT veterinary diagnosis. For medical concerns or illness, please consult a qualified veterinarian.",
      },
    };
  }

  if (species.includes("rabbit")) {
    return {
      success: true,
      data: {
        dailyFood: "80% fresh Timothy hay + 1/4 cup pellets + fresh dark leafy greens",
        exerciseDuration: "2–4 hours of supervised free-roaming in a bunny-proofed area",
        groomingFrequency: "Brush 1–2 times a week to prevent wool block and hairballs",
        suitableHomeType: "Quiet indoor exercise pen with non-slip flooring and safe hiding spots",
        vaccinationReminders: [
          "Annual RHDV (Rabbit Hemorrhagic Disease) booster if recommended locally",
        ],
        compatibleWithKids: true,
        compatibleWithPets: true,
        firstOwnerDifficulty: "Moderate — gentle handling and bunny-proofing required",
        disclaimer: "AI-generated general educational pet-care guidance, NOT veterinary diagnosis. For medical concerns or illness, please consult a qualified veterinarian.",
      },
    };
  }

  // Default: Dog
  const isHighEnergy = breed.toLowerCase().includes("retriever") || breed.toLowerCase().includes("shepherd") || breed.toLowerCase().includes("husky") || breed.toLowerCase().includes("labrador");
  return {
    success: true,
    data: {
      dailyFood: isPuppyKitten
        ? "3 meals daily of nutrient-rich puppy formula kibble"
        : "2–3 cups of quality dry kibble split into morning and evening meals",
      exerciseDuration: isHighEnergy
        ? "60–90 minutes of active walks, running, or fetch daily"
        : "30–45 minutes of regular daily walks and backyard play",
      groomingFrequency: breed.toLowerCase().includes("golden") || breed.toLowerCase().includes("shepherd")
        ? "Brush 3–4 times a week; professional bath every 6–8 weeks"
        : "Brush 1–2 times a week; bath once a month",
      suitableHomeType: isHighEnergy
        ? "House with a fenced yard or active owner committed to long daily walks"
        : "Apartment or house with regular daily outdoor breaks",
      vaccinationReminders: [
        isVaccinated ? "Rabies & DHPP annual boosters up to date" : "Core DHPP & Rabies vaccination series needed",
        "Deworming check every 6 months",
      ],
      compatibleWithKids: true,
      compatibleWithPets: true,
      firstOwnerDifficulty: isHighEnergy
        ? "Moderate — requires consistent daily exercise and training"
        : "Easy — great friendly companion for first-time dog owners",
      disclaimer: "AI-generated general educational pet-care guidance, NOT veterinary diagnosis. For medical concerns or illness, please consult a qualified veterinarian.",
    },
  };
}

/**
 * 2. AI PRICE ANALYSIS GENERATOR
 * Computes deterministic, transparent price reference ranges for adoption vs sale listings.
 */
export async function generatePetPriceAnalysis(pet = {}) {
  const rawPrice =
    typeof pet.price === "number"
      ? pet.price
      : parseFloat(pet.price?.toString().replace(/[^0-9.]/g, "")) || 0;

  const purpose = (pet.purpose || "adoption").toLowerCase();
  const isAdoption = purpose === "adoption" || rawPrice === 0;

  if (isAdoption) {
    return {
      success: true,
      data: {
        isAdoption: true,
        currentPrice: 0,
        estimatedRangeLabel: "Free Adoption",
        aiVerdict: "Free Adoption",
        explanation: `${pet.name || "This pet"} is listed for free adoption. Adoption listings do not require a purchase fee, making this a wonderful opportunity to provide a loving home.`,
        disclaimer: "AI Estimated Reference Range. This is a heuristic reference estimate based on listing purpose, NOT a guaranteed market valuation.",
      },
    };
  }

  // Calculate reference price bounds based on species & breed heuristics
  const species = (pet.species || "Dog").toLowerCase();
  const breed = (pet.breed || "").toLowerCase();

  let baseMin = 5000;
  let baseMax = 12000;

  if (species.includes("dog")) {
    if (breed.includes("retriever") || breed.includes("shepherd") || breed.includes("husky") || breed.includes("labrador")) {
      baseMin = 15000;
      baseMax = 28000;
    } else {
      baseMin = 8000;
      baseMax = 18000;
    }
  } else if (species.includes("cat")) {
    if (breed.includes("persian") || breed.includes("siamese") || breed.includes("main")) {
      baseMin = 10000;
      baseMax = 20000;
    } else {
      baseMin = 5000;
      baseMax = 12000;
    }
  } else if (species.includes("bird") || species.includes("rabbit")) {
    baseMin = 2000;
    baseMax = 6000;
  }

  if (pet.vaccinated) {
    baseMin += 1000;
    baseMax += 1500;
  }

  const avgMarketPrice = Math.round((baseMin + baseMax) / 2);

  let aiVerdict = "Fair Price";
  let savingsPercent = null;

  if (rawPrice < baseMin) {
    aiVerdict = "Good Deal";
    savingsPercent = Math.round(((avgMarketPrice - rawPrice) / avgMarketPrice) * 100);
  } else if (rawPrice > baseMax) {
    aiVerdict = "Potentially Expensive";
  }

  return {
    success: true,
    data: {
      isAdoption: false,
      currentPrice: rawPrice,
      estimatedRangeLabel: `₹${baseMin.toLocaleString()} - ₹${baseMax.toLocaleString()}`,
      avgMarketPrice,
      baseMin,
      baseMax,
      aiVerdict,
      savingsPercent,
      explanation: `${pet.name || "This pet"} is listed at ₹${rawPrice.toLocaleString()}. Based on species (${pet.species}), breed (${pet.breed || "Crossbreed"}), and vaccination status, the estimated reference market range for similar listings in ${pet.location || "your region"} is ₹${baseMin.toLocaleString()} – ₹${baseMax.toLocaleString()}.`,
      disclaimer: "AI Estimated Reference Range. This is a heuristic reference estimate based on regional listing attributes, NOT a guaranteed market appraisal.",
    },
  };
}

/**
 * 3. AI PET DESCRIPTION GENERATOR
 * Converts seller-supplied information into a clear, natural description without inventing unsupplied facts.
 */
export async function generatePetDescription(petData = {}) {
  const name = petData.name?.trim() || "My Pet";
  const species = petData.species || "Dog";
  const breed = petData.breed?.trim() || "Crossbreed";
  const age = petData.age?.trim() || "1 Year";
  const gender = petData.gender || "Male";
  const location = petData.location?.trim() || "my city";
  const purpose = petData.purpose === "adoption" ? "free adoption" : "sale";
  const vaccinated = petData.vaccinated;
  const notes = petData.extraNotes?.trim();

  // Try Gemini API if available
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey && apiKey !== "your_gemini_api_key_here") {
    try {
      const prompt = `Write an attractive, natural, and friendly 2-3 paragraph pet listing description.
STRICT RULE: Only use facts provided below. DO NOT invent health history, pedigree certifications, awards, or false facts.

Provided Facts:
- Name: ${name}
- Species: ${species}
- Breed: ${breed}
- Age: ${age}
- Gender: ${gender}
- Location: ${location}
- Listing Purpose: ${purpose}
- Vaccination: ${vaccinated ? "Fully Vaccinated" : "Vaccination Pending / Not specified"}
- Additional Notes: ${notes || "None"}

Return ONLY the description text.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );

      if (response.ok) {
        const jsonRes = await response.json();
        const genText = jsonRes?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (genText) {
          return {
            success: true,
            description: genText.trim(),
          };
        }
      }
    } catch (err) {
      console.warn("[PawConnect AI] Gemini description generation failed, using local engine:", err);
    }
  }

  // Deterministic Local Generator
  const vaccText = vaccinated
    ? `${name} is fully vaccinated and up to date on healthcare.`
    : `${name}'s vaccination status can be discussed with interested adopters/buyers.`;

  const notesText = notes ? ` ${notes}` : "";

  const text = `Meet ${name}, a wonderful ${age} old ${gender.toLowerCase()} ${breed} looking for a loving home in ${location}. ${name} is available for ${purpose}.\n\n${vaccText}${notesText}\n\nIf you are ready to welcome ${name} into your family, please reach out to connect!`;

  return {
    success: true,
    description: text,
  };
}

/**
 * 4. AI PET MATCHING ALGORITHM
 * Evaluates live Supabase pet listings against user questionnaire preferences.
 */
export function calculatePetMatches(preferences = {}, petsList = []) {
  if (!petsList || petsList.length === 0) {
    return [];
  }

  const {
    species = "Any",
    age = "Any",
    location = "Any",
    homeType = "Any",
    activityLevel = "Moderate",
    experience = "Beginner",
    hasKids = false,
    hasPets = false,
    purpose = "Any",
    budget = "Any",
  } = preferences;

  const scored = petsList.map((pet) => {
    let score = 50; // base score
    const reasons = [];

    // 1. Species Match (30 pts max)
    if (species === "Any") {
      score += 20;
    } else if (pet.species?.toLowerCase() === species.toLowerCase()) {
      score += 30;
      reasons.push(`✓ Preferred species match (${pet.species})`);
    } else {
      score -= 25;
    }

    // 2. Purpose & Budget (20 pts max)
    const petPrice = typeof pet.price === "number" ? pet.price : parseFloat(pet.price) || 0;
    const petPurpose = (pet.purpose || "adoption").toLowerCase();

    if (purpose === "Adoption" && petPurpose === "adoption") {
      score += 20;
      reasons.push("✓ Free adoption listing matches your preference");
    } else if (purpose === "Sale" && petPurpose === "sale") {
      score += 15;
    } else if (purpose === "Any") {
      score += 10;
    }

    if (budget === "Free Adoption" && petPrice === 0) {
      score += 10;
      reasons.push("✓ Fits your free adoption budget");
    } else if (budget === "Up to ₹10k" && petPrice <= 10000) {
      score += 10;
      reasons.push("✓ Fits within your ₹10,000 budget");
    } else if (budget === "Up to ₹25k" && petPrice <= 25000) {
      score += 10;
      reasons.push("✓ Fits within your ₹25,000 budget");
    }

    // 3. Location Match (15 pts max)
    if (location === "Any") {
      score += 10;
    } else if (pet.location?.toLowerCase().includes(location.toLowerCase())) {
      score += 15;
      reasons.push(`✓ Located in your target city (${pet.location})`);
    }

    // 4. Activity & Home Type Compatibility (15 pts max)
    const petSpeciesLower = (pet.species || "").toLowerCase();
    const petBreedLower = (pet.breed || "").toLowerCase();

    if (homeType === "Apartment" && (petSpeciesLower.includes("cat") || petSpeciesLower.includes("bird") || petSpeciesLower.includes("rabbit"))) {
      score += 15;
      reasons.push("✓ Ideal for apartment living");
    } else if (homeType === "House with yard" && petSpeciesLower.includes("dog")) {
      score += 15;
      reasons.push("✓ Great fit for a house with a yard");
    } else {
      score += 5;
    }

    if (activityLevel === "High" && (petBreedLower.includes("retriever") || petBreedLower.includes("shepherd") || petBreedLower.includes("husky"))) {
      score += 10;
      reasons.push("✓ High energy companion suitable for active owners");
    } else if (activityLevel === "Low" && (petSpeciesLower.includes("cat") || petBreedLower.includes("pug"))) {
      score += 10;
      reasons.push("✓ Calm temperament suited for a relaxed lifestyle");
    }

    // 5. Kids & Pets (10 pts max)
    if (hasKids) {
      score += 5;
      reasons.push("✓ Family-friendly companion candidate");
    }
    if (pet.vaccinated) {
      score += 5;
      reasons.push("✓ Fully vaccinated and healthcare checked");
    }

    const finalScore = Math.min(Math.max(score, 65), 98);

    return {
      pet,
      matchPercentage: finalScore,
      matchReasons: reasons.slice(0, 4),
    };
  });

  return scored.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

