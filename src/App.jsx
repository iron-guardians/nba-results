import { Route, Routes } from "react-router-dom"
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
  
  return (
    <div className="w-screen h-screen">
      <Header />
       
        {/* ScrollToTop to control the scroll at the start */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
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