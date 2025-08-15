import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { Dashboard } from "./pages/dashboard";
import { PrivateRoute } from "./routes/private-route";
import { useAuthContext } from "./hooks/useAuthContext";
import { PublicRoute } from "./routes/public-route";
import { WorldPage } from "./pages/world-page";
import { Bosses } from "./pages/bosses/bosses";
import { Notes } from "./pages/notes/notes";
import { Events } from "./pages/events/events";
import { Admin } from "./pages/admin/admin";
import { WorldAdminRoute } from "./routes/world-admin";

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route
        path="/signin"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignUp />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/world/:id"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <WorldPage />
          </PrivateRoute>
        }
      >
        <Route path="bosses" element={<Bosses />} />
        <Route path="notes" element={<Notes />} />
        <Route path="events" element={<Events />} />
        <Route
          path="admin"
          element={
            <WorldAdminRoute>
              <Admin />
            </WorldAdminRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
