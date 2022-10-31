import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroCard from "./pages/HeroCard";
import HeroForm from "./pages/HeroForm";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hero/:id" element={<HeroCard />} />
          <Route path="/create" element={<HeroForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
