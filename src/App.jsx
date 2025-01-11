import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top";
import Header from "./components/header/header"
import HomePage from "./pages/home-page"
import GamePage from "./pages/game-page"
import TeamsListPage from "./pages/teams-list-page"
import StandingsPage from "./pages/standings-page"; 
import PlayersPage from "./pages/players-page"; 
import TeamPage from "./pages/team-page";
import Footer from "./components/footer/footer"

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === "/") {
      const defaultDate = new Date().toISOString().split("T")[0];
      navigate(`/${defaultDate}`, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="w-screen h-screen">
      <Header /> 
        {/* ScrollToTop to control the scroll at the start */}
      <ScrollToTop />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/:date" element={<HomePage />} />
        <Route path="/game/:gameId" element={<GamePage />}/>
        <Route path="/teams" element={<TeamsListPage />} />
        <Route path="/standings" element={<StandingsPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/team/:teamId" element={<TeamPage />} />

      </Routes>

      <Footer />
    </div>

  )
}

export default App;