import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/signin/signin';
import WebPhone from './components/webphone/webphone';

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/call" element={<WebPhone />} />
        </Routes>
      </Router>
    </div>
  );
} 

export default App;