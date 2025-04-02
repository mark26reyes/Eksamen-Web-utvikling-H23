// Nødvedige imports og komponenter
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DriversPage from "./pages/DriversPage";
import TeamsPage from "./pages/TeamsPage";
import RacesPage from "./pages/RacesPage";
import QuizPage from "./pages/QuizPage";
import { QuizProvider } from "./contexts/QuizContext";
import { DriverProvider } from "./contexts/DriverContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <DriverProvider>
      {" "}
      {/* Omslutt Router og dens barn med DriverProvider */}
      <Router>
        <header>
          {/* Navigasjonsmeny med lenker til forskjellige sider */}
          <nav className="navbar navbar-expand navbar-dark p-3 fixed-top">
            <div className="navbar-collapse justify-content-end">
              <ul className="navbar-nav">
                <li>
                  <Link className="nav-link text-light fw-bold" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-light fw-bold" to="/drivers">
                    Drivers
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-light fw-bold" to="/teams">
                    Teams
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-light fw-bold" to="/races">
                    Races
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-light fw-bold" to="/quiz">
                    Quiz
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {/* Definer ruter for forskjellige sider */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/races" element={<RacesPage />} />
          <Route
            path="/quiz"
            element={
              <QuizProvider>
                <QuizPage />
              </QuizProvider>
            }
          />
        </Routes>
      </Router>
      <header></header>
    </DriverProvider>
  );
}

export default App;
