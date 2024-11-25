import axios from "axios";

// Crear una instancia de Axios
const apiClient = axios.create({
    baseURL: "http://localhost:8000", // Cambia según tu entorno
    withCredentials: true, // Incluye cookies en las solicitudes
});

// Función para establecer el token en el encabezado Authorization
export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common["Authorization"];
    }
};

export default apiClient;
