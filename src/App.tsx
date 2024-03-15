import "./App.css";
import Footer from "./components/footer/footer";
import Hero from "./components/hero/Hero";
import Impress from "./components/impress";
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Privacy from "./components/privacy";
import Library from "./components/library/library";
import Login from "./components/login/Login";
import ReferenceDetail from "./components/library/ReferenceDetail";
import { GameMain } from "./components/games/GameMain";
import { UserProvider } from "./UserContext";
import Register from "./components/login/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import Users from "./components/admin/Users/Users";
import ReferencesPage from "./components/admin/References/ReferencesPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col">
          <Routes>
            {/* Define a common layout for routes with Navbar */}
            <Route
              path="/"
              element={
                <div>
                  <Navbar />
                  <Outlet />
                  <Footer />
                </div>
              }
            >
              <Route index element={<Hero />} />
              <Route path="/impress" element={<Impress />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/library" element={<Library />} />
              <Route path="/login" element={<Login />} />
              <Route path="/library/:id" element={<ReferenceDetail />} />
              <Route path="/games" element={<GameMain />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Define a layout without Navbar for the "/admin" route */}
            <Route
              path="/"
              element={
                <div className="flex flex-row">
                  <AdminDashboard />
                  <Outlet />
                </div>
              }
            >
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/references" element={<ReferencesPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
