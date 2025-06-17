import { useNavigate } from 'react-router-dom';

export function Navigation() {
    const navigate = useNavigate();
  return (ruta) => setTimeout(() => navigate(ruta), 1000);
};

export function NavigationOnClick() {
    const navigate = useNavigate();
    return (ruta) => () => navigate(ruta);
};

export function NavigationOnClickWithState() {
    const navigate = useNavigate();
    return (ruta, state) => () => navigate(ruta, state);
};