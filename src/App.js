import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Otp from "./components/Otp/Otp";

const App = () => {
  
  

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Otp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;