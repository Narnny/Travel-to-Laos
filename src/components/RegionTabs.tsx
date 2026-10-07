import React from 'react';
import { Language } from '../types/travel';
import { translations } from '../data/translations';
import { Map, Grid, Sparkles, Landmark, Trees, Waves, Mountain, Compass, Search, X } from 'lucide-react';

interface RegionTabsProps {
  currentLang: Language;
  selectedRegion: 'all' | 'north' | 'central' | 'south';
  onSelectRegion: (region: 'all' | 'north' | 'central' | 'south') => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  viewMode: 'grid' | 'map';
  onToggleViewMode: (mode: 'grid' | 'map') => void;
  resultsCount: number;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const RegionTabs: React.FC<RegionTabsProps> = ({
  currentLang,
  selectedRegion,
  onSelectRegion,
  selectedCategory,
  onSelectCategory,
  viewMode,
  onToggleViewMode,
  resultsCount,
  searchQuery = '',
  onSearchChange,
}) => {
  const t = translations[currentLang];

  const regions: { id: 'all' | 'north' | 'central' | 'south'; label: string }[] = [
    { id: 'all', label: t.allProvinces },
    { id: 'north', label: t.northRegion },
    { id: 'central', label: t.centralRegion },
    { id: 'south', label: t.southRegion },
  ];

  const categories = [
    { id: 'all', label: t.allRegions, icon: null },
    { id: 'popular', label: t.popularOnly, icon: Sparkles },
    { id: 'waterfalls', label: t.themeWaterfalls, icon: Waves },
    { id: 'karsts', label: t.themeKarsts, icon: Mountain },
    { id: 'adventure', label: t.themeAdventure, icon: Compass },
    { id: 'unesco', label: t.unescoOnly, icon: Landmark },
    { id: 'nature', label: t.natureOnly, icon: Trees },
  ];

  return (
    <div className="space-y-4">
      {/* Region segment tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => onSelectRegion(reg.id)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedRegion === reg.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Search & View toggle (Grid vs Map) */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          {onSearchChange && (
            <div className="relative flex-1 sm:w-56 max-w-xs">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={currentLang === 'lo' ? 'ຄົ້ນຫາໃນລາຍການ...' : currentLang === 'th' ? 'ค้นหาในรายการ...' : 'Filter list...'}
                className="w-full bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white pl-8 pr-7 py-1 text-xs rounded-lg border border-neutral-200 focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-neutral-500 font-medium tabular-nums hidden sm:inline">
              {resultsCount} {t.provincesCount}
            </span>
            <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
              <button
                onClick={() => onToggleViewMode('grid')}
                className={`p-1.5 rounded-md text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title={t.gridView}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.gridView}</span>
              </button>
              <button
                onClick={() => onToggleViewMode('map')}
                className={`p-1.5 rounded-md text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title={t.mapView}
              >
                <Map className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.mapView}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Search Banner */}
      {searchQuery && (
        <div className="flex items-center justify-between bg-emerald-50/90 border border-emerald-200 rounded-xl px-4 py-2 text-xs text-emerald-900 animate-in fade-in">
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="truncate">
              {t.foundResults || 'ຜົນການຄົ້ນຫາ'}: <span className="font-bold underline">"{searchQuery}"</span> ({resultsCount} {t.provincesCount})
            </span>
          </div>
          {onSearchChange && (
            <button
              onClick={() => onSearchChange('')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-md transition-colors cursor-pointer shrink-0 ml-2"
            >
              ✕ {t.clearSearch}
            </button>
          )}
        </div>
      )}

      {/* Secondary filter chips for categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-neutral-400 font-medium shrink-0">{t.filterByCategory}:</span>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 text-white font-medium'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:text-neutral-900'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
