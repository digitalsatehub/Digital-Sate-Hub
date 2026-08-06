import React from 'react';

export const PARTNER_LOGOS = [
  {
    name: 'Logo 1',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785974810/Logo_1_exy8ke.png'
  },
  {
    name: 'Platform Logo 1',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840462/idZCBxuvGS_logos_isadia.png'
  },
  {
    name: 'Symbol',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840462/Symbol_eg2wio.png'
  },
  {
    name: 'Platform Logo 2',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840461/idjUiyP0m6_logos_fi3uwa.png'
  },
  {
    name: 'Kajabi Logo',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840461/Kajabi_Logo_1_glnwkf.png'
  },
  {
    name: 'Platform Logo 3',
    url: 'https://res.cloudinary.com/ug0d8nwi/image/upload/v1785840461/idnUrjuiFj_logos_voy01x.png'
  }
];

export const SocialProofCounters: React.FC = () => {
  // Repeat logos set 4 times for a seamless, continuous infinite loop
  const marqueeLogos = [
    ...PARTNER_LOGOS,
    ...PARTNER_LOGOS,
    ...PARTNER_LOGOS,
    ...PARTNER_LOGOS
  ];

  return (
    <section className="bg-white text-slate-900 border-y border-slate-200/80 py-3 sm:py-4 relative overflow-hidden shadow-sm">
      <div className="w-full">
        {/* Continuous Flow Logo Marquee - Full section width directly on white background */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Gradient Edge Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Marquee Motion Track */}
          <div className="animate-marquee flex items-center gap-12 sm:gap-20">
            {marqueeLogos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="h-14 sm:h-16 w-36 sm:w-48 px-2 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-h-10 sm:max-h-12 max-w-[140px] sm:max-w-[170px] w-auto h-auto object-contain transition-all duration-300 filter hover:brightness-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


