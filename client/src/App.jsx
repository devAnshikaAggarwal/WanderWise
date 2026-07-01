import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Destinations from './pages/Destinations';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
      <footer className="site-footer">
        <div id="services">
          <h4>Services</h4>
          <p>Customized trip planning, destination guides, and travel support.</p>
        </div>
        <div id="contact">
          <h4>Contact Us</h4>
          <p>hello@wanderwise.com</p>
        </div>
        <div id="privacy">
          <h4>Privacy Policy</h4>
          <p>Your data stays safe with us.</p>
        </div>
        <div id="terms">
          <h4>Terms</h4>
          <p>Simple, transparent booking and cancellation terms.</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
