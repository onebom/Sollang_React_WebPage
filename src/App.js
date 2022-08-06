import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Admin from "./routes/Admin";
import Aboutus from "./routes/AboutUs";
import Setting from "./routes/Setting";
import Home from "./routes/Home";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <Router>
      <Routes>
        <Route path="/aout-us" element={<Aboutus />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
