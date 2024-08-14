import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Listpages from './components/List-page/Listpages';
import DetailPage from './components/Detail-page/Detail-page';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Listpages />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
