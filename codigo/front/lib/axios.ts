import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isSessionInvalid =
      error?.response?.data?.error === "Erro ao atualizar a sessão" &&
      error?.response?.data?.details?.includes(
        "Informe uma chave de sessão válida"
      );

    if (isSessionInvalid) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
