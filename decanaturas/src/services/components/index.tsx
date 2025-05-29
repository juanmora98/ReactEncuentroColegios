import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ISISAct1 from 'pages/PagesDecanaturas/PagesIngSistemas/components/Index';
import App from 'App.js';

const basename = process.env.PUBLIC_URL || '/';

export function AppRoutes() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ing-sistemas" element={<ISISAct1 />} />
      </Routes>
    </BrowserRouter>
  );
}