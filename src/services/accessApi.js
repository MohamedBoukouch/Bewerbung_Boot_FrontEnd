const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bewerbung-boot-backend.onrender.com/api";

async function post(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const err = new Error(data?.detail || "Erreur serveur");
    err.status = res.status;
    throw err;
  }
  return data;
}

export const accessApi = {
  validateCode: (code) => post("/access/validate-code", { code }),
  activateCode: (code, email) => post("/access/activate-code", { code, email }),

  getSession: async (token) => {
    const url = token ? `${API_BASE}/access/session?token=${encodeURIComponent(token)}` : `${API_BASE}/access/session`;
    // Retry on transient failures (e.g. hosted free-tier cold start -> 502/timeout).
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const res = await fetch(url, { credentials: "include" });
        if (res.status === 502 || res.status === 503 || res.status === 504) {
          if (attempt < 3) { await new Promise((r) => setTimeout(r, 1500)); continue; }
          return null;
        }
        if (!res.ok) return null;
        return res.json();
      } catch (e) {
        if (attempt < 3) { await new Promise((r) => setTimeout(r, 1500)); continue; }
        throw e;
      }
    }
    return null;
  },

  getGoogleStatus: async () => {
    const res = await fetch(`${API_BASE}/access/google-status`, { credentials: "include" });
    if (!res.ok) return { connected: false };
    return res.json();
  },

  // Send emails. The session JWT is sent via the Authorization header because
  // the cross-site cookie can be dropped by the browser. The token is persisted
  // in localStorage after the Google callback (see AuthCallback).
  sendBatch: async (formData) => {
    const token = localStorage.getItem("bb_session_token");
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}/email/send-batch`, {
      method: "POST",
      credentials: "include",
      headers,
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.detail || "Send failed");
      err.status = res.status;
      throw err;
    }
    return data;
  },

  logout: () => post("/access/logout", {}),

  startGoogleLogin: async (code) => {
    const res = await fetch(`${API_BASE}/access/google-login?code=${encodeURIComponent(code)}`, {
      credentials: "include",
    });
    const data = await res.json();
    if (data.auth_url) {
      window.location.href = data.auth_url;
    } else {
      throw new Error("Impossible de demarrer la connexion Google.");
    }
  },
};