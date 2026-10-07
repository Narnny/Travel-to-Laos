import React from 'react';
import { Language } from '../types/travel';
import { translations } from '../data/translations';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';
import { Search, Compass, MapPin, Wallet, Sparkles } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSubmitSearch?: () => void;
  onOpenCalculator: () => void;
  onOpenBudgetCalculator: () => void;
  onSelectRegion: (region: 'all' | 'north' | 'central' | 'south') => void;
  selectedRegion: string;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  searchQuery,
  onSearchChange,
  onSubmitSearch,
  onOpenCalculator,
  onOpenBudgetCalculator,
  onSelectRegion,
}) => {
  const t = translations[currentLang];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onSubmitSearch) {
      onSubmitSearch();
    }
    const section = document.getElementById('provinces-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickSearchTags =
    currentLang === 'lo'
      ? ['ຫຼວງພະບາງ', 'ວັງວຽງ', 'ວຽງຈັນ', 'ຈຳປາສັກ', 'ຕາດກວາງຊີ', 'ສີ່ພັນດອນ']
      : currentLang === 'th'
      ? ['หลวงพระบาง', 'วังเวียง', 'เวียงจันทน์', 'จำปาสัก', 'น้ำตกตาดกวางสี', 'สี่พันดอน']
      : ['Luang Prabang', 'Vang Vieng', 'Vientiane', 'Champasak', 'Kuang Si Falls', 'Si Phan Don'];

  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white">
      {/* Background imagery with overlay scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={resolveImageUrl('/images/hero_laos_luang_prabang_1791277520221.jpg')}
          alt="Kuang Si Falls, Luang Prabang, Laos"
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-900/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl space-y-6">
          {/* Subtle location kicker */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-medium">
            <MapPin className="w-4 h-4" />
            <span>ສປປ ລາວ · LAO PDR · 18 PROVINCES</span>
            <span aria-hidden="true">·</span>
            <span>{t.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
            {t.heroSubheadline}
          </p>

          {/* Interactive Search Bar Form */}
          <div className="pt-2 space-y-2.5">
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-2xl bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/20 shadow-xl flex items-center focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/30 transition-all"
            >
              <Search className="w-5 h-5 text-neutral-300 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-neutral-300 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-white/10 rounded-md mr-1 cursor-pointer transition-colors"
                  title={t.clearSearch}
                >
                  ✕
                </button>
              )}
              {/* Dedicated Search Button */}
              <button
                type="submit"
                onClick={handleSearchSubmit}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shrink-0 ml-1"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.searchBtn || (currentLang === 'lo' ? 'ຄົ້ນຫາ' : currentLang === 'th' ? 'ค้นหา' : 'Search')}</span>
              </button>
            </form>

            {/* Quick popular search tags */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs text-neutral-300 pt-1">
              <span className="text-neutral-400 text-[11px] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>{currentLang === 'lo' ? 'ຄົ້ນຫາຍອດນິຍົມ:' : currentLang === 'th' ? 'คำค้นหายอดนิยม:' : 'Popular:'}</span>
              </span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    onSearchChange(tag);
                    if (onSubmitSearch) onSubmitSearch();
                    const section = document.getElementById('provinces-section');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white text-[11px] transition-colors cursor-pointer border border-white/10"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#provinces-section"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-md transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.exploreNow}
            </a>
            <button
              onClick={onOpenCalculator}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>{t.planRouteBtn}</span>
            </button>
            <button
              onClick={onOpenBudgetCalculator}
              className="px-4 py-2.5 bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/30 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Wallet className="w-4 h-4 text-emerald-200" />
              <span>{t.budgetCalcTitle.split(' ')[0]}</span>
            </button>
          </div>

          {/* 3 Region Fast Jumpers with Unboxed Typographic separator */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-300">
            <span className="text-neutral-400 font-medium">{t.filterByRegion}:</span>
            <button
              onClick={() => {
                onSelectRegion('north');
                const el = document.getElementById('provinces-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-emerald-400 underline underline-offset-4 cursor-pointer"
            >
              {t.northRegion}
            </button>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <button
              onClick={() => {
                onSelectRegion('central');
                const el = document.getElementById('provinces-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-emerald-400 underline underline-offset-4 cursor-pointer"
            >
              {t.centralRegion}
            </button>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <button
              onClick={() => {
                onSelectRegion('south');
                const el = document.getElementById('provinces-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-emerald-400 underline underline-offset-4 cursor-pointer"
            >
              {t.southRegion}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
