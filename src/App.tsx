import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { useEffect, useState } from "react";
import { Dashboard } from "./pages/dashboard";
import { PrivateRoute } from "./components/private-route";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:6842/api/auth/session", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      console.log(data);

      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
