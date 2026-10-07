import React from 'react';
import { Language } from '../types/travel';
import { translations } from '../data/translations';
import { Bookmark, Compass, Wallet } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  savedCount: number;
  onOpenWishlist: () => void;
  onOpenCalculator: () => void;
  onOpenBudgetCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  savedCount,
  onOpenWishlist,
  onOpenCalculator,
  onOpenBudgetCalculator,
}) => {
  const t = translations[currentLang];

  const languages: { code: Language; label: string }[] = [
    { code: 'lo', label: 'ລາວ' },
    { code: 'th', label: 'ไทย' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 group-hover:scale-125 transition-transform"></span>
          <span>{t.siteTitle}</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <a href="#provinces-section" className="hover:text-emerald-700 transition-colors">
            {t.all18Provinces}
          </a>
          <a href="#interactive-map" className="hover:text-emerald-700 transition-colors">
            {t.mapView}
          </a>
          <button
            onClick={onOpenCalculator}
            className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>{t.calculatorTitle.split(' ')[0]}</span>
          </button>
          <button
            onClick={onOpenBudgetCalculator}
            className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer text-emerald-800 font-semibold"
          >
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span>{t.budgetCalcTitle.split(' ')[0]}</span>
          </button>
          <a href="#travel-tips" className="hover:text-emerald-700 transition-colors">
            {t.travelTipsTitle}
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions (Language Selector + Saved Wishlist) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Segmented language selector */}
          <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang.code)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  currentLang === lang.code
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Saved wishlist button */}
          <button
            onClick={onOpenWishlist}
            className="relative px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title={t.myTripPlan}
          >
            <Bookmark className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">{t.myTripPlan}</span>
            {savedCount > 0 && (
              <span className="bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
