import { Route, Routes } from "react-router-dom"
import Header from "./components/header/header"
import HomePage from "./pages/home-page"
import Footer from "./components/footer/footer"

function App() {
  
  return (
    <div className="w-screen h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
    </div>

  )
}

export default App;