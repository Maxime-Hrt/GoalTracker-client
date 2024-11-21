import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register.tsx";
import TryToken from "./pages/TryToken.tsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/try-token"} element={<TryToken />} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </Router>
  )
}

export default App
