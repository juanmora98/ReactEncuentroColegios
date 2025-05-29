import { useNavigate } from 'react-router-dom';

export function Navigation() {
    const navigate = useNavigate();
  return (ruta) => () => navigate(ruta);
};