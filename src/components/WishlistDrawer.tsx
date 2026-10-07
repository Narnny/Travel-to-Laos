import React, { useState } from 'react';
import { Province, Language } from '../types/travel';
import { translations } from '../data/translations';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';
import { X, Trash2, Copy, Check, MapPin, ArrowRight, Printer, Wallet } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProvinces: Province[];
  currentLang: Language;
  onRemoveProvince: (provinceId: string) => void;
  onOpenDetails: (province: Province) => void;
  onOpenBudgetCalculator?: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  savedProvinces,
  currentLang,
  onRemoveProvince,
  onOpenDetails,
  onOpenBudgetCalculator,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLang];
  const [copied, setCopied] = useState(false);

  const totalDistance = savedProvinces.reduce((acc, p) => acc + p.transport.distanceKm, 0);

  const handleCopy = () => {
    const textList = savedProvinces
      .map(
        (p, idx) =>
          `${idx + 1}. ${p.name[currentLang]} (${p.capitalName[currentLang]}) - ${p.transport.distanceKm} km, ${p.transport.carTimeHours}h - Top: ${p.attractions[0]?.name[currentLang]}`
      )
      .join('\n');

    const fullShareText = `📍 ${t.myTripPlan} (${savedProvinces.length} ${t.provincesCount})\n${textList}\n✨ ທ່ຽວລາວ 18 ແຂວງ`;

    navigator.clipboard.writeText(fullShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <h3 className="font-bold text-base text-neutral-900">{t.myTripPlan}</h3>
            <p className="text-xs text-neutral-500">
              {savedProvinces.length} {t.provincesCount} {t.savedInPlan}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {savedProvinces.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400 space-y-3">
              <MapPin className="w-10 h-10 stroke-1" />
              <p className="text-sm font-medium">ທ່ານຍັງບໍ່ທັນໄດ້ບັນທຶກແຂວງໃດ</p>
              <p className="text-xs">
                ກົດປຸ່ມ Bookmark ເທິງແຂວງທີ່ທ່ານສົນໃຈ ເພື່ອຈັດແຜນການເດີນທາງ
              </p>
            </div>
          ) : (
            savedProvinces.map((prov) => (
              <div
                key={prov.id}
                className="bg-neutral-50 rounded-xl p-3 border border-neutral-200 flex items-center justify-between gap-3 group hover:border-neutral-300 transition-all"
              >
                <img
                  src={resolveImageUrl(prov.heroImage)}
                  alt={prov.name[currentLang]}
                  onError={handleImageError}
                  className="w-12 h-12 rounded-lg object-cover shrink-0 cursor-pointer shadow-2xs"
                  onClick={() => onOpenDetails(prov)}
                />
                <div
                  className="flex-1 cursor-pointer min-w-0"
                  onClick={() => onOpenDetails(prov)}
                >
                  <h4 className="font-bold text-sm text-neutral-900 group-hover:text-emerald-700 transition-colors">
                    {prov.name[currentLang]}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {prov.transport.distanceKm} km · {prov.transport.carTimeHours} ຊົ່ວໂມງ
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenDetails(prov)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-md cursor-pointer"
                    title={t.viewDetails}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveProvince(prov.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-md cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Action */}
        {savedProvinces.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>{t.estimatedDistance}:</span>
              <span className="font-bold text-neutral-900 text-sm tabular-nums">
                ~{totalDistance} km
              </span>
            </div>

            {onOpenBudgetCalculator && (
              <button
                onClick={onOpenBudgetCalculator}
                className="w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Wallet className="w-4 h-4 text-emerald-300" />
                <span>{t.budgetCalcTitle} ({savedProvinces.length} ແຂວງ)</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopy}
                className="py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'ສຳເນົາແລ້ວ!' : t.shareTrip}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                title={t.printItinerary}
              >
                <Printer className="w-3.5 h-3.5 text-neutral-600" />
                <span>ພິມ / PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
