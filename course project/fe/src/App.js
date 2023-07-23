import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import LoginPage from './pages/Login';

function App() {

  return (
    <Routes>
      {/* directive  */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
