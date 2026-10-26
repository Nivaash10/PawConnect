import url from "node:url";

// Seed data based on supabase/seed.sql
const defaultProfiles = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    full_name: "Arjun Mehra",
    avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+91 98765 43210",
    location: "Coimbatore",
    role: "seller",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const defaultPets = [
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    seller_id: "00000000-0000-0000-0000-000000000001",
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 Years",
    gender: "Male",
    location: "Coimbatore",
    price: 18000.0,
    purpose: "adoption",
    image_url: "/images/dog1.jpg",
    description:
      "Friendly and active 2-year-old Golden Retriever looking for a loving home.",
    vaccinated: true,
    ai_score: 96,
    created_at: "2026-08-20T10:00:00.000Z",
    updated_at: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22",
    seller_id: "00000000-0000-0000-0000-000000000001",
    name: "Luna",
    species: "Cat",
    breed: "Persian Cat",
    age: "1 Year",
    gender: "Female",
    location: "Chennai",
    price: 12000.0,
    purpose: "sale",
    image_url: "/images/dog2.jpg",
    description:
      "Gentle Persian Cat with a calm demeanor, litter trained and healthy.",
    vaccinated: true,
    ai_score: 94,
    created_at: "2026-08-21T10:00:00.000Z",
    updated_at: "2026-08-21T10:00:00.000Z",
  },
  {
    id: "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
    seller_id: "00000000-0000-0000-0000-000000000001",
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    age: "3 Years",
    gender: "Male",
    location: "Bangalore",
    price: 25000.0,
    purpose: "adoption",
    image_url: "/images/dog3.jpg",
    description:
      "Loyal and protective German Shepherd, great with active families.",
    vaccinated: false,
    ai_score: 92,
    created_at: "2026-08-22T10:00:00.000Z",
    updated_at: "2026-08-22T10:00:00.000Z",
  },
];

const defaultPetImages = [
  {
    id: "img-1",
    pet_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    image_url: "/images/dog1.jpg",
    display_order: 0,
  },
  {
    id: "img-2",
    pet_id: "b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22",
    image_url: "/images/dog2.jpg",
    display_order: 0,
  },
  {
    id: "img-3",
    pet_id: "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
    image_url: "/images/dog3.jpg",
    display_order: 0,
  },
];

// In-memory collections for dev mode
const db = {
  users: [],
  profiles: [...defaultProfiles],
  pets: [...defaultPets],
  pet_images: [...defaultPetImages],
  favorites: [],
  adoption_requests: [],
};

