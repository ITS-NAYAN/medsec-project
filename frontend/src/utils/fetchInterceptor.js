const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const originalFetch = window.fetch;

window.fetch = (url, options = {}) => {
  if (typeof url === "string") {
    url = url.replace("http://127.0.0.1:8000", API);
    url = url.replace("http://localhost:8000", API);
  }

  return originalFetch(url, options);
};