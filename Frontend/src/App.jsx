import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import { Home } from "./pages/Home";
import { CardAllBooking } from "./components/card/CardAllBooking";
import { CardYourBooking } from "./components/card/CardYourBooking";
import Hero from "./pages/Hero";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Hero />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/book-exam"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/all-booking"
            element={
              <ProtectedRoutes>
                <CardAllBooking />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/your-booking"
            element={
              <ProtectedRoutes>
                <CardYourBooking />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
