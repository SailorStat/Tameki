import ky from "ky";

const api = ky.create({ prefixUrl: "https://localhost:1410" });

export default api;
