import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppRoutes />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;