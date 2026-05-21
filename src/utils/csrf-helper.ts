/**
 * Lee el valor de una cookie por su nombre.
 * Utilizado para obtener el 'csrftoken' para las peticiones POST/PUT/DELETE.
 */
function getCookie(name: string): string | null {
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Verifica si esta cookie empieza por el nombre que buscamos
            if (cookie.startsWith(name + '=')) {
                // Devuelve el valor después de "="
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
    }
    return null;
}

export const getCsrfToken = () => getCookie('csrftoken');