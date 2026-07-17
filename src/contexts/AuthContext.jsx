import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { accessApi } from "../services/accessApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Prefer the cookie; fall back to the token persisted in localStorage
        // after the Google callback (the cross-site cookie can be dropped).
        const storedToken = localStorage.getItem("bb_session_token");
        const session = await accessApi.getSession(storedToken || undefined);
        if (session?.status === "logged_in" && session.google_user) {
          setUser(session.session);
          setGoogleUser({
            email: session.google_user.email,
            name: session.google_user.name,
            picture: session.google_user.picture,
            connected: true,
          });
        } else if (session?.status === "logged_in") {
          // Cookie valid but Google not yet connected -> not fully authed.
          setUser(session.session);
        }
      } catch (e) {
        console.error("Session init failed", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback((sessionData, googleConnected = false, googleData = null) => {
    setUser(sessionData);
    if (googleConnected && googleData) {
      setGoogleUser({ ...googleData, connected: true });
    }
  }, []);

  const logout = useCallback(async () => {
    await accessApi.logout();
    localStorage.removeItem("bb_session_token");
    setUser(null);
    setGoogleUser(null);
  }, []);

  const isFullyAuthenticated = !!user && !!googleUser?.connected;

  const value = {
    user,
    googleUser,
    loading,
    isFullyAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
