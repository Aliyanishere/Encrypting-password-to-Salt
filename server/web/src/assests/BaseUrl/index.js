
const dev = "http://localhost:5000";
const baseUrl = window.location.hostname.split(":")[0] === "localhost" ? dev : "";

export default baseUrl;