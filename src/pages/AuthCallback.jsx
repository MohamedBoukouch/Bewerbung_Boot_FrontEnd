import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { accessApi } from "../services/accessApi";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      const errorParam = searchParams.get("error");

      if (errorParam) {
        setError(decodeURIComponent(errorParam));
        setTimeout(() => navigate("/login?error=" + encodeURIComponent(errorParam), { replace: true }), 3000);
        return;
      }

      // The backend redirects here with ?token= (the session JWT). We use it
      // directly so we never depend on the cross-site session cookie. This
      // enforces: code -> Google -> dashboard.
      try {
        const session = await accessApi.getSession(token || undefined);

        if (!session || session.status !== "logged_in") {
          throw new Error("Session invalide");
        }

        const gUser = session.google_user;

        // Google MUST be connected before reaching the client dashboard,
        // because the Gmail account + tokens are required to send scraped emails.
        if (!session.google_connected || !gUser) {
          navigate("/login", { replace: true });
          return;
        }

        // Persist the token so a page refresh can rebuild the session
        // without relying on the (sometimes dropped) cross-site cookie.
        if (token) localStorage.setItem("bb_session_token", token);

        login(
          session.session,
          true,
          {
            email: gUser.email,
            name: gUser.name,
            picture: gUser.picture,
          }
        );

        const from = searchParams.get("from") || "/dashboard-client";
        navigate(from, { replace: true });
      } catch {
        setError("Erreur de connexion. Veuillez reessayer.");
        setTimeout(() => navigate("/login", { replace: true }), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Erreur</h2>
          <p className="text-sm text-gray-500">{error}</p>
          <p className="text-xs text-gray-400 mt-4">Redirection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Finalisation de la connexion...</p>
      </div>
    </div>
  );
}
