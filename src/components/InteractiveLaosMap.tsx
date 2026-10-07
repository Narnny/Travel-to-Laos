import React, { useState } from 'react';
import { Province, Language } from '../types/travel';
import { translations } from '../data/translations';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';
import { MapPin, Train, Plane, Star } from 'lucide-react';

interface InteractiveLaosMapProps {
  provinces: Province[];
  currentLang: Language;
  onSelectProvince: (province: Province) => void;
}

export const InteractiveLaosMap: React.FC<InteractiveLaosMapProps> = ({
  provinces,
  currentLang,
  onSelectProvince,
}) => {
  const t = translations[currentLang];
  const [activeProvinceId, setActiveProvinceId] = useState<string>('luang-prabang');

  const activeProvince = provinces.find((p) => p.id === activeProvinceId) || provinces[0];

  // Visual layout coordinates mapped to a responsive SVG box (1000 x 950)
  // Reflecting real geographic orientation of Laos (North-West to South-East elongated)
  const provinceMapPositions: Record<string, { x: number; y: number; region: string }> = {
    'phongsaly': { x: 330, y: 70, region: 'north' },
    'luang-namtha': { x: 230, y: 130, region: 'north' },
    'bokeo': { x: 150, y: 180, region: 'north' },
    'oudomxay': { x: 280, y: 190, region: 'north' },
    'luang-prabang': { x: 340, y: 260, region: 'north' },
    'xayabury': { x: 230, y: 310, region: 'north' },
    'houaphanh': { x: 440, y: 200, region: 'north' },
    'xieng-khouang': { x: 410, y: 290, region: 'north' },

    'xaysomboun': { x: 380, y: 360, region: 'central' },
    'vientiane-province': { x: 320, y: 380, region: 'central' },
    'vientiane-capital': { x: 340, y: 440, region: 'central' },
    'bolikhamxay': { x: 470, y: 430, region: 'central' },
    'khammouane': { x: 550, y: 490, region: 'central' },
    'savannakhet': { x: 610, y: 580, region: 'central' },

    'salavan': { x: 690, y: 670, region: 'south' },
    'sekong': { x: 740, y: 730, region: 'south' },
    'champasak': { x: 670, y: 760, region: 'south' },
    'attapeu': { x: 770, y: 810, region: 'south' },
  };

  return (
    <div id="interactive-map" className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <span>{t.mapView}</span>
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            ຄລິກໃສ່ແຂວງເທິງແຜນທີ່ ເພື່ອເບິ່ງແຫຼ່ງທ່ອງທ່ຽວ ແລະ ໄລຍະທາງ
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
            <span className="text-neutral-600">{t.northRegion.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
            <span className="text-neutral-600">{t.centralRegion.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-600 inline-block"></span>
            <span className="text-neutral-600">{t.southRegion.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-neutral-200 pl-3">
            <span className="w-4 h-0.5 border-t-2 border-red-500 inline-block"></span>
            <span className="text-neutral-600 flex items-center gap-0.5">
              <Train className="w-3 h-3 text-red-500" />
              <span>{t.trainBadge}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* SVG Interactive Map */}
        <div className="lg:col-span-7 bg-neutral-900 rounded-xl p-4 flex items-center justify-center relative overflow-hidden min-h-[460px]">
          <svg
            viewBox="50 30 800 850"
            className="w-full h-auto max-h-[520px] select-none"
          >
            {/* Outline shape representing Lao geography */}
            <path
              d="M 280 60 Q 380 50 420 140 Q 480 180 470 260 Q 410 320 480 380 Q 560 440 600 520 Q 640 580 720 630 Q 770 700 810 790 Q 780 870 720 850 Q 640 810 630 730 Q 580 620 540 530 Q 450 490 350 480 Q 280 430 200 340 Q 120 220 140 160 Q 180 110 280 60 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Lao-China Railway corridor path */}
            <path
              d="M 230 130 L 280 190 L 340 260 L 320 380 L 340 440"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3.5"
              strokeDasharray="6,4"
              className="opacity-90"
            />

            {/* Mekong River curve path */}
            <path
              d="M 140 150 Q 180 220 230 300 Q 280 410 340 460 Q 470 480 560 520 Q 610 600 660 720 Q 680 810 670 850"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2"
              strokeOpacity="0.4"
            />

            {/* Province clickable markers */}
            {provinces.map((province) => {
              const pos = provinceMapPositions[province.id] || { x: 400, y: 400, region: 'central' };
              const isSelected = activeProvinceId === province.id;

              const markerColor =
                province.region === 'north'
                  ? '#10b981' // emerald
                  : province.region === 'central'
                  ? '#3b82f6' // blue
                  : '#f59e0b'; // amber

              return (
                <g
                  key={province.id}
                  onClick={() => setActiveProvinceId(province.id)}
                  className="cursor-pointer transition-transform group"
                >
                  {/* Pulse ring for selected */}
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="16"
                      fill={markerColor}
                      opacity="0.3"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker Circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 10 : 7}
                    fill={markerColor}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    className="transition-all duration-200"
                  />

                  {/* Province Name Label */}
                  <text
                    x={pos.x + 12}
                    y={pos.y + 4}
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontSize={isSelected ? '14' : '11'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    className="font-sans pointer-events-none drop-shadow-sm select-none"
                  >
                    {province.name[currentLang].replace('ແຂວງ ', '').replace('แขวง', '')}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Province Details Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
              <span className="font-semibold text-emerald-800 uppercase tracking-wide">
                {activeProvince.region === 'north'
                  ? t.northRegion
                  : activeProvince.region === 'central'
                  ? t.centralRegion
                  : t.southRegion}
              </span>
              <span>{activeProvince.capitalName[currentLang]}</span>
            </div>

            <h4 className="text-2xl font-bold text-neutral-900">
              {activeProvince.name[currentLang]}
            </h4>

            {/* Province Preview Image */}
            <div className="relative aspect-16/9 rounded-lg overflow-hidden my-3 border border-neutral-200">
              <img
                src={resolveImageUrl(activeProvince.heroImage)}
                alt={activeProvince.name[currentLang]}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 text-[11px] text-white font-medium drop-shadow-xs">
                📍 {activeProvince.capitalName[currentLang]}
              </div>
            </div>

            <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
              {activeProvince.tagline[currentLang]}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                <span className="text-[11px] text-neutral-500 block">{t.distanceFromVientiane}</span>
                <span className="font-bold text-neutral-900 text-sm mt-0.5 block tabular-nums">
                  {activeProvince.transport.distanceKm} km
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                <span className="text-[11px] text-neutral-500 block">{t.carTime}</span>
                <span className="font-bold text-neutral-900 text-sm mt-0.5 block tabular-nums">
                  {activeProvince.transport.carTimeHours} ຊົ່ວໂມງ
                </span>
              </div>
            </div>

            {/* High-speed train or flight banner */}
            <div className="mt-3 text-xs bg-white p-2.5 rounded-lg border border-neutral-200 flex items-center justify-between">
              <span className="text-neutral-500">
                {activeProvince.transport.trainAvailable ? t.trainTime : t.flightTime}:
              </span>
              <span className="font-bold text-emerald-800 flex items-center gap-1">
                {activeProvince.transport.trainAvailable ? (
                  <>
                    <Train className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{activeProvince.transport.trainTimeDisplay?.[currentLang] || t.trainBadge}</span>
                  </>
                ) : activeProvince.transport.flightTimeMinutes ? (
                  <>
                    <Plane className="w-3.5 h-3.5 text-neutral-700" />
                    <span>{activeProvince.transport.flightTimeMinutes} ນາທີ</span>
                  </>
                ) : (
                  <span className="text-neutral-400">{t.noFlight}</span>
                )}
              </span>
            </div>

            {/* Featured attractions */}
            <div className="mt-4">
              <span className="text-xs font-bold text-neutral-700 block mb-2">
                {t.topAttractions}:
              </span>
              <div className="space-y-1.5">
                {activeProvince.attractions.slice(0, 3).map((att) => (
                  <div
                    key={att.id}
                    className="bg-white px-3 py-2 rounded-lg border border-neutral-200 text-xs flex items-center justify-between"
                  >
                    <span className="font-medium text-neutral-800 truncate mr-2">
                      {att.name[currentLang]}
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-bold shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {att.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectProvince(activeProvince)}
            className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer text-center"
          >
            {t.viewDetails}
          </button>
        </div>
      </div>
    </div>
  );
};
