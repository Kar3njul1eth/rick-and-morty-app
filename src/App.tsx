import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

const Home = React.lazy(() => import ('./pages/Home'));
const Episodes = React.lazy(() => import ('./pages/Episodes'));
const Location = React.lazy(() => import ('./pages/Location'));

const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/location" element={<Location />} />
          </Routes>
        </Suspense>

      </div>
    </Router>
  );
}

export default App;