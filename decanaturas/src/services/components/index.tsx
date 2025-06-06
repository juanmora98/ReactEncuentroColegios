import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ISISAct1 from 'pages/PagesDecanaturas/PagesIngSistemas/components/Index';
import IEST from 'pages/PagesDecanaturas/PagesIngEstadistica/components/Index';
import IESTAct1 from 'pages/PagesDecanaturas/PagesIngEstadistica/Activities/components/ActEst1';
import IAAct1 from 'pages/PagesDecanaturas/PagesIngIA/Activities/components/ActIA1';
import CiberAct1 from 'pages/PagesDecanaturas/PagesIngCiberSeguridad/Activities/components/ActCiber1';
import NotFound from 'core/components/NotFound/components/notFound';
import App from 'App.js';

const basename = process.env.PUBLIC_URL || '/';

export function AppRoutes() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ing-sistemas/actividad" element={<ISISAct1 />} />
        <Route path="/ing-estadistica" element={<IEST />} />
        <Route path="/ing-estadistica/actividad" element={<IESTAct1 />} />
        <Route path="/ing-IA/actividad" element={<IAAct1 />} />
        <Route path="/ing-CiberSeguridad/actividad" element={<CiberAct1 />} />
        <Route path="*" element={<NotFound />} /> {/* Ruta 404 */}
      </Routes>
    </BrowserRouter>
  );
}