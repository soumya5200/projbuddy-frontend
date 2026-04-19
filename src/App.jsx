import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Project from "./pages/Project"
import Footer from "./components/Footer"
import Analytics from "./Analytics"


function App() {
  return (

    <BrowserRouter>
    <div className="app-container">
      <Navbar />
      <main className      ="main-content">
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:name" element={<Project />} />
        <Route path="/analytics" element={<Analytics />} />
        

      </Routes>
      </main>
    </div>
      <Footer />

    </BrowserRouter>

  )
}

export default App
