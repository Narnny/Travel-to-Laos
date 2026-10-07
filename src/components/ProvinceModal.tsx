import React, { useState } from 'react';
import { Province, Language } from '../types/travel';
import { translations } from '../data/translations';
import { getDishesForProvince } from '../data/dishesData';
import { ProvincePhotoCarousel } from './ProvincePhotoCarousel';
import { ProvinceQrModal } from './ProvinceQrModal';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';
import {
  X,
  Car,
  Plane,
  Train,
  Star,
  Utensils,
  Sun,
  MapPin,
  Bookmark,
  CheckCircle2,
  Clock,
  Compass,
  Sparkles,
  QrCode,
} from 'lucide-react';

interface ProvinceModalProps {
  province: Province | null;
  currentLang: Language;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (provinceId: string) => void;
  onOpenCalculatorWithDest: (provinceId: string) => void;
}

export const ProvinceModal: React.FC<ProvinceModalProps> = ({
  province,
  currentLang,
  onClose,
  isSaved,
  onToggleSave,
  onOpenCalculatorWithDest,
}) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

  if (!province) return null;

  const t = translations[currentLang];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-colors cursor-pointer shadow-md"
          title={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dynamic Multi-Photo Gallery Carousel */}
        <ProvincePhotoCarousel province={province} currentLang={currentLang} />

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Action Row */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onToggleSave(province.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? t.savedInPlan : t.saveToPlan}</span>
              </button>
              <button
                onClick={() => onOpenCalculatorWithDest(province.id)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>{t.calculateRoute}</span>
              </button>
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title={t.shareViaQr}
              >
                <QrCode className="w-4 h-4 text-emerald-700" />
                <span>{t.shareViaQr}</span>
              </button>
            </div>

            <div className="text-xs text-neutral-500 font-medium">
              GPS: {province.coordinates.lat.toFixed(4)}°N, {province.coordinates.lng.toFixed(4)}°E
            </div>
          </div>

          {/* Overview text */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-2">
              {t.quickInfo}
            </h3>
            <p className="text-neutral-700 text-sm leading-relaxed">
              {province.description[currentLang]}
            </p>
          </div>

          {/* Transport Details Card */}
          <div className="bg-neutral-50 p-4 sm:p-5 rounded-xl border border-neutral-200 space-y-3">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <span>{t.howToGetThere}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-neutral-200 space-y-1">
                <div className="text-neutral-500 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-neutral-600" />
                  <span className="font-semibold text-neutral-700">{t.carTime}</span>
                </div>
                <div className="font-bold text-neutral-900 text-sm">
                  {province.transport.distanceKm} km
                </div>
                <div className="text-neutral-600">
                  {province.transport.carTimeDisplay[currentLang]}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-neutral-200 space-y-1">
                <div className="text-neutral-500 flex items-center gap-1.5">
                  <Plane className="w-4 h-4 text-neutral-600" />
                  <span className="font-semibold text-neutral-700">{t.flightTime}</span>
                </div>
                <div className="font-bold text-neutral-900 text-sm">
                  {province.transport.flightTimeMinutes ? `${province.transport.flightTimeMinutes} ນາທີ` : '-'}
                </div>
                <div className="text-neutral-600">
                  {province.transport.flightDisplay[currentLang]}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-neutral-200 space-y-1">
                <div className="text-neutral-500 flex items-center gap-1.5">
                  <Train className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">{t.trainTime}</span>
                </div>
                <div className="font-bold text-neutral-900 text-sm">
                  {province.transport.trainAvailable ? 'ລົດໄຟ EMU' : '-'}
                </div>
                <div className="text-neutral-600">
                  {province.transport.trainAvailable
                    ? province.transport.trainTimeDisplay?.[currentLang] || t.trainBadge
                    : 'ບໍ່ມີສາຍລົດໄຟຜ່ານ'}
                </div>
              </div>
            </div>

            {/* Transport tip */}
            <div className="text-xs text-neutral-600 bg-emerald-50/70 p-3 rounded-lg border border-emerald-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-emerald-900">{t.transportAdvice}: </span>
                <span>{province.transport.recommendedRouteTip[currentLang]}</span>
              </div>
            </div>
          </div>

          {/* Attractions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900">
                {t.topAttractions} ({province.attractions.length})
              </h3>
            </div>

            <div className="space-y-3">
              {province.attractions.map((attraction) => (
                <div
                  key={attraction.id}
                  className="bg-white p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors space-y-3"
                >
                  {attraction.image && (
                    <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-neutral-100">
                      <img
                        src={resolveImageUrl(attraction.image)}
                        alt={attraction.name[currentLang]}
                        referrerPolicy="no-referrer"
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-neutral-900 text-base">
                          {attraction.name[currentLang]}
                        </h4>
                        {attraction.isTopPopular && (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                            {t.popularBadge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-500 flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 font-semibold text-neutral-700">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {attraction.rating}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {attraction.suggestedDuration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {attraction.description[currentLang]}
                  </p>

                  <div className="text-xs text-neutral-700 bg-neutral-50 px-2.5 py-1.5 rounded-md border border-neutral-100">
                    <span className="font-semibold text-neutral-900">ໄຮໄລ້: </span>
                    <span>{attraction.highlights[currentLang]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Cuisine & Signature Dishes Section */}
          <div className="pt-4 border-t border-neutral-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Gastronomy & Food Culture</span>
                </span>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-0.5">
                  {t.localFood} · ວັດທະນະທຳອາຫານປະຈຳຖິ່ນ
                </h3>
              </div>
            </div>

            {/* Signature Dishes Grid */}
            {(() => {
              const dishes = getDishesForProvince(province.id);
              const getDishImage = (dish: any) => {
                if (dish.image) return dish.image;
                if (dish.category === 'drink') return '/images/lao_cuisine_paksong_coffee_1791279250391.jpg';
                if (dish.category === 'soup') return '/images/lao_cuisine_khao_soi_noodles_1791280214155.jpg';
                if (dish.category === 'snack' || dish.category === 'dessert') return '/images/lao_cuisine_khao_jee_pate_1791280202583.jpg';
                return '/images/lao_cuisine_seno_chicken_1791279240658.jpg';
              };

              return dishes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dishes.map((dish) => {
                    const dishImg = getDishImage(dish);
                    return (
                      <div
                        key={dish.id}
                        className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:border-amber-300 transition-colors flex flex-col justify-between space-y-3 group shadow-2xs"
                      >
                        <div className="space-y-2">
                          {dishImg && (
                            <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-neutral-200 mb-2">
                              <img
                                src={resolveImageUrl(dishImg)}
                                alt={dish.name[currentLang]}
                                referrerPolicy="no-referrer"
                                onError={handleImageError}
                                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                              />
                              {dish.mustTry && (
                                <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-xs flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  <span>ຕ້ອງລອງ</span>
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-neutral-950 text-sm sm:text-base">
                              {dish.name[currentLang]}
                            </h4>
                            {!dishImg && dish.mustTry && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-sm shrink-0">
                                ຕ້ອງລອງ
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-neutral-600 leading-relaxed">
                            {dish.description[currentLang]}
                          </p>
                        </div>

                        {/* Taste Profile */}
                        <div className="text-[11px] bg-white p-2 rounded-lg border border-neutral-200 text-neutral-700">
                          <span className="font-semibold text-amber-900">ລົດຊາດເດັ່ນ: </span>
                          <span>{dish.tasteProfile[currentLang]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null;
            })()}

            {/* Additional Local Specialties Quick List */}
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 text-xs text-neutral-700 space-y-1.5">
              <span className="font-bold text-amber-950 block">
                ລາຍການອາຫານແຊບປະຈຳແຂວງອື່ນໆ:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {province.famousFood[currentLang].map((food, i) => (
                  <span
                    key={i}
                    className="bg-white px-2.5 py-1 rounded-md border border-amber-200 text-neutral-800"
                  >
                    🍴 {food}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Best Season to Visit */}
          <div className="pt-4 border-t border-neutral-100">
            <div className="bg-neutral-50 p-4 sm:p-5 rounded-xl border border-neutral-200 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                  {t.bestTimeToVisit}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {province.bestSeason[currentLang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share via QR Modal */}
      <ProvinceQrModal
        province={province}
        currentLang={currentLang}
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />
    </div>
  );
};
