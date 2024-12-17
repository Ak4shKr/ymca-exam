import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import { Booking } from "./pages/Booking";
import { CardAllBooking } from "./components/card/CardAllBooking";
import { CardYourBooking } from "./components/card/CardYourBooking";
import Hero from "./pages/Hero";
import { RoomManage } from "./Admin/RoomManage";
import { ProfManage } from "./Admin/ProfManage";
import { ProtectedAdmin } from "./components/routes/ProtectedAdmin";

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
                <Booking />
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
          <Route
            path="/dashboard"
            element={
              <ProtectedAdmin>
                <RoomManage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/dashboard/professors"
            element={
              <ProtectedAdmin>
                <ProfManage />
              </ProtectedAdmin>
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
