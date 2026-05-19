const API = import.meta.env.VITE_API_URL || "/api";

const originalFetch = window.fetch;

window.fetch = (url, options = {}) => {
  if (typeof url === "string") {

    // Replace local backend URLs during development
    url = url.replace("http://127.0.0.1:8000", API);
    url = url.replace("http://localhost:8000", API);

    // If URL starts with / but not /api, prepend API
    if (url.startsWith("/") && !url.startsWith("/api")) {
      url = `${API}${url}`;
    }
  }

  return originalFetch(url, options);
};