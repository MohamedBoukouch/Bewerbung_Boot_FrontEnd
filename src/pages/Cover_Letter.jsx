import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

/* ── Icons ── */
const IconSave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconUpload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
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

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const IconPen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
  </svg>
);

/* ── General Letter Templates (NO company-specific placeholders) ── */
const TEMPLATES = {
  ausbildung: {
    subject: "Bewerbung um einen Ausbildungsplatz",
    body: `Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihr Stellenangebot für einen Ausbildungsplatz entdeckt und bewerbe mich hiermit um einen Platz in Ihrem Unternehmen.

Ich bin eine zuverlässige und motivierte Person, die sich durch folgende Eigenschaften auszeichnet:
• Pünktlichkeit und Zuverlässigkeit
• Teamfähigkeit und gute Kommunikationsskills
• Hohe Lernbereitschaft und Engagement
• {{USER_SKILL}}

Ich möchte meine berufliche Laufbahn bei Ihnen beginnen und einen positiven Beitrag zu Ihrem Team leisten. Ich bin überzeugt, dass meine Begeisterung und mein Engagement mich zu einer wertvollen Unterstützung machen.

Ich wäre Ihnen sehr dankbar für die Möglichkeit, mich in einem persönlichen Gespräch näher vorzustellen.

Vielen Dank für Ihre Zeit und Ihre Überlegung meiner Bewerbung. Ich freue mich auf Ihre Rückmeldung.

Mit freundlichen Grüßen,

{{USER_NAME}}
{{USER_EMAIL}}
{{USER_PHONE}}
{{USER_ADDRESS}}`,
  },
  praktikum: {
    subject: "Bewerbung um ein Praktikum",
    body: `Sehr geehrte Damen und Herren,

hiermit bewerbe ich mich um einen Praktikumsplatz in Ihrem Unternehmen. Als {{USER_STATUS}} suche ich aktiv nach Möglichkeiten, praktische Erfahrungen zu sammeln und meine beruflichen Fähigkeiten weiterzuentwickeln.

Ihr Unternehmen hat mein Interesse geweckt, da es für hervorragende Qualität und Innovation steht. Die Aussicht, von erfahrenen Fachkräften in einem dynamischen Umfeld zu lernen, begeistert mich besonders.

Meine relevanten Fähigkeiten und Kenntnisse umfassen:
• {{USER_SKILL}}
• Grundkenntnisse in relevanten technischen Bereichen
• Sehr gute Kommunikationsfähigkeiten in Deutsch und anderen Sprachen
• Schnelle Auffassungsgabe und hohe Anpassungsfähigkeit

Ich bin flexibel, hochmotiviert und bereit, mich neuen Herausforderungen zu stellen. Ich würde die Möglichkeit schätzen, mein Team zu unterstützen und gleichzeitig wertvolle praktische Erfahrungen zu sammeln.

Vielen Dank für Ihre Zeit und Ihre Überlegung meiner Bewerbung. Ich hoffe, bald von Ihnen zu hören.

Mit freundlichen Grüßen,

{{USER_NAME}}
{{USER_EMAIL}}
{{USER_PHONE}}
{{USER_ADDRESS}}`,
  },
  werkstudent: {
    subject: "Bewerbung um eine Werkstudentenstelle",
    body: `Sehr geehrte Damen und Herren,

hiermit bewerbe ich mich um eine Werkstudentenstelle in Ihrem Unternehmen. Als {{USER_STATUS}} suche ich nach einer Möglichkeit, mein akademisches Studium mit praktischer Berufserfahrung zu verbinden.

Ich bin von Ihrem Unternehmen begeistert, da es für innovative Ansätze und starke Präsenz in der Branche steht. Ich bin überzeugt, dass die Arbeit in Ihrem Team mir unschätzbare Einblicke und Fähigkeiten vermitteln würde.

Meine Qualifikationen umfassen:
• {{USER_SKILL}}
• Starke analytische Fähigkeiten und Problemlösungskompetenz
• Ausgezeichnetes Zeitmanagement und Organisationstalent
• Teamorientierte Denkweise mit hoher Eigeninitiative

Ich stehe für etwa 20 Stunden pro Woche zur Verfügung und bin flexibel in der Gestaltung meiner Arbeitszeiten, um Studium und Beruf optimal zu vereinbaren.

Ich würde mich freuen, mich mit Ihnen darüber auszutauschen, wie ich zu Ihrem Team beitragen kann. Vielen Dank für Ihre Zeit und Aufmerksamkeit.

Mit freundlichen Grüßen,

{{USER_NAME}}
{{USER_EMAIL}}
{{USER_PHONE}}
{{USER_ADDRESS}}`,
  },
  vollzeit: {
    subject: "Bewerbung um eine Vollzeitstelle",
    body: `Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihr Stellenangebot für eine Vollzeitstelle entdeckt und bewerbe mich hiermit um eine Position in Ihrem Unternehmen. Mit meinem Hintergrund und meiner Leidenschaft für berufliche Weiterentwicklung bin ich überzeugt, eine starke Bereicherung für Ihr Team zu sein.

Im Verlauf meiner beruflichen Laufbahn habe ich eine solide Grundlage an Fähigkeiten und Erfahrungen entwickelt:
• {{USER_SKILL}}
• Projekterfahrung in verschiedenen beruflichen Umfeldern
• Selbstständige und motivierte Arbeitsweise
• Führungs- und Teamkoordinationsfähigkeiten

Ich bin besonders beeindruckt von dem Engagement Ihres Unternehmens für Exzellenz und würde mich freuen, zu Ihrem weiteren Erfolg beizutragen. Ich bin bereit, meine Expertise, mein Engagement und meine frischen Perspektiven in Ihre Organisation einzubringen.

Ich würde die Gelegenheit schätzen, meine Bewerbung weiter zu erläutern und zu zeigen, wie ich einen Mehrwert für Ihr Team schaffen kann.

Vielen Dank für Ihre Zeit und Überlegung meiner Bewerbung. Ich freue mich auf die Möglichkeit, mit Ihnen zusammenzuarbeiten.

Mit freundlichen Grüßen,

{{USER_NAME}}
{{USER_EMAIL}}
{{USER_PHONE}}
{{USER_ADDRESS}}`,
  },
};

