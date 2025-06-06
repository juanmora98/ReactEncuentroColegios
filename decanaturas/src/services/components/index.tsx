import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from 'App.js';
import Decanaturas from 'pages/PagesDecanaturas/components/index';
import IESTAct1 from 'pages/PagesDecanaturas/PagesIngEstadistica/Activities/components/ActEst1/index';
import IAAct1 from 'pages/PagesDecanaturas/PagesIngIA/Activities/components/ActIA1/index';
import NotFound from 'core/components/NotFound/components/notFound';
import CiberAct1 from 'pages/PagesDecanaturas/PagesIngCiberSeguridad/Activities/components/ActCiber1/index';

const basename = process.env.PUBLIC_URL || '/';

export function AppRoutes() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/decanaturas" element={<Decanaturas />} />
        <Route path="/ing-sistemas/actividad" element={<ISISAct1 />} />
        <Route path="/ing-estadistica" element={<DecanaturaIEST />} />
        <Route path="/ing-estadistica/actividad" element={<IESTAct1 />} />
        <Route path="/ing-IA/actividad" element={<IAAct1 />} />
        <Route path="/ing-CiberSeguridad/actividad" element={<CiberAct1 />} />
        <Route path="*" element={<NotFound />} /> {/* Ruta 404 */}
      </Routes>
    </BrowserRouter>
  );
}