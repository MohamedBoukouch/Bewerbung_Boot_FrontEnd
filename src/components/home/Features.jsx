import React from 'react';

const Features = () => {
  const features = [
    {
      text: 'تسجيل الإيميل ديالك مرة وحدة للـ Ausbildung',
    },
    {
      text: 'كتابة Anschreiben + CV بالذكاء الاصطناعي',
    },
    {
      text: 'إرسال أوتوماتيكي لشركات ألمانيا مع تتبع',
    },
  ];

  return (
    <section className="relative w-full bg-gray-50/50 py-16 md:py-20 lg:py-24 overflow-hidden font-['Cairo',sans-serif]">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">

          {/* Section label */}
          <div className="flex items-center gap-2 text-indigo-500 text-sm md:text-base font-normal mb-4 md:mb-5">
            <span>الإيميل الأوتوماتيكي للـ Ausbildung</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v16H4z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 leading-[1.2] md:leading-[1.15] mb-5 md:mb-6">
            سجّل الإيميل،<br />
            ونحن نبعتوه للشركات.
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm md:text-base lg:text-lg font-normal leading-[1.8] md:leading-[1.9] mb-8 md:mb-10">
            كتسجل برك الإيميل ديالك و المعطيات ديالك للـ Ausbildung، والمنصة كاتكتب رسالة التقديم (Anschreiben) والـ CV بالألمانية بالذكاء الاصطناعي، وكتبعتهم أوتوماتيكياً لآلاف الشركات فألمانيا اللي كيقبلو فـ Ausbildung. وكترجع لك تقرير كامل شحال شركة وصلها الإيمال.
          </p>

          {/* Feature list */}
          <div className="flex flex-col gap-3 md:gap-4 w-full max-w-[480px]">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 md:gap-4 justify-center"
              >
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-600 text-sm md:text-base font-normal leading-relaxed">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;