/* ── Helper: Convert file to base64 ── */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/* ── Drop Zone Component ── */
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
        className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-6 cursor-pointer transition-colors ${drag ? "border-indigo-400 bg-indigo-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
      >
        <input ref={ref} type="file" className="hidden" accept={accept} onChange={(e) => { if (e.target.files[0]) onFile(e.target.files[0]); }} />
        <IconUpload />
        <p className="mt-2 text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
      </div>
      {file && (
        <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2">
          <div className="flex items-center gap-2 min-w-0">
            <IconFile />
            <span className="text-sm text-indigo-700 font-medium truncate">{file.name || file.fileName || "File uploaded"}</span>
          </div>
          <button onClick={onRemove} className="text-red-500 hover:text-red-700 p-1">
            <IconTrash />
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function Cover_Letter() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState([]);

  /* ── User Profile Data ── */
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    status: "Student",
    skill: "",
  });

  /* ── Email Body & Subject ── */
  const [letterType, setLetterType] = useState("ausbildung");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  /* ── CV File ── */
  const [cvFile, setCvFile] = useState(null);
  const [motivationFile, setMotivationFile] = useState(null);

  /* ── Load saved data on mount ── */
  useEffect(() => {
    const savedData = localStorage.getItem("bewerber_profile");
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setProfile(data.profile || profile);
        setLetterType(data.letterType || "ausbildung");
        setEmailSubject(data.emailSubject || "");
        setEmailBody(data.emailBody || "");
        setCvFile(data.cvFile || null);
        setMotivationFile(data.motivationFile || null);
      } catch (e) {
        console.error("Error loading profile:", e);
      }
    }

    const history = localStorage.getItem("bewerber_profile_history");
    if (history) {
      try {
        setSavedProfiles(JSON.parse(history));
      } catch (e) {
        setSavedProfiles([]);
      }
    }
  }, []);

  /* ── Auto-generate letter ── */
  const generateLetter = () => {
    const template = TEMPLATES[letterType];
    if (!template) return;

    const replaceVars = (text) => {
      return text
        .replace(/{{USER_NAME}}/g, profile.fullName || "[Your Name]")
        .replace(/{{USER_EMAIL}}/g, profile.email || "[Your Email]")
        .replace(/{{USER_PHONE}}/g, profile.phone || "[Your Phone Number]")
        .replace(/{{USER_ADDRESS}}/g, profile.address || "[Your Address]")
        .replace(/{{USER_STATUS}}/g, profile.status || "[Your Status]")
        .replace(/{{USER_SKILL}}/g, profile.skill || "[Your Skills]");
    };

    setEmailSubject(replaceVars(template.subject));
    setEmailBody(replaceVars(template.body));
    setSaved(false);
  };

  /* ── Handle CV Upload ── */
  const handleCvUpload = async (file) => {
    try {
      const base64 = await fileToBase64(file);
      setCvFile({
        name: file.name,
        type: file.type,
        size: file.size,
        base64: base64,
        uploadedAt: new Date().toISOString(),
      });
      setSaved(false);
    } catch (e) {
        alert("Fehler beim Hochladen des Lebenslaufs");
    }
  };

  /* ── Generate Motivation Letter as a REAL PDF ── */
  const generateMotivationPDF = () => {
    if (!emailBody) {
      alert("Bitte generieren Sie zuerst das Anschreiben");
      return;
    }

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 56;
    const maxLineWidth = pageWidth - marginX * 2;
    const lineHeight = 16;
    const bottomMargin = 56;

    let cursorY = 56;

    // Subject as title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    const titleLines = doc.splitTextToSize(emailSubject, maxLineWidth);
    titleLines.forEach((line) => {
      doc.text(line, marginX, cursorY);
      cursorY += lineHeight;
    });
    cursorY += 8;
    doc.setDrawColor(200);
    doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
    cursorY += lineHeight + 6;

    // Body
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const paragraphs = emailBody.split(/\n/);
    paragraphs.forEach((para) => {
      const lines = doc.splitTextToSize(para || " ", maxLineWidth);
      lines.forEach((line) => {
        if (cursorY > pageHeight - bottomMargin) {
          doc.addPage();
          cursorY = 56;
        }
        doc.text(line, marginX, cursorY);
        cursorY += lineHeight;
      });
      cursorY += lineHeight;
    });

    // Footer
    if (cursorY > pageHeight - bottomMargin) {
      doc.addPage();
      cursorY = 56;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(
      `Generated by Bewerbung-Boot on ${new Date().toLocaleString("en-US")}`,
      marginX,
      pageHeight - 30
    );
    doc.setTextColor(0);

    // Convert to base64 data URL
    const pdfDataUrl = doc.output("dataurlstring");
    const fileName = `CoverLetter_${new Date().toISOString().split("T")[0]}.pdf`;

    setMotivationFile({
      name: fileName,
      type: "application/pdf",
      base64: pdfDataUrl,
      generatedAt: new Date().toISOString(),
      subject: emailSubject,
      body: emailBody,
    });

    setSaved(false);
    alert("Anschreiben als PDF generiert!");
  };

  /* ── Save ALL to localStorage ── */
  const handleSave = () => {
    const data = {
      profile,
      letterType,
      emailSubject,
      emailBody,
      cvFile,
      motivationFile,
      savedAt: new Date().toLocaleString("en-US"),
      id: crypto.randomUUID(),
    };

    localStorage.setItem("bewerber_profile", JSON.stringify(data));

    // Save to email_send_data for the send email page
    localStorage.setItem("email_send_data", JSON.stringify({
      profile,
      emailSubject,
      emailBody,
      cvFile,
      motivationFile,
      savedAt: new Date().toISOString(),
    }));

    const history = JSON.parse(localStorage.getItem("bewerber_profile_history") || "[]");
    history.unshift(data);
    localStorage.setItem("bewerber_profile_history", JSON.stringify(history.slice(0, 20)));

    setSavedProfiles(history.slice(0, 20));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  /* ── Load saved profile ── */
  const loadProfile = (p) => {
    setProfile(p.profile);
    setLetterType(p.letterType);
    setEmailSubject(p.emailSubject);
    setEmailBody(p.emailBody);
    setCvFile(p.cvFile);
    setMotivationFile(p.motivationFile);
  };

  /* ── Delete profile ── */
  const deleteProfile = (id, e) => {
    e.stopPropagation();
    const history = JSON.parse(localStorage.getItem("bewerber_profile_history") || "[]");
    const filtered = history.filter((p) => p.id !== id);
    localStorage.setItem("bewerber_profile_history", JSON.stringify(filtered));
    setSavedProfiles(filtered);
  };

  /* ── Navigate to Send Email with data ── */
  const goToSendEmail = () => {
    if (!emailBody || !emailSubject) {
      alert("Please generate your cover letter first");
      return;
    }

    handleSave();

    navigate("/dashboard-client/emails-senden", {
      state: {
        fromCoverLetter: true,
        coverLetterData: {
          profile,
          emailSubject,
          emailBody,
          cvFile,
          motivationFile,
        },
      },
    });
  };

  /* ── Download motivation letter as a real PDF file ── */
  const downloadMotivation = () => {
    if (!motivationFile) {
      alert("Bitte generieren Sie zuerst das Anschreiben");
      return;
    }

    const link = document.createElement("a");
    link.href = motivationFile.base64;
    link.download = motivationFile.name || `CoverLetter_${new Date().toISOString().split("T")[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ── Preview Modal ── */
  const PreviewModal = () => {
    if (!showPreview) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <IconEye /> Vorschau
            </h3>
            <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600 p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div className="p-6 overflow-y-auto">
            <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm space-y-4">
              <div className="border-b border-gray-100 pb-3">
                 <p className="text-xs text-gray-400 uppercase tracking-wide">Betreff</p>
                <p className="text-sm font-bold text-gray-900">{emailSubject || "Kein Betreff"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">E-Mail Text</p>
                <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-mono bg-gray-50 p-4 rounded-lg">
                  {emailBody || "Noch kein Inhalt generiert..."}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">CV File</p>
                     <p className="text-sm text-gray-700">{cvFile ? cvFile.name : "Kein Lebenslauf hochgeladen"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Cover Letter</p>
                     <p className="text-sm text-gray-700">{motivationFile ? motivationFile.name : "Noch nicht generiert"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
            <button onClick={() => setShowPreview(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">Schließen</button>
            <button onClick={() => { handleSave(); setShowPreview(false); }} className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
              <IconSave /> Speichern
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Anschreiben & Lebenslauf
        </h1>
        {saved && (
          <span className="flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-full">
            <IconCheck /> Saved!
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ═════ LEFT COLUMN ═════ */}
        <div className="space-y-5">

          {/* ── User Profile ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <IconUser />
              <h2 className="text-base font-bold text-gray-900">Deine Informationen</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Vollständiger Name *</label>
                <input type="text" value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} placeholder="Max Mustermann" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">E-Mail *</label>
                <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} placeholder="max@example.com" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Telefonnummer</label>
                <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} placeholder="+49 123 456 789" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Adresse</label>
                <input type="text" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} placeholder="Musterstraße 1, 12345 Berlin" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                <select value={profile.status} onChange={(e) => setProfile({...profile, status: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                  <option>Student</option>
                  <option>Absolvent</option>
                  <option>Berufstätig</option>
                  <option>Auszubildender</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Besondere Fähigkeit</label>
                <input type="text" value={profile.skill} onChange={(e) => setProfile({...profile, skill: e.target.value})} placeholder="z. B. Programmierung" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
            </div>
          </div>

          {/* ── CV Upload ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <IconFile /> Lebenslauf (CV)
            </h2>
            <DropZone
              label="Lebenslauf hochladen"
              sublabel="PDF, DOC, DOCX (max 5MB)"
              file={cvFile}
              onFile={handleCvUpload}
              accept=".pdf,.doc,.docx"
              onRemove={() => setCvFile(null)}
            />
            {cvFile && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <IconCheck /> CV saved ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

        </div>

        {/* ═════ RIGHT COLUMN ═════ */}
        <div className="space-y-5">

          {/* ── Letter Type & Generate ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <IconPen /> E-Mail & Anschreiben
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Bewerbungstyp</label>
                <select value={letterType} onChange={(e) => setLetterType(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                  <option value="ausbildung">Ausbildung</option>
                  <option value="praktikum">Praktikum</option>
                  <option value="werkstudent">Werkstudent</option>
                  <option value="vollzeit">Vollzeit</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={generateLetter}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <IconSparkle /> Automatisch generieren
                </button>
              </div>
            </div>

            {/* E-Mail Betreff */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-700 mb-1">E-Mail Betreff</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Bewerbung um eine Stelle..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 font-medium"
              />
            </div>

            {/* E-Mail Text / Anschreiben */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1">E-Mail Text / Anschreiben</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Ihr Anschreiben erscheint hier..."
                rows={14}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 resize-none leading-relaxed font-mono"
              />
            </div>

            {/* Generate PDF Button */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={generateMotivationPDF}
                disabled={!emailBody}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold px-4 py-2 rounded-xl transition"
              >
                <IconFile /> Anschreiben als PDF
              </button>
              {motivationFile && (
                <button
                  onClick={downloadMotivation}
                  className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold px-4 py-2 rounded-xl transition"
                >
                  <IconDownload /> Herunterladen
                </button>
              )}
            </div>

            {motivationFile && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                <p className="text-xs text-green-700 flex items-center gap-2">
                   <IconCheck /> Anschreiben-PDF bereit: <span className="font-medium">{motivationFile.name}</span>
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button onClick={handleSave} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition">
                <IconSave /> Alles speichern
              </button>
              <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold px-5 py-2.5 rounded-xl transition">
                <IconEye /> Vorschau
              </button>
              <button
                onClick={goToSendEmail}
                disabled={!emailBody}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold px-5 py-2.5 rounded-xl transition"
              >
                <IconSend /> Zu E-Mail senden
              </button>
            </div>
          </div>

          {/* ── Saved Profiles History ── */}
          {savedProfiles.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-3">Gespeicherte Profile</h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {savedProfiles.map((p, i) => (
                  <div
                    key={p.id || i}
                    onClick={() => loadProfile(p)}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 cursor-pointer transition group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {p.profile?.fullName || "Unnamed"} - {p.letterType || "No Type"}
                      </p>
                      <p className="text-xs text-gray-400">{p.savedAt}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{p.letterType}</span>
                      {p.cvFile && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">CV</span>}
                      <button onClick={(e) => deleteProfile(p.id, e)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100">
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <PreviewModal />
    </div>
  );
}