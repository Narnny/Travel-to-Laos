/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { Language, Province } from './types/travel';
import { allProvincesData } from './data/provincesData';
import { translations } from './data/translations';
import { getDishesForProvince } from './data/dishesData';
import { resolveImageUrl, handleImageError } from './utils/imageUtils';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RegionTabs } from './components/RegionTabs';
import { ProvinceCard } from './components/ProvinceCard';
import { ProvinceModal } from './components/ProvinceModal';
import { RouteCalculatorModal } from './components/RouteCalculatorModal';
import { TravelBudgetCalculatorModal } from './components/TravelBudgetCalculatorModal';
import { InteractiveLaosMap } from './components/InteractiveLaosMap';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SeasonalWeatherGuide } from './components/SeasonalWeatherGuide';
import { TravelTipsSection } from './components/TravelTipsSection';
import { Footer } from './components/Footer';
import { Sparkles, MapPin, Compass } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('lo');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'north' | 'central' | 'south'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Modals & Drawers state
  const [activeProvince, setActiveProvince] = useState<Province | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isBudgetCalcOpen, setIsBudgetCalcOpen] = useState<boolean>(false);
  const [calcInitialDestId, setCalcInitialDestId] = useState<string | undefined>(undefined);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Auto-open province if specified in URL query (e.g. ?province=luang-prabang from scanned QR code)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.location) {
        const params = new URLSearchParams(window.location.search);
        const provinceParam = params.get('province');
        if (provinceParam) {
          const match = allProvincesData.find(
            (p) =>
              p.id.toLowerCase() === provinceParam.toLowerCase() ||
              p.id.replace(/-/g, '') === provinceParam.replace(/-/g, '').toLowerCase()
          );
          if (match) {
            setActiveProvince(match);
          }
        }
      }
    } catch (e) {
      console.warn('Could not read province from URL param', e);
    }
  }, []);

  // Saved Provinces Wishlist (persisted in localStorage)
  const [savedProvinceIds, setSavedProvinceIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('laos_saved_provinces');
      return stored ? JSON.parse(stored) : ['luang-prabang', 'vientiane-province', 'champasak'];
    } catch {
      return ['luang-prabang', 'vientiane-province', 'champasak'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('laos_saved_provinces', JSON.stringify(savedProvinceIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedProvinceIds]);

  const toggleSaveProvince = (id: string) => {
    setSavedProvinceIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleOpenCalculatorWithDest = (provinceId: string) => {
    setCalcInitialDestId(provinceId);
    setActiveProvince(null);
    setIsCalculatorOpen(true);
  };

  const t = translations[currentLang];

  // Filtering logic
  const filteredProvinces = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();

    return allProvincesData.filter((province) => {
      // 1. Search query filter across all languages, attractions, and dishes
      if (rawQuery) {
        const matchesNameLo = province.name.lo.toLowerCase().includes(rawQuery);
        const matchesNameTh = province.name.th.toLowerCase().includes(rawQuery);
        const matchesNameEn = province.name.en.toLowerCase().includes(rawQuery);
        const matchesCapLo = province.capitalName.lo.toLowerCase().includes(rawQuery);
        const matchesCapTh = province.capitalName.th.toLowerCase().includes(rawQuery);
        const matchesCapEn = province.capitalName.en.toLowerCase().includes(rawQuery);
        const matchesTaglineLo = province.tagline.lo.toLowerCase().includes(rawQuery);
        const matchesTaglineTh = province.tagline.th.toLowerCase().includes(rawQuery);
        const matchesTaglineEn = province.tagline.en.toLowerCase().includes(rawQuery);
        const matchesDescLo = province.description.lo.toLowerCase().includes(rawQuery);
        const matchesDescTh = province.description.th.toLowerCase().includes(rawQuery);
        const matchesDescEn = province.description.en.toLowerCase().includes(rawQuery);
        const matchesId = province.id.toLowerCase().includes(rawQuery);
        const matchesAttractions = province.attractions.some(
          (a) =>
            a.name.lo.toLowerCase().includes(rawQuery) ||
            a.name.th.toLowerCase().includes(rawQuery) ||
            a.name.en.toLowerCase().includes(rawQuery) ||
            a.description.lo.toLowerCase().includes(rawQuery) ||
            a.description.th.toLowerCase().includes(rawQuery) ||
            a.description.en.toLowerCase().includes(rawQuery) ||
            a.highlights[currentLang]?.toLowerCase().includes(rawQuery)
        );
        const dishes = getDishesForProvince(province.id);
        const matchesDishes = dishes.some(
          (d) =>
            d.name.lo.toLowerCase().includes(rawQuery) ||
            d.name.th.toLowerCase().includes(rawQuery) ||
            d.name.en.toLowerCase().includes(rawQuery) ||
            d.description[currentLang]?.toLowerCase().includes(rawQuery)
        );

        const isSearchMatch =
          matchesNameLo ||
          matchesNameTh ||
          matchesNameEn ||
          matchesCapLo ||
          matchesCapTh ||
          matchesCapEn ||
          matchesTaglineLo ||
          matchesTaglineTh ||
          matchesTaglineEn ||
          matchesDescLo ||
          matchesDescTh ||
          matchesDescEn ||
          matchesId ||
          matchesAttractions ||
          matchesDishes;

        if (!isSearchMatch) return false;
      }

      // 2. Region filter
      if (selectedRegion !== 'all' && province.region !== selectedRegion) {
        return false;
      }

      // 3. Category filter
      if (selectedCategory === 'popular' && !province.isMustVisit && province.popularityRank > 6) {
        return false;
      }
      if (selectedCategory === 'unesco' && !province.attractions.some((a) => a.category === 'unesco')) {
        return false;
      }
      if (selectedCategory === 'nature' && !province.attractions.some((a) => a.category === 'nature')) {
        return false;
      }
      if (selectedCategory === 'waterfalls') {
        const hasWaterfall = province.attractions.some(
          (a) =>
            a.name.lo.includes('ຕາດ') ||
            a.name.lo.includes('ນ້ຳຕົກ') ||
            a.name.th.includes('น้ำตก') ||
            a.name.en.toLowerCase().includes('fall') ||
            a.description.lo.includes('ຕາດ')
        );
        if (!hasWaterfall) return false;
      }
      if (selectedCategory === 'karsts') {
        const hasKarst = province.attractions.some(
          (a) =>
            a.category === 'viewpoint' ||
            a.name.lo.includes('ຜາ') ||
            a.name.lo.includes('ພູ') ||
            a.name.th.includes('ผา') ||
            a.name.th.includes('พู') ||
            a.description.lo.includes('ຫີນປູນ')
        );
        if (!hasKarst) return false;
      }
      if (selectedCategory === 'adventure') {
        const hasAdventure = province.attractions.some((a) => a.category === 'adventure');
        if (!hasAdventure) return false;
      }

      return true;
    });
  }, [selectedRegion, selectedCategory, searchQuery, currentLang]);

  const savedProvincesList = useMemo(() => {
    return allProvincesData.filter((p) => savedProvinceIds.includes(p.id));
  }, [savedProvinceIds]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar Navigation */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        savedCount={savedProvinceIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCalculator={() => {
          setCalcInitialDestId(undefined);
          setIsCalculatorOpen(true);
        }}
        onOpenBudgetCalculator={() => setIsBudgetCalcOpen(true)}
      />

      {/* Hero Header */}
      <Hero
        currentLang={currentLang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSubmitSearch={() => {
          setSelectedRegion('all');
          setSelectedCategory('all');
        }}
        onOpenCalculator={() => {
          setCalcInitialDestId(undefined);
          setIsCalculatorOpen(true);
        }}
        onOpenBudgetCalculator={() => setIsBudgetCalcOpen(true)}
        onSelectRegion={setSelectedRegion}
        selectedRegion={selectedRegion}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 w-full">
        {/* Curated Top Destinations Banner */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.popularRanking}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-0.5">
                {t.popularBadge} (Top Highlights)
              </h2>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              <button
                onClick={() => {
                  setCalcInitialDestId(undefined);
                  setIsCalculatorOpen(true);
                }}
                className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>{t.calculatorTitle.split(' ')[0]}</span>
              </button>
              <button
                onClick={() => setIsBudgetCalcOpen(true)}
                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>{t.budgetCalcTitle.split(' ')[0]}</span>
              </button>
            </div>
          </div>

          {/* 3 Regional Pillars Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {/* North Pillar: Luang Prabang */}
            <div
              onClick={() => setActiveProvince(allProvincesData[0])}
              className="group cursor-pointer bg-neutral-900 rounded-xl p-5 text-white relative overflow-hidden transition-all hover:shadow-lg flex flex-col justify-between min-h-[200px]"
            >
              <img
                src={resolveImageUrl(allProvincesData[0].heroImage)}
                alt="Luang Prabang"
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400">{t.northRegion.split(' ')[0]}</span>
                <span className="bg-emerald-600/80 backdrop-blur-xs px-2 py-0.5 rounded-sm text-[11px] font-bold">
                  UNESCO
                </span>
              </div>
              <div className="relative z-10 space-y-1">
                <h3 className="text-lg font-bold group-hover:text-emerald-300 transition-colors">
                  {allProvincesData[0].name[currentLang]}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  {allProvincesData[0].tagline[currentLang]}
                </p>
                <div className="text-[11px] text-emerald-400 pt-1 font-medium">
                  340 km · ລົດໄຟ EMU 1h 50m
                </div>
              </div>
            </div>

            {/* Central Pillar: Vang Vieng & Vientiane */}
            <div
              onClick={() => setActiveProvince(allProvincesData[9])}
              className="group cursor-pointer bg-neutral-900 rounded-xl p-5 text-white relative overflow-hidden transition-all hover:shadow-lg flex flex-col justify-between min-h-[200px]"
            >
              <img
                src={resolveImageUrl(allProvincesData[9].heroImage)}
                alt="Vang Vieng"
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-400">{t.centralRegion.split(' ')[0]}</span>
                <span className="bg-blue-600/80 backdrop-blur-xs px-2 py-0.5 rounded-sm text-[11px] font-bold">
                  Adventure
                </span>
              </div>
              <div className="relative z-10 space-y-1">
                <h3 className="text-lg font-bold group-hover:text-blue-300 transition-colors">
                  {allProvincesData[9].name[currentLang]} (ວັງວຽງ)
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  {allProvincesData[9].tagline[currentLang]}
                </p>
                <div className="text-[11px] text-blue-300 pt-1 font-medium">
                  130 km · ທາງດ່ວນ 1h 20m · ລົດໄຟ 50m
                </div>
              </div>
            </div>

            {/* South Pillar: Champasak */}
            <div
              onClick={() => setActiveProvince(allProvincesData[14])}
              className="group cursor-pointer bg-neutral-900 rounded-xl p-5 text-white relative overflow-hidden transition-all hover:shadow-lg flex flex-col justify-between min-h-[200px]"
            >
              <img
                src={resolveImageUrl(allProvincesData[14].heroImage)}
                alt="Champasak"
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-400">{t.southRegion.split(' ')[0]}</span>
                <span className="bg-amber-600/80 backdrop-blur-xs px-2 py-0.5 rounded-sm text-[11px] font-bold">
                  Heritage & Nature
                </span>
              </div>
              <div className="relative z-10 space-y-1">
                <h3 className="text-lg font-bold group-hover:text-amber-300 transition-colors">
                  {allProvincesData[14].name[currentLang]} (ປາກເຊ)
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  {allProvincesData[14].tagline[currentLang]}
                </p>
                <div className="text-[11px] text-amber-300 pt-1 font-medium">
                  670 km · ຖ້ຽວບິນກົງ 55m
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 18 Provinces Section with Tabs & Filters */}
        <section id="provinces-section" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide block">
                {t.provincesTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                {selectedRegion === 'all'
                  ? t.allProvinces
                  : selectedRegion === 'north'
                  ? t.northRegion
                  : selectedRegion === 'central'
                  ? t.centralRegion
                  : t.southRegion}
              </h2>
            </div>
          </div>

          {/* Region Tabs & Filter controls */}
          <RegionTabs
            currentLang={currentLang}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            viewMode={viewMode}
            onToggleViewMode={setViewMode}
            resultsCount={filteredProvinces.length}
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              if (q.trim()) {
                setSelectedRegion('all');
                setSelectedCategory('all');
              }
            }}
          />

          {/* View Mode Render */}
          {viewMode === 'map' ? (
            <InteractiveLaosMap
              provinces={filteredProvinces}
              currentLang={currentLang}
              onSelectProvince={(p) => setActiveProvince(p)}
            />
          ) : (
            <>
              {filteredProvinces.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 sm:p-14 text-center border border-neutral-200 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-neutral-800">{t.noResults}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {currentLang === 'lo'
                        ? 'ບໍ່ພົບແຂວງ ຫຼື ສະຖານທີ່ທີ່ກົງກັບຄຳຄົ້ນຫາຂອງທ່ານ'
                        : currentLang === 'th'
                        ? 'ไม่พบแขวงหรือสถานที่ที่ตรงกับคำค้นหาของคุณ'
                        : 'No provinces or attractions matched your search term.'}
                    </p>
                  </div>

                  {/* Popular search suggestion buttons */}
                  <div className="pt-2">
                    <span className="text-xs text-neutral-400 block mb-2">
                      {currentLang === 'lo' ? 'ລອງຄົ້ນຫາຍອດນິຍົມ:' : currentLang === 'th' ? 'ลองคำค้นหายอดนิยม:' : 'Try popular searches:'}
                    </span>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {(currentLang === 'lo'
                        ? ['ຫຼວງພະບາງ', 'ວັງວຽງ', 'ນະຄອນຫຼວງວຽງຈັນ', 'ຈຳປາສັກ', 'ຕາດກວາງຊີ']
                        : currentLang === 'th'
                        ? ['หลวงพระบาง', 'วังเวียง', 'เวียงจันทน์', 'จำปาสัก', 'น้ำตกตาดกวางสี']
                        : ['Luang Prabang', 'Vang Vieng', 'Vientiane', 'Champasak', 'Kuang Si']
                      ).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setSearchQuery(tag);
                            setSelectedRegion('all');
                            setSelectedCategory('all');
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-800 text-neutral-700 text-xs rounded-full border border-neutral-200 transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('all');
                      setSelectedCategory('all');
                    }}
                    className="mt-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                  >
                    {t.clearSearch}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProvinces.map((province) => (
                    <ProvinceCard
                      key={province.id}
                      province={province}
                      currentLang={currentLang}
                      onOpenDetails={(p) => setActiveProvince(p)}
                      isSaved={savedProvinceIds.includes(province.id)}
                      onToggleSave={toggleSaveProvince}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* Interactive Map preview section if not in map mode */}
        {viewMode === 'grid' && (
          <section>
            <InteractiveLaosMap
              provinces={allProvincesData}
              currentLang={currentLang}
              onSelectProvince={(p) => setActiveProvince(p)}
            />
          </section>
        )}

        {/* Laos Seasonal Climate & Essential Phrases */}
        <SeasonalWeatherGuide currentLang={currentLang} />

        {/* Travel Tips Section */}
        <TravelTipsSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenCalculator={() => {
          setCalcInitialDestId(undefined);
          setIsCalculatorOpen(true);
        }}
        onOpenBudgetCalculator={() => setIsBudgetCalcOpen(true)}
      />

      {/* Deep-dive Province Modal */}
      <ProvinceModal
        province={activeProvince}
        currentLang={currentLang}
        onClose={() => setActiveProvince(null)}
        isSaved={activeProvince ? savedProvinceIds.includes(activeProvince.id) : false}
        onToggleSave={toggleSaveProvince}
        onOpenCalculatorWithDest={handleOpenCalculatorWithDest}
      />

      {/* Route & Distance Calculator Modal */}
      {isCalculatorOpen && (
        <RouteCalculatorModal
          provinces={allProvincesData}
          currentLang={currentLang}
          onClose={() => setIsCalculatorOpen(false)}
          initialDestinationId={calcInitialDestId}
        />
      )}

      {/* Travel Budget Calculator Modal */}
      {isBudgetCalcOpen && (
        <TravelBudgetCalculatorModal
          provinces={allProvincesData}
          currentLang={currentLang}
          onClose={() => setIsBudgetCalcOpen(false)}
          savedProvinceIds={savedProvinceIds}
        />
      )}

      {/* Wishlist / My Trip Plan Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedProvinces={savedProvincesList}
        currentLang={currentLang}
        onRemoveProvince={toggleSaveProvince}
        onOpenDetails={(p) => {
          setIsWishlistOpen(false);
          setActiveProvince(p);
        }}
        onOpenBudgetCalculator={() => {
          setIsWishlistOpen(false);
          setIsBudgetCalcOpen(true);
        }}
      />
    </div>
  );
}
