import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DriversPage from "./pages/DriversPage";
import TeamsPage from "./pages/TeamsPage";
import RacesPage from "./pages/RacesPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/drivers">Drivers</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/races">Races</Link>
        {/* Add other links */}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/races" element={<RacesPage />} />
        {/* Define other routes */}
      </Routes>
    </Router>
  );
}

export default App;
