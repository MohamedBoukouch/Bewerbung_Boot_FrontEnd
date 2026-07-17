import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { accessApi } from "../services/accessApi";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bewerbung-boot-backend.onrender.com/api";

/* ── Icons ── */
const IconUpload = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

const IconGoogle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconAlert = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconSpinner = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70"/>
  </svg>
);

const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IconFile = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const IconExcel = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="16" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="13"/>
    <line x1="14" y1="9" x2="16" y2="13"/>
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconLog = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? "bg-indigo-600" : "bg-gray-300"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

/* ── Drop zone ── */
function DropZone({ label, sublabel, file, onFile, accept = "*", onRemove }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        onClick={() => ref.current.click()}
        className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-8 sm:py-10 cursor-pointer transition-colors ${drag ? "border-indigo-400 bg-indigo-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
      >
        <input ref={ref} type="file" className="hidden" accept={accept} onChange={(e) => onFile(e.target.files[0])} />
        <IconUpload />
        <p className="mt-3 text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
      </div>
      {file && (
        <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2">
          <div className="flex items-center gap-2 min-w-0">
            <IconFile />
            <span className="text-sm text-indigo-700 font-medium truncate">{file.name || "File uploaded"}</span>
          </div>
          {onRemove && (
            <button onClick={onRemove} className="text-red-500 hover:text-red-700 p-1">
              <IconTrash />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Rich text editor ── */
function RichEditor({ value, onChange }) {
  const exec = (cmd) => document.execCommand(cmd, false, null);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50 overflow-x-auto">
        {["bold", "italic", "underline"].map((cmd, i) => (
          <button key={cmd} onMouseDown={(e) => { e.preventDefault(); exec(cmd); }} className="w-8 h-8 rounded flex items-center justify-center text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex-shrink-0">
            {["B", "I", "U"][i]}
          </button>
        ))}
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <button onMouseDown={(e) => { e.preventDefault(); exec("insertUnorderedList"); }} className="w-8 h-8 rounded flex items-center justify-center text-sm font-semibold text-gray-700 hover:bg-gray-200">•</button>
      </div>
      <div contentEditable suppressContentEditableWarning onInput={(e) => onChange(e.currentTarget.innerHTML)} className="min-h-[180px] sm:min-h-[220px] px-3 sm:px-4 py-3 text-sm text-gray-800 outline-none leading-relaxed" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function EmailsSenden() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, googleUser } = useAuth();

  // Check if coming from My Applications (with companies data)
  const passedCompanies = location.state?.companies || [];
  const extractionId = location.state?.extractionId || "";
  const fromMyApplications = passedCompanies.length > 0;

  // Check if coming from Cover Letter
  const fromCoverLetter = location.state?.fromCoverLetter || false;
  const coverLetterData = location.state?.coverLetterData || null;

  const [companies, setCompanies] = useState(passedCompanies);
  const [excelFile, setExcelFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [motivationLetter, setMotivationLetter] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [useEditor, setUseEditor] = useState(false);
  const [subject, setSubject] = useState("Application for a position");
  const [content, setContent] = useState(
    `Dear Hiring Manager,<br><br>
I am writing to express my strong interest in a position at your company.<br><br>
Please find my application documents (resume and certificates) attached.<br>
I would be very pleased to receive an invitation to a personal interview.<br><br>
Sincerely,<br>
[Your Name]`
  );
  const [waitTime, setWaitTime] = useState("30");
  const [skipCompany, setSkipCompany] = useState(false);
  const [statusFile, setStatusFile] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  // Email send log for user experience
  const [sendLog, setSendLog] = useState([]);
  const [currentSendingIndex, setCurrentSendingIndex] = useState(0);

  /* ── Parse Excel/CSV file to extract company emails ── */
  const parseExcelFile = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split(/\r?\n/);
        const extractedCompanies = [];

        lines.forEach((line, index) => {
          if (index === 0) return; // Skip header
          const cols = line.split(",").map(c => c.trim().replace(/^"|"$/g, ""));

          let email = "";
          let companyName = "";
          let city = "";

          cols.forEach((col) => {
            if (col.includes("@") && !email) email = col;
            if (!companyName && col.length > 2 && !col.includes("@")) companyName = col;
            if (!city && col.length > 2 && !col.includes("@") && col !== companyName) city = col;
          });

          if (email) {
            extractedCompanies.push({
              company_name: companyName || `Company ${index}`,
              email: email,
              city: city || "",
              field: "",
              website: "",
              phone: "",
              job_title: ""
            });
          }
        });

        setCompanies(extractedCompanies);
        setExcelFile(file);

        if (extractedCompanies.length === 0) {
          setError("No valid emails found in the file. Make sure the file contains email addresses.");
        } else {
          setError("");
        }
      } catch (err) {
        setError("Error parsing file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  /* ── Load saved data from localStorage or cover letter page ── */
  useEffect(() => {
    const googleError = searchParams.get("error");
    if (googleError) {
      setError(`Google Login Error: ${googleError}`);
    }

    // Priority 1: Load from cover letter navigation state
    if (fromCoverLetter && coverLetterData) {
      if (coverLetterData.emailSubject) {
        setSubject(coverLetterData.emailSubject);
      }
      if (coverLetterData.emailBody) {
        setContent(coverLetterData.emailBody.replace(/\n/g, "<br>"));
      }
      if (coverLetterData.cvFile) {
        setCvFile(coverLetterData.cvFile);
      }
      if (coverLetterData.motivationFile) {
        setMotivationLetter(coverLetterData.motivationFile);
      }

      // Save to localStorage for future visits
      localStorage.setItem("email_send_data", JSON.stringify({
        profile: coverLetterData.profile,
        emailSubject: coverLetterData.emailSubject,
        emailBody: coverLetterData.emailBody,
        cvFile: coverLetterData.cvFile,
        motivationFile: coverLetterData.motivationFile,
        savedAt: new Date().toISOString(),
      }));

      setLoadedFromStorage(true);
    }
    // Priority 2: Load from localStorage (if user comes back later)
    else {
      const savedData = localStorage.getItem("email_send_data");
      if (savedData) {
        try {
          const data = JSON.parse(savedData);

          if (data.emailSubject) {
            setSubject(data.emailSubject);
          }
          if (data.emailBody) {
            setContent(data.emailBody.replace(/\n/g, "<br>"));
          }
          if (data.cvFile) {
            setCvFile(data.cvFile);
          }
          if (data.motivationFile) {
            setMotivationLetter(data.motivationFile);
          }

          setLoadedFromStorage(true);
        } catch (e) {
          console.error("Error loading saved data:", e);
        }
      }
    }

    // Load saved template
    const savedTemplate = localStorage.getItem("email_template");
    if (savedTemplate) {
      try {
        const t = JSON.parse(savedTemplate);
        if (!fromCoverLetter) {
          setSubject(t.subject || subject);
          setContent(t.content || content);
        }
      } catch (e) {
        console.error("Error loading template:", e);
      }
    }

    // Load sent emails from extraction
    if (extractionId) {
      const sent = JSON.parse(localStorage.getItem(`sent_${extractionId}`) || "[]");
      setSentEmails(sent);
    }
  }, [searchParams, extractionId, fromCoverLetter, coverLetterData]);

  const handleGoogleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/access/google-login?code=${encodeURIComponent(user?.code || "")}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.auth_url) {
        window.location.href = data.auth_url;
      }
    } catch (e) {
      setError("Could not start Google Login.");
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/access/logout`, { method: "POST", credentials: "include" });
    window.location.reload();
  };

  const parseStatusFile = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      const emails = [];
      lines.forEach(line => {
        const cols = line.split(",");
        if (cols[1] && cols[1].includes("@")) emails.push(cols[1].trim());
      });
      setSentEmails(emails);
    };
    reader.readAsText(file);
  };

  const handleSaveTemplate = () => {
    const template = { subject, content, savedAt: new Date().toISOString() };
    localStorage.setItem("email_template", JSON.stringify(template));
    alert("Template saved!");
  };

  /* ── Send emails one by one with log ── */
  const handleSend = async () => {
    if (!googleUser?.connected) {
      setError("Please log in with Google first.");
      return;
    }
    if (companies.length === 0) {
      setError("No companies found. Please upload an Excel file with email addresses.");
      return;
    }

    setSending(true);
    setError("");
    setResults(null);
    setSendLog([]);
    setCurrentSendingIndex(0);

    try {
      const formData = new FormData();

      const payload = {
        subject,
        content: useEditor ? content : content.replace(/\n/g, "<br>"),
        companies: companies.map(c => ({
          company_name: c.company_name || c.name || "",
          email: c.email || "",
          city: c.city || "",
          field: c.field || "",
          website: c.website || "",
          phone: c.phone || "",
          job_title: c.job_title || ""
        })),
        wait_time: parseInt(waitTime),
        skip_sent: skipCompany,
        sent_companies: sentEmails
      };

      formData.append("payload", JSON.stringify(payload));

      if (cvFile) {
        if (cvFile.base64) {
          const base64Data = cvFile.base64.split(',')[1];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: cvFile.type || 'application/pdf' });
          formData.append("cv_file", blob, cvFile.name);
        } else {
          formData.append("cv_file", cvFile);
        }
      }

      if (motivationLetter) {
        if (motivationLetter.base64) {
          const base64Data = motivationLetter.base64.split(',')[1];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: motivationLetter.type || 'application/pdf' });
          formData.append("motivation_letter", blob, motivationLetter.name);
        } else {
          formData.append("motivation_letter", motivationLetter);
        }
      }

      additionalFiles.forEach((f) => formData.append("additional_files", f));

      const data = await accessApi.sendBatch(formData);

      setResults(data);

      // Build send log from results
      const log = data.results.map((r, idx) => ({
        index: idx + 1,
        company: r.company_name,
        email: r.email,
        status: r.status,
        message: r.message,
        timestamp: r.timestamp || new Date().toLocaleTimeString(),
      }));
      setSendLog(log);
      setCurrentSendingIndex(log.length);

      const newlySent = data.results.filter(r => r.status === "sent").map(r => r.email);
      const allSent = [...new Set([...sentEmails, ...newlySent])];
      if (extractionId) {
        localStorage.setItem(`sent_${extractionId}`, JSON.stringify(allSent));
      }
      setSentEmails(allSent);

    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const downloadStatus = () => {
    if (!results) return;
    const csv = [
      ["Email", "Company Name", "Status", "Message", "Timestamp"],
      ...results.results.map(r => [r.email, r.company_name, r.status, r.message, r.timestamp])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `status_${extractionId || Date.now()}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleAdditionalFile = (file) => {
    if (file) setAdditionalFiles(prev => [...prev, file]);
  };

  const removeAdditionalFile = (index) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeCvFile = () => {
    setCvFile(null);
  };

  const removeMotivationLetter = () => {
    setMotivationLetter(null);
  };

  const removeExcelFile = () => {
    setExcelFile(null);
    setCompanies([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 pb-10">

      <button
        onClick={() => navigate("/dashboard-client/my-applications")}
        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Applications
      </button>

      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Send Emails</h2>
        <span className="text-sm text-gray-500">{companies.length} Companies</span>
      </div>

      {/* ── Auto-loaded notification ── */}
      {loadedFromStorage && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <IconCheck />
          <div>
            <p className="text-sm font-bold text-blue-700">Data Loaded Automatically</p>
            <p className="text-xs text-blue-600">Your cover letter data has been loaded automatically. No need to re-enter your information!</p>
          </div>
        </div>
      )}

      {/* ── From My Applications notification ── */}
      {fromMyApplications && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <IconCheck />
          <div>
            <p className="text-sm font-bold text-green-700">Companies Loaded from Application</p>
            <p className="text-xs text-green-600">{companies.length} companies have been loaded from your application. You can send emails directly!</p>
          </div>
        </div>
      )}

      <div className={`rounded-2xl p-4 sm:p-5 border ${googleUser?.connected ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}>
        {!googleUser?.connected ? (
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <IconGoogle />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Log in with Google</p>
              <p className="text-xs text-gray-500 mt-1">
                Connect your Gmail account to send emails directly.
                <br/>Your password is <b>never</b> stored.
              </p>
            </div>
            <button
              onClick={handleGoogleLogin}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <IconGoogle />
              Log in with Google
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {googleUser.picture ? (
                <img src={googleUser.picture} alt="" className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <IconCheck />
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-gray-900">{googleUser.name || googleUser.email}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Gmail Connected
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              <IconLogout />
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* ── Excel Upload Section (only show if NOT from My Applications) ── */}
      {!fromMyApplications && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <IconExcel />
            <h3 className="text-sm font-bold text-indigo-900">Upload Email List (Excel/CSV)</h3>
          </div>
          <p className="text-xs text-indigo-600 mb-3">
            Upload a CSV or Excel file containing company emails. The file should have columns with email addresses.
          </p>
          <DropZone
            label="Upload Email List"
            sublabel="CSV or Excel file with email addresses"
            file={excelFile}
            onFile={parseExcelFile}
            accept=".csv,.xlsx,.xls"
            onRemove={excelFile ? removeExcelFile : null}
          />
        </div>
      )}

      {/* ── Companies list (show if from My Applications) ── */}
      {fromMyApplications && companies.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <IconExcel /> Companies from Application
            </h3>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{companies.length} companies</span>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1 border border-gray-100 rounded-xl">
            {companies.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs px-3 py-2 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-gray-700 truncate">{c.company_name}</span>
                </div>
                <span className="text-indigo-600 font-medium flex-shrink-0">{c.email}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DropZone label="Resume (CV)" sublabel="PDF recommended" file={cvFile} onFile={setCvFile} accept=".pdf,.doc,.docx" onRemove={cvFile ? removeCvFile : null} />
        <DropZone label="Cover Letter / Motivation" sublabel="PDF recommended" file={motivationLetter} onFile={setMotivationLetter} accept=".pdf,.doc,.docx" onRemove={motivationLetter ? removeMotivationLetter : null} />
      </div>

      <div>
        <DropZone label="Additional Attachments" sublabel="Certificates, references, etc." file={additionalFiles.length > 0 ? { name: `${additionalFiles.length} file(s)` } : null} onFile={handleAdditionalFile} />
        {additionalFiles.length > 0 && (
          <div className="mt-2 space-y-1">
            {additionalFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5 text-xs">
                <span className="text-gray-700 truncate">{f.name}</span>
                <button onClick={() => removeAdditionalFile(i)} className="text-red-500 hover:text-red-700 ml-2">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Toggle checked={useEditor} onChange={setUseEditor} />
        <span className="text-sm text-gray-700 font-medium">Use HTML Editor</span>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">Subject</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 transition" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-gray-900">Email Content</label>
          <div className="flex gap-1">
            {["{{COMPANY_NAME}}", "{{CITY}}", "{{JOB_TITLE}}", "{{FIELD}}"].map(tag => (
              <button key={tag} onClick={() => { const el = document.getElementById("email-content"); if (el) { if (useEditor) { el.focus(); document.execCommand("insertText", false, tag); } else { const start = el.selectionStart; const end = el.selectionEnd; setContent(content.substring(0, start) + tag + content.substring(end)); } } }} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded hover:bg-indigo-100 transition">{tag}</button>
            ))}
          </div>
        </div>
        {useEditor ? (
          <RichEditor value={content} onChange={setContent} />
        ) : (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50 overflow-x-auto">
              {["B", "I", "U"].map((t) => (
                <button key={t} className="w-8 h-8 rounded flex items-center justify-center text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex-shrink-0">{t}</button>
              ))}
            </div>
            <textarea id="email-content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-3 sm:px-4 py-3 text-sm text-gray-800 outline-none leading-relaxed resize-none" />
          </div>
        )}
        <p className="text-xs text-gray-400 mt-1">Placeholders will be automatically replaced.</p>
      </div>

      <div className="flex gap-2">
        <button onClick={handleSaveTemplate} className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">Save Template</button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Toggle checked={skipCompany} onChange={setSkipCompany} />
          <span className="text-sm font-bold text-gray-900">Skip already sent</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">Upload a status file to skip companies that have already received an email.</p>
        <DropZone label="Status File" sublabel="CSV/Excel with sent emails" file={statusFile} onFile={(f) => { setStatusFile(f); parseStatusFile(f); }} accept=".csv,.xlsx,.xls" />
        {sentEmails.length > 0 && (
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1"><IconCheck /> {sentEmails.length} email(s) will be skipped</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">Wait time between emails</label>
          <p className="text-xs text-gray-400 mb-2">Avoids spam filters. Default: 30-120 seconds.</p>
          <div className="relative">
            <select value={waitTime} onChange={(e) => setWaitTime(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer">
              {["10", "30", "60", "90", "120"].map((v) => <option key={v} value={v}>{v} sec.</option>)}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 5l4-4 4 4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Preview</label>
          <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 text-xs text-gray-600 space-y-1">
            <p><b>From:</b> {googleUser?.email || "Not connected"}</p>
            <p><b>To:</b> {companies[0]?.company_name || "Company"} &lt;{companies[0]?.email || "email@example.com"}&gt;</p>
            <p><b>Subject:</b> {subject}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <IconAlert />
          <div><p className="text-sm font-bold text-red-700">Error</p><p className="text-xs text-red-600">{error}</p></div>
        </div>
      )}

      {/* ── Email Send Log (Live console for user experience) ── */}
      {(sending || sendLog.length > 0) && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <IconLog />
            <h3 className="text-sm font-bold text-white">Email Send Log</h3>
            {sending && (
              <span className="flex items-center gap-1 text-xs text-green-400">
                <IconSpinner /> Sending...
              </span>
            )}
          </div>
          <div className="bg-black rounded-xl p-3 font-mono text-xs max-h-64 overflow-y-auto space-y-1">
            {sendLog.length === 0 && sending && (
              <p className="text-gray-500">Initializing send process...</p>
            )}
            {sendLog.map((log, i) => (
              <div key={i} className={`flex items-center gap-2 ${
                log.status === "sent" ? "text-green-400" : 
                log.status === "skipped" ? "text-yellow-400" : 
                log.status === "error" ? "text-red-400" : "text-gray-400"
              }`}>
                <span className="text-gray-600 flex-shrink-0">[{log.timestamp}]</span>
                <span className="flex-shrink-0">
                  {log.status === "sent" ? "✓" : log.status === "skipped" ? "⊘" : log.status === "error" ? "✗" : "•"}
                </span>
                <span className="truncate">
                  #{log.index} {log.company} ({log.email}) — {log.status.toUpperCase()}
                  {log.message && `: ${log.message}`}
                </span>
              </div>
            ))}
            {sending && currentSendingIndex < companies.length && (
              <p className="text-blue-400 animate-pulse">
                • Sending to {companies[currentSendingIndex]?.company_name || "next company"}...
              </p>
            )}
            {!sending && sendLog.length > 0 && (
              <p className="text-green-400 font-bold mt-2">--- Send process completed ---</p>
            )}
          </div>
          <div className="mt-3 flex gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Sent</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Skipped</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Error</span>
          </div>
        </div>
      )}

      {results && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Results</h3>
            <div className="flex gap-2">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{results.sent} sent</span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{results.skipped} skipped</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">{results.failed} failed</span>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {results.results.map((r, i) => (
              <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${r.status === "sent" ? "bg-green-50" : r.status === "skipped" ? "bg-yellow-50" : "bg-red-50"}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${r.status === "sent" ? "bg-green-500" : r.status === "skipped" ? "bg-yellow-500" : "bg-red-500"}`} />
                  <span className="truncate text-gray-700">{r.company_name}</span>
                </div>
                <span className={`flex-shrink-0 font-medium ${r.status === "sent" ? "text-green-700" : r.status === "skipped" ? "text-yellow-700" : "text-red-700"}`}>
                  {r.status === "sent" ? "Sent" : r.status === "skipped" ? "Skipped" : "Error"}
                </span>
              </div>
            ))}
          </div>
          <button onClick={downloadStatus} className="mt-3 w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors">Download Status File</button>
        </div>
      )}

      <div className="pb-4">
        <button
          onClick={handleSend}
          disabled={sending || companies.length === 0 || !googleUser?.connected}
          className="w-full sm:w-auto bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl transition-colors"
        >
          {sending ? (
            <span className="flex items-center justify-center gap-2"><IconSpinner /> Sending Emails... ({currentSendingIndex}/{companies.length})</span>
          ) : !googleUser?.connected ? (
            "Log in with Google to Send"
          ) : companies.length === 0 ? (
            "Upload Email List First"
          ) : (
            <span className="flex items-center gap-2"><IconSend /> Send Emails ({companies.length})</span>
          )}
        </button>
      </div>
    </div>
  );
}