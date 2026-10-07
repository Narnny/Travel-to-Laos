import React, { useState } from 'react';
import { Province, Language } from '../types/travel';
import { translations } from '../data/translations';
import { X, Car, Plane, Train, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface RouteCalculatorModalProps {
  provinces: Province[];
  currentLang: Language;
  onClose: () => void;
  initialDestinationId?: string;
}

export const RouteCalculatorModal: React.FC<RouteCalculatorModalProps> = ({
  provinces,
  currentLang,
  onClose,
  initialDestinationId,
}) => {
  const t = translations[currentLang];

  const [originId, setOriginId] = useState<string>('vientiane-capital');
  const [destId, setDestId] = useState<string>(initialDestinationId || 'luang-prabang');

  const origin = provinces.find((p) => p.id === originId) || provinces[0];
  const dest = provinces.find((p) => p.id === destId) || provinces[1];

  // Calculate approximate distance & time
  // If origin is Vientiane, exact data from province.transport
  // If between two arbitrary provinces, approximate based on difference or road network
  const isFromVientiane = origin.id === 'vientiane-capital';
  const isToVientiane = dest.id === 'vientiane-capital';

  let distanceKm = 0;
  let carHours = 0;

  if (origin.id === dest.id) {
    distanceKm = 0;
    carHours = 0;
  } else if (isFromVientiane) {
    distanceKm = dest.transport.distanceKm;
    carHours = dest.transport.carTimeHours;
  } else if (isToVientiane) {
    distanceKm = origin.transport.distanceKm;
    carHours = origin.transport.carTimeHours;
  } else {
    // Distance between two provinces:
    if (origin.region === dest.region) {
      // In same region
      distanceKm = Math.abs(dest.transport.distanceKm - origin.transport.distanceKm);
      if (distanceKm < 60) distanceKm = 90; // minimum realistic road distance
      carHours = parseFloat((distanceKm / 45).toFixed(1));
    } else {
      // Different regions, route passes roughly through central hub
      distanceKm = origin.transport.distanceKm + dest.transport.distanceKm;
      carHours = parseFloat((origin.transport.carTimeHours + dest.transport.carTimeHours).toFixed(1));
    }
  }

  // Check train corridor: Vientiane, Vientiane Province, Luang Prabang, Oudomxay, Luang Namtha
  const trainCorridorIds = ['vientiane-capital', 'vientiane-province', 'luang-prabang', 'oudomxay', 'luang-namtha'];
  const hasDirectTrain = trainCorridorIds.includes(origin.id) && trainCorridorIds.includes(dest.id) && origin.id !== dest.id;

  // Flight availability
  const hasFlight = (origin.id === 'vientiane-capital' && dest.transport.flightTimeMinutes !== null) ||
                    (dest.id === 'vientiane-capital' && origin.transport.flightTimeMinutes !== null);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2 text-neutral-900 font-bold">
            <Compass className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg">{t.calculatorTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.originProvince}
              </label>
              <select
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
              >
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name[currentLang]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {t.destinationProvince}
              </label>
              <select
                value={destId}
                onChange={(e) => setDestId(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
              >
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name[currentLang]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Route Visualizer */}
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 flex items-center justify-between text-xs sm:text-sm">
            <div className="font-bold text-emerald-950">
              {origin.name[currentLang]}
            </div>
            <div className="flex items-center gap-1 text-emerald-700">
              <span className="w-8 border-t border-dashed border-emerald-400 hidden sm:block"></span>
              <ArrowRight className="w-4 h-4" />
              <span className="w-8 border-t border-dashed border-emerald-400 hidden sm:block"></span>
            </div>
            <div className="font-bold text-emerald-950">
              {dest.name[currentLang]}
            </div>
          </div>

          {/* Results Summary Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Distance */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              <span className="text-[11px] text-neutral-500 font-medium block">
                {t.estimatedDistance}
              </span>
              <span className="text-lg sm:text-xl font-bold text-neutral-900 mt-1 block tabular-nums">
                {distanceKm} km
              </span>
            </div>

            {/* Car Time */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              <span className="text-[11px] text-neutral-500 font-medium flex items-center justify-center gap-1">
                <Car className="w-3.5 h-3.5 text-neutral-600" />
                <span>{t.carTime}</span>
              </span>
              <span className="text-lg sm:text-xl font-bold text-neutral-900 mt-1 block tabular-nums">
                ~{carHours} ຊົ່ວໂມງ
              </span>
            </div>

            {/* Train / Flight */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              <span className="text-[11px] text-neutral-500 font-medium flex items-center justify-center gap-1">
                {hasDirectTrain ? (
                  <>
                    <Train className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">{t.trainTime}</span>
                  </>
                ) : (
                  <>
                    <Plane className="w-3.5 h-3.5 text-neutral-600" />
                    <span>{t.flightTime}</span>
                  </>
                )}
              </span>
              <span className="text-sm sm:text-base font-bold text-neutral-900 mt-1 block line-clamp-1">
                {hasDirectTrain
                  ? 'ມີລົດໄຟ EMU'
                  : hasFlight
                  ? `${dest.transport.flightTimeMinutes || origin.transport.flightTimeMinutes} ນາທີ`
                  : t.noFlight}
              </span>
            </div>
          </div>

          {/* Recommendations advice */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-2">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{t.transportAdvice}:</span>
            </div>
            {hasDirectTrain ? (
              <p className="leading-relaxed">
                ແນະນຳຢ່າງຍິ່ງໃຫ້ນຳໃຊ້ <strong>ລົດໄຟລາວ-ຈີນ EMU</strong> ໃນເສັ້ນທາງນີ້ ເນື່ອງຈາກສະດວກ, ວ່ອງໄວ ແລະ ປອດໄພທີ່ສຸດ (ຈອງປີ້ລ່ວງໜ້າຜ່ານແອັບ LCR Ticket).
              </p>
            ) : hasFlight ? (
              <p className="leading-relaxed">
                ແນະນຳ <strong>ຖ້ຽວບິນພາຍໃນປະເທດ</strong> (Lao Airlines / Lao Skyway) ປະຢັດເວລາເດີນທາງໄດ້ຫຼາຍຊົ່ວໂມງ.
              </p>
            ) : (
              <p className="leading-relaxed">
                ແນະນຳການເດີນທາງດ້ວຍ <strong>ລົດໃຫຍ່ສ່ວນຕົວ, ລົດຕູ້ ຫຼື ລົດເມ VIP</strong> ຕາມເສັ້ນທາງຫຼວງເລກທີ 13.
              </p>
            )}

            {/* Estimated Fare Box */}
            <div className="pt-2 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                <span className="text-neutral-500 font-medium block">
                  {hasDirectTrain ? 'ຄ່າປີ້ລົດໄຟ EMU (ຊັ້ນ 2)' : 'ຄ່າລົດເມ VIP / ລົດຕູ້'}:
                </span>
                <span className="font-bold text-emerald-800 text-xs mt-0.5 block">
                  {hasDirectTrain
                    ? '280,000 - 450,000 ກີບ (~$13-$21 USD)'
                    : `${(distanceKm * 650).toLocaleString()} - ${(distanceKm * 950).toLocaleString()} ກີບ`}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                <span className="text-neutral-500 font-medium block">
                  {hasFlight ? 'ຄ່າຖ້ຽວບິນ Lao Airlines' : 'ຄ່ານ້ຳມັນລົດສ່ວນຕົວປະມານ'}:
                </span>
                <span className="font-bold text-neutral-900 text-xs mt-0.5 block">
                  {hasFlight
                    ? '1,400,000 - 2,200,000 ກີບ (~$65-$100 USD)'
                    : `${(distanceKm * 1800).toLocaleString()} - ${(distanceKm * 2500).toLocaleString()} ກີບ`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
