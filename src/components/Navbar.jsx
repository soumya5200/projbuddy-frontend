import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-black text-white">
      <h1 className="text-2xl font-bold text-blue-400">ProjBuddy</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  )
}

export default Navbar