import React from 'react';
import { Province, Language } from '../types/travel';
import { translations } from '../data/translations';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';
import { Car, Plane, Train, Bookmark, ArrowRight, Star, Sparkles } from 'lucide-react';

interface ProvinceCardProps {
  province: Province;
  currentLang: Language;
  onOpenDetails: (province: Province) => void;
  isSaved: boolean;
  onToggleSave: (provinceId: string) => void;
}

export const ProvinceCard: React.FC<ProvinceCardProps> = ({
  province,
  currentLang,
  onOpenDetails,
  isSaved,
  onToggleSave,
}) => {
  const t = translations[currentLang];
  const topSpot = province.attractions.find((a) => a.isTopPopular) || province.attractions[0];

  const regionBadge =
    province.region === 'north'
      ? t.northRegion.split(' ')[0]
      : province.region === 'central'
      ? t.centralRegion.split(' ')[0]
      : t.southRegion.split(' ')[0];

  return (
    <article className="group bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all shadow-xs hover:shadow-md flex flex-col overflow-hidden">
      {/* Visual media banner */}
      <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
        <img
          src={resolveImageUrl(province.heroImage)}
          alt={province.name[currentLang]}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />

        {/* Region unboxed kicker */}
        <div className="absolute top-3 left-3 text-[11px] font-semibold text-white tracking-wide uppercase bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-sm">
          {regionBadge}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(province.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            isSaved
              ? 'bg-emerald-600 text-white'
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
          title={isSaved ? t.savedInPlan : t.saveToPlan}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Province Name & Tagline Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-xl font-bold tracking-tight text-white leading-snug drop-shadow-xs">
            {province.name[currentLang]}
          </h3>
          <p className="text-xs text-neutral-200 line-clamp-1 mt-0.5">
            {province.capitalName[currentLang]} · {province.tagline[currentLang]}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Core Distance & Travel Time Matrix */}
        <div className="grid grid-cols-3 gap-2 p-2.5 bg-neutral-50 rounded-lg text-xs border border-neutral-100">
          {/* Distance (km) */}
          <div className="flex flex-col">
            <span className="text-[11px] text-neutral-500">{t.distanceFromVientiane}</span>
            <span className="font-bold text-neutral-900 text-sm tabular-nums mt-0.5">
              {province.transport.distanceKm === 0 ? '0 km (ສູນກາງ)' : `${province.transport.distanceKm} km`}
            </span>
          </div>

          {/* Car Time */}
          <div className="flex flex-col border-l border-neutral-200 pl-2">
            <span className="text-[11px] text-neutral-500 flex items-center gap-1">
              <Car className="w-3 h-3 text-neutral-500" />
              <span>{t.carTime}</span>
            </span>
            <span className="font-semibold text-neutral-900 text-xs mt-0.5 tabular-nums line-clamp-1">
              {province.transport.carTimeHours === 0 ? '0 ชม.' : `${province.transport.carTimeHours} ຊົ່ວໂມງ`}
            </span>
          </div>

          {/* Flight or Train Time */}
          <div className="flex flex-col border-l border-neutral-200 pl-2">
            {province.transport.trainAvailable ? (
              <>
                <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                  <Train className="w-3 h-3 text-emerald-700" />
                  <span>{t.trainTime}</span>
                </span>
                <span className="font-semibold text-emerald-800 text-xs mt-0.5 line-clamp-1">
                  {province.transport.trainTimeDisplay?.[currentLang] || 'ມີລົດໄຟ EMU'}
                </span>
              </>
            ) : province.transport.flightTimeMinutes ? (
              <>
                <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                  <Plane className="w-3 h-3 text-neutral-500" />
                  <span>{t.flightTime}</span>
                </span>
                <span className="font-semibold text-neutral-900 text-xs mt-0.5 tabular-nums">
                  {province.transport.flightTimeMinutes} ນາທີ
                </span>
              </>
            ) : (
              <>
                <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <Plane className="w-3 h-3 text-neutral-400" />
                  <span>{t.flightTime}</span>
                </span>
                <span className="text-neutral-500 text-xs mt-0.5">
                  {t.noFlight}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Most Popular Attraction Highlight */}
        {topSpot && (
          <div className="border-t border-neutral-100 pt-3">
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
              <span className="flex items-center gap-1 font-medium text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {t.popularBadge}:
              </span>
              <span className="flex items-center gap-0.5 font-bold text-neutral-800 tabular-nums">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {topSpot.rating}
              </span>
            </div>
            <p className="text-sm font-semibold text-neutral-900 line-clamp-1">
              {topSpot.name[currentLang]}
            </p>
            <p className="text-xs text-neutral-600 line-clamp-2 mt-1 leading-relaxed">
              {topSpot.description[currentLang]}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            {province.attractions.length} {t.topAttractions}
          </div>
          <button
            onClick={() => onOpenDetails(province)}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{t.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
