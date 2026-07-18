import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">

          {/* ========== LEFT: Contact ========== */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-gray-900 font-normal text-sm md:text-base">تواصل معنا</h3>
            <a
              href="https://wa.me/2120659159044"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-gray-400 hover:text-green-500"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23m-4.52 4.7c-.16 0-.43.06-.66.31s-.87.85-.87 2.07.89 2.4 1.02 2.57c.12.16 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28-.26-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.13-.16.26-.65.81-.79.98-.15.16-.29.18-.55.06-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.28-1.51-1.43-1.77-.15-.26-.02-.4.11-.53.11-.11.26-.29.38-.44.13-.14.17-.25.26-.41.08-.16.04-.31-.02-.44-.06-.13-.56-1.36-.78-1.86-.2-.48-.41-.42-.56-.43z"/>
              </svg>
            </a>
          </div>

          {/* ========== CENTER: Links ========== */}
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <h3 className="text-gray-900 font-normal text-sm md:text-base">المنتج</h3>
            <a href="/billing" className="text-gray-400 hover:text-gray-600 text-xs md:text-sm font-normal transition-colors">
              الأسعار
            </a>
          </div>

          {/* ========== RIGHT: Brand ========== */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-normal text-sm md:text-base">Bewerbung Boot</span>
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <span className="text-white font-normal text-xs md:text-sm">B</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs md:text-sm font-normal max-w-[280px] md:max-w-[320px] leading-relaxed">
              المنصة الأولى فالمغرب باش تلقى شركات ألمانيا وتبعت ليهم الإيميلات أوتوماتيكياً.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}