import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const IconTarget = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconFileEdit = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconSend = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

export default function DashboardClient() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Willkommen, {user?.email?.split("@")[0] || "Benutzer"}
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Wahlen Sie eine Option aus, um zu beginnen.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <button
          onClick={() => navigate("/dashboard-client/datenextraktion")}
          className="flex flex-col items-center gap-4 p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-center"
        >
          <IconTarget />
          <div>
            <p className="text-sm font-bold text-gray-900">Datenextraktion</p>
            <p className="text-xs text-gray-500 mt-1">Unternehmen und E-Mails extrahieren</p>
          </div>
        </button>

        <button
          onClick={() => navigate("/dashboard-client/emails-senden")}
          className="flex flex-col items-center gap-4 p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-center"
        >
          <IconSend />
          <div>
            <p className="text-sm font-bold text-gray-900">E-Mails senden</p>
            <p className="text-xs text-gray-500 mt-1">Bewerbungen versenden</p>
          </div>
        </button>

        <button
          onClick={() => navigate("/dashboard-client/my-applications")}
          className="flex flex-col items-center gap-4 p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-center"
        >
          <IconFileEdit />
          <div>
            <p className="text-sm font-bold text-gray-900">Meine Anwendungen</p>
            <p className="text-xs text-gray-500 mt-1">Gespeicherte Extraktionen anzeigen</p>
          </div>
        </button>
      </div>
    </div>
  );
}
