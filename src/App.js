import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
