import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que maneja el desplazamiento automático hacia elementos
 * cuando la URL contiene un hash (ej: #services).
 * Funciona tanto al cargar la página como al cambiar de ruta.
 */
const ScrollToHashElement = () => {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (hash === '') {
            window.scrollTo(0, 0);
        } else {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Pequeño retraso para asegurar que el DOM esté listo
                // especialmente útil en navegaciones entre páginas
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }, 100);
            }
        }
    }, [pathname, hash, key]); // 'key' asegura que funcione incluso si el hash es el mismo pero se re-clickea

    return null;
};

export default ScrollToHashElement;