export function supabaseDevPlugin() {
  return {
    name: "vite-supabase-dev-server",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname || "";

        // Set Supabase response headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "authorization, x-client-info, apikey, content-type, prefer"
        );
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        );

        if (req.method === "OPTIONS") {
          res.statusCode = 200;
          res.end();
          return;
        }

        // ── Auth Endpoints ──────────────────────────────────────────────────
        if (pathname.startsWith("/auth/v1/")) {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            let data = {};
            try {
              if (body) data = JSON.parse(body);
            } catch (e) {}

            res.setHeader("Content-Type", "application/json");

            // 1. Sign Up
            if (pathname === "/auth/v1/signup") {
              const email = data.email || "user@example.com";
              const fullName =
                data.options?.data?.full_name || email.split("@")[0];
              const userType = data.options?.data?.user_type || "adopter";
              const userId =
                "user_" + Math.random().toString(36).substring(2, 11);

              const userObj = {
                id: userId,
                aud: "authenticated",
                role: "authenticated",
                email: email,
                user_metadata: {
                  full_name: fullName,
                  user_type: userType,
                },
                created_at: new Date().toISOString(),
              };

              db.users.push(userObj);

              // Auto-create profile
              db.profiles.push({
                id: userId,
                full_name: fullName,
                avatar_url: null,
                phone: null,
                location: "India",
                role: userType === "owner" ? "seller" : "buyer",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });

              const responseBody = {
                access_token: "mock-token-" + userId,
                token_type: "bearer",
                expires_in: 3600,
                refresh_token: "mock-refresh-" + userId,
                user: userObj,
              };

              res.statusCode = 200;
              res.end(JSON.stringify(responseBody));
              return;
            }

            // 2. Sign In With Password
            if (
              pathname === "/auth/v1/token" &&
              parsedUrl.query.grant_type === "password"
            ) {
              const email = data.email || "user@example.com";
              let existingUser = db.users.find((u) => u.email === email);

              if (!existingUser) {
                const userId =
                  "user_" + Math.random().toString(36).substring(2, 11);
                existingUser = {
                  id: userId,
                  aud: "authenticated",
                  role: "authenticated",
                  email: email,
                  user_metadata: {
                    full_name: email.split("@")[0],
                    user_type: "adopter",
                  },
                  created_at: new Date().toISOString(),
                };
                db.users.push(existingUser);
                db.profiles.push({
                  id: userId,
                  full_name: email.split("@")[0],
                  location: "India",
                  role: "buyer",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                });
              }

              const responseBody = {
                access_token: "mock-token-" + existingUser.id,
                token_type: "bearer",
                expires_in: 3600,
                refresh_token: "mock-refresh-" + existingUser.id,
                user: existingUser,
              };

              res.statusCode = 200;
              res.end(JSON.stringify(responseBody));
              return;
            }

            // 3. User info
            if (pathname === "/auth/v1/user") {
              const authHeader = req.headers["authorization"] || "";
              const token = authHeader.replace("Bearer ", "").trim();
              const userId = token.replace("mock-token-", "");
              const userObj = db.users.find((u) => u.id === userId) ||
                db.users[0] || {
                  id: "00000000-0000-0000-0000-000000000001",
                  email: "seller@pawconnect.com",
                  user_metadata: { full_name: "Arjun Mehra" },
                };

              res.statusCode = 200;
              res.end(JSON.stringify(userObj));
              return;
            }

            // 4. Sign Out
            if (pathname === "/auth/v1/logout") {
              res.statusCode = 200;
              res.end(JSON.stringify({}));
              return;
            }

            // Fallback for other auth endpoints
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                access_token: "mock-token-default",
                user: db.users[0] || null,
              })
            );
          });
          return;
        }

        // ── REST Endpoints ──────────────────────────────────────────────────
        if (pathname.startsWith("/rest/v1/")) {
          const tableName = pathname.replace("/rest/v1/", "").split("?")[0];
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", () => {
            res.setHeader("Content-Type", "application/json");

            let requestData = [];
            try {
              if (body) requestData = JSON.parse(body);
            } catch (e) {}

            const query = parsedUrl.query || {};

            // 1. GET requests
            if (req.method === "GET") {
              let rows = db[tableName] ? [...db[tableName]] : [];

              // Handle filtering by ID: id=eq.<id> or maybeSingle
              if (query.id) {
                const idVal = query.id.replace("eq.", "");
                rows = rows.filter((r) => r.id === idVal);
              }

              // Handle filtering by species: species=ilike.%25Dog%25
              if (query.species) {
                const specVal = decodeURIComponent(
                  query.species.replace("ilike.", "").replace(/%/g, "")
                );
                if (specVal && specVal !== "All Pets") {
                  rows = rows.filter((r) =>
                    r.species?.toLowerCase().includes(specVal.toLowerCase())
                  );
                }
              }

              // Handle filtering by location: location=ilike.%25Coimbatore%25
              if (query.location) {
                const locVal = decodeURIComponent(
                  query.location.replace("ilike.", "").replace(/%/g, "")
                );
                if (locVal && locVal !== "Any Location") {
                  rows = rows.filter((r) =>
                    r.location?.toLowerCase().includes(locVal.toLowerCase())
                  );
                }
              }

              // Handle filtering by OR search: or=(name.ilike.%25term%25,breed.ilike.%25term%25,location.ilike.%25term%25)
              if (query.or) {
                const match = query.or.match(/%25(.*?)%25/);
                const term = match ? decodeURIComponent(match[1]) : "";
                if (term) {
                  const lower = term.toLowerCase();
                  rows = rows.filter(
                    (r) =>
                      r.name?.toLowerCase().includes(lower) ||
                      r.breed?.toLowerCase().includes(lower) ||
                      r.location?.toLowerCase().includes(lower)
                  );
                }
              }

              // Handle user_id query (favorites)
              // Handle pet_id query
              if (query.pet_id) {
                const pid = query.pet_id.replace("eq.", "");
                rows = rows.filter((r) => r.pet_id === pid);
              }

              // Handle user_id query (favorites)
              if (query.user_id) {
                const uid = query.user_id.replace("eq.", "");
                rows = rows.filter((r) => r.user_id === uid);
              }

              // Handle requester_id / seller_id query (adoption requests)
              if (query.requester_id) {
                const uid = query.requester_id.replace("eq.", "");
                rows = rows.filter((r) => r.requester_id === uid);
              }
              if (query.seller_id) {
                const sid = query.seller_id.replace("eq.", "");
                rows = rows.filter((r) => r.seller_id === sid);
              }
              if (query.status) {
                const statusQuery = query.status;
                if (statusQuery.startsWith("in.(")) {
                  const allowed = statusQuery.replace("in.(", "").replace(")", "").split(",");
                  rows = rows.filter((r) => allowed.includes(r.status));
                } else if (statusQuery.startsWith("eq.")) {
                  const val = statusQuery.replace("eq.", "");
                  rows = rows.filter((r) => r.status === val);
                }
              }

              // Handle joins if select query includes relations e.g. select=*,profiles(*),pet_images(*),pets(*)
              if (query.select && (query.select.includes("profiles") || query.select.includes("pets"))) {
                rows = rows.map((item) => {
                  const pet = db.pets.find((p) => p.id === (item.pet_id || item.id)) || db.pets[0];
                  const requesterProfile = db.profiles.find((p) => p.id === item.requester_id) ||
                    db.profiles.find((p) => p.id === item.seller_id) ||
                    db.profiles[0];
                  const images = db.pet_images.filter(
                    (img) => img.pet_id === (item.id || item.pet_id)
                  );
                  return {
                    ...item,
                    pets: pet || null,
                    profiles: requesterProfile || null,
                    pet_images: images,
                  };
                });
              }

              // Handle ordering
              if (query.order && query.order.includes("created_at.desc")) {
                rows.sort(
                  (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
              }

              // If single row requested (maybeSingle)
              const preferHeader = req.headers["prefer"] || "";
              if (
                (preferHeader.includes("return=representation") || preferHeader.includes("singular")) &&
                query.id &&
                rows.length >= 1
              ) {
                res.statusCode = 200;
                res.end(JSON.stringify(rows[0]));
                return;
              }

              res.statusCode = 200;
              res.end(JSON.stringify(rows));
              return;
            }

            // 2. POST requests (insert)
            if (req.method === "POST") {
              const items = Array.isArray(requestData)
                ? requestData
                : [requestData];
              const inserted = items.map((item) => ({
                id: item.id || "id_" + Math.random().toString(36).substring(2, 11),
                created_at: new Date().toISOString(),
                ...item,
              }));

              if (!db[tableName]) db[tableName] = [];
              db[tableName].push(...inserted);

              res.statusCode = 201;
              res.end(JSON.stringify(inserted));
              return;
            }

            // 3. PATCH / PUT requests (update)
            if (req.method === "PATCH" || req.method === "PUT") {
              const updatedItems = [];
              if (db[tableName]) {
                const targetId = query.id ? query.id.replace("eq.", "") : null;
                db[tableName] = db[tableName].map((r) => {
                  if (!targetId || r.id === targetId) {
                    const updated = { ...r, ...requestData, updated_at: new Date().toISOString() };
                    updatedItems.push(updated);
                    return updated;
                  }
                  return r;
                });
              }
              res.statusCode = 200;
              res.end(JSON.stringify(updatedItems));
              return;
            }

            // 4. DELETE requests
            if (req.method === "DELETE") {
              if (db[tableName]) {
                if (query.user_id && query.pet_id) {
                  const uid = query.user_id.replace("eq.", "");
                  const pid = query.pet_id.replace("eq.", "");
                  db[tableName] = db[tableName].filter(
                    (r) => !(r.user_id === uid && r.pet_id === pid)
                  );
                } else if (query.id) {
                  const idVal = query.id.replace("eq.", "");
                  db[tableName] = db[tableName].filter((r) => r.id !== idVal);
                }
              }
              res.statusCode = 200;
              res.end(JSON.stringify([]));
              return;
            }
          });
          return;
        }

        next();
      });
    },
  };
}
