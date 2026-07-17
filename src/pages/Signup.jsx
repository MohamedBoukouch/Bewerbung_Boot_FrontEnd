
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bewerbung-boot-backend.onrender.com/api";

const PACKS = [
  { id: 'test', name: 'باقة تجريبية', desc: 'مجاناً · 24 ساعة', price: 0 },
  { id: 'standard', name: 'ستاندار', desc: '200 درهم / الشهر', price: 200 },
  { id: '3mois', name: 'باقة 3 أشهر', desc: '450 درهم / 3 أشهر', price: 450 },
  { id: '6mois', name: 'باقة 6 أشهر', desc: '720 درهم / 6 أشهر', price: 720 },
];

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [selectedPack, setSelectedPack] = useState('test');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!formData.fullName.trim()) next.fullName = 'الرجاء إدخال الاسم الكامل.';
    if (!formData.email.trim()) {
      next.email = 'الرجاء إدخال البريد الإلكتروني.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = 'صيغة البريد الإلكتروني غير صحيحة.';
    }
    const digits = formData.phone.replace(/[^0-9]/g, '');
    if (!digits) {
      next.phone = 'الرجاء إدخال رقم الهاتف.';
    } else if (digits.length !== 10) {
      next.phone = 'رقم الهاتف لازم يكون فيه 10 أرقام بالضبط.';
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const selected = PACKS.find((p) => p.id === selectedPack);
      const res = await fetch(`${API_BASE}/access/leads/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pack: selected.name,
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          whatsapp: formData.phone.trim(),
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (parseErr) {
        // ignore parse error, rely on status below
      }

      if (!res.ok) {
        throw new Error(data.detail || 'حدث خطأ، حاول مرة أخرى.');
      }

      setSuccess(true);
    } catch (err) {
      setErrors({ form: err.message || 'حدث خطأ، حاول مرة أخرى.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center px-4 py-12 font-['Cairo',sans-serif] relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-[480px] md:max-w-[520px] bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10 lg:p-12">
        {/* User icon */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
          إنشاء حساب
        </h1>
        <p className="text-gray-500 text-sm md:text-base font-normal text-center mb-6 md:mb-8">
          سجّل بياناتك واختار الباقة اللي بغيتيها.
        </p>

        {/* Success banner */}
        {success && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <p className="text-sm font-bold">تم تسجيل طلبك بنجاح !</p>
              <p className="text-xs mt-0.5">غادي نتواصلو معاك على الواتساب باش نفعّلو الباقة ديالك.</p>
            </div>
          </div>
        )}

        {/* General form error */}
        {errors.form && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p className="text-sm font-medium">{errors.form}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
          {/* Full name */}
          <div>
            <label className="block text-gray-600 text-sm font-normal mb-2 text-right">
              الاسم الكامل
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="مثال: محمد العلمي"
              className={`w-full h-12 md:h-14 px-4 rounded-xl border bg-white text-gray-900 text-sm font-normal text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-indigo-300 focus:ring-indigo-100'
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1 text-right">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm font-normal mb-2 text-right">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`w-full h-12 md:h-14 px-4 pl-12 rounded-xl border bg-white text-gray-900 text-sm font-normal text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-indigo-300 focus:ring-indigo-100'
                }`}
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 text-right">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-600 text-sm font-normal mb-2 text-right">
              رقم الهاتف (واتساب)
            </label>
            <div className="relative">
              <input
                type="tel"
                inputMode="numeric"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                  handleChange({ target: { name: 'phone', value: onlyDigits } });
                }}
                placeholder="06XXXXXXXX"
                className={`w-full h-12 md:h-14 px-4 pl-12 rounded-xl border bg-white text-gray-900 text-sm font-normal text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-indigo-300 focus:ring-indigo-100'
                }`}
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {formData.phone.replace(/[^0-9]/g, '').length}/10
              </span>
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1 text-right">{errors.phone}</p>}
          </div>

          {/* Pack selection */}
          <div>
            <label className="block text-gray-600 text-sm font-normal mb-2 text-right">
              اختر الباقة
            </label>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {PACKS.map((pack) => {
                const active = selectedPack === pack.id;
                return (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => setSelectedPack(pack.id)}
                    className={`flex flex-col items-start text-right rounded-xl border px-3 py-3 transition-all ${
                      active
                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100'
                        : 'border-gray-200 bg-white hover:border-indigo-200'
                    }`}
                  >
                    <span className={`text-sm font-bold ${active ? 'text-indigo-700' : 'text-gray-800'}`}>
                      {pack.name}
                    </span>
                    <span className="text-[11px] md:text-xs text-gray-500 mt-0.5">
                      {pack.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 md:h-14 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base md:text-lg rounded-xl transition-colors shadow-lg shadow-indigo-200/50 mt-2 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                </svg>
                جارٍ الإرسال...
              </>
            ) : (
              'إنشاء حساب'
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-500 text-sm font-normal mt-6 md:mt-8">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-indigo-500 hover:text-indigo-600 font-bold transition-colors">
            تسجيل الدخول
          </Link>
        </p>
      </div>

      {/* Back to home */}
      <Link
        to="/"
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-normal mt-6 md:mt-8 transition-colors"
      >
        <span>العودة إلى الصفحة الرئيسية</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </div>
  );
};

export default Signup;