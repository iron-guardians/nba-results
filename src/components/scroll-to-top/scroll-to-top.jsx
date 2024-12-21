import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza la página al inicio
  }, [pathname]); // Ejecuta esto cada vez que cambie la ruta

  return null;
}

export default ScrollToTop;
