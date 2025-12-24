import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListPage from './components/pages/ListPage';
import DetailPage from './components/pages/DetailPage';

function App() {
  return (

    <Router basename="/project-test-frontend-ics/">
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
