import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DriversPage from "./pages/DriversPage";
import TeamsPage from "./pages/TeamsPage";
import RacesPage from "./pages/RacesPage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/drivers">Drivers</Link>
          </li>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <Link to="/races">Races</Link>
          </li>
          <li>
            <Link to="/quiz">Quiz</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/races" element={<RacesPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        {/* Define other routes */}
      </Routes>
    </Router>
  );
}

export default App;
