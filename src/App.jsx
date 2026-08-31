
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home.jsx";
import Notes from "./Notes.jsx";
import Contact from "./Contact.jsx";
import Signup from "./Signup.jsx";
import Register from "./Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Home after Sign In */}
        <Route path="/home" element={<Home />} />

        {/* Notes */}
        <Route path="/notes" element={<Notes />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* Sign In */}
        <Route path="/signup" element={<Signup />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

