const API =
  import.meta.env.VITE_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:8000`;

const originalFetch = window.fetch;

window.fetch = (url, options = {}) => {
  if (typeof url === "string") {
    url = url.replace("http://127.0.0.1:8000", API);
    url = url.replace("http://localhost:8000", API);

    if (url.startsWith("/") && !url.startsWith("/api")) {
      url = `${API}${url}`;
    }
  }

  return originalFetch(url, options);
};