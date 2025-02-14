import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParticlesDemo } from "./components/particles";
import Navbar from "./components/navbar";
import PageResume from "./c-Submitted-resume/page-resume";
import Submit from "./c-submit-resume/page-submit";
function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <ParticlesDemo /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<ParticlesDemo />} />
          <Route path="/submit-resume" element={<PageResume />} />
          <Route path="/submit-page" element={<Submit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
