import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your route components
import Home from './components/Home';
import CreateAppointment from './components/CreateAppointment';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create_appointment" element={<CreateAppointment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;