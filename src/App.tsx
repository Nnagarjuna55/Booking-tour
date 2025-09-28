import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { UiProvider } from "./context/UiContext";

function App() {
  return (
    <AuthProvider>
      <UiProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UiProvider>
    </AuthProvider>
  );
}

export default App;
