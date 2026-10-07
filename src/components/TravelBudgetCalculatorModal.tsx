import React, { useState } from 'react';
import { Province, Language } from '../types/travel';
import { translations } from '../data/translations';
import {
  X,
  Wallet,
  Building,
  Utensils,
  Car,
  Ticket,
  Copy,
  Check,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface TravelBudgetCalculatorModalProps {
  provinces: Province[];
  currentLang: Language;
  onClose: () => void;
  savedProvinceIds: string[];
}

type BudgetTier = 'budget' | 'standard' | 'luxury';
type Currency = 'LAK' | 'THB' | 'USD';

export const TravelBudgetCalculatorModal: React.FC<TravelBudgetCalculatorModalProps> = ({
  provinces,
  currentLang,
  onClose,
  savedProvinceIds,
}) => {
  const t = translations[currentLang];

  const [days, setDays] = useState<number>(5);
  const [travelers, setTravelers] = useState<number>(2);
  const [tier, setTier] = useState<BudgetTier>('standard');
  const [currency, setCurrency] = useState<Currency>('LAK');
  const [selectedIds, setSelectedIds] = useState<string[]>(
    savedProvinceIds.length > 0
      ? savedProvinceIds
      : ['luang-prabang', 'vientiane-province']
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Exchange rates against Lao Kip (LAK)
  const RATE_THB = 630; // 1 THB ~ 630 LAK
  const RATE_USD = 21500; // 1 USD ~ 21,500 LAK

  // Daily base costs per person / room (in LAK)
  const rates = {
    budget: {
      roomPerNight: 180000, // Shared / Guesthouse
      foodPerPersonDay: 120000, // Street food & local noodle stalls
      transportPerPersonDay: 130000, // Public minivans & train 2nd class
      activityPerPersonDay: 40000, // Temple entry fees
    },
    standard: {
      roomPerNight: 550000, // 3-star boutique hotel / bungalow
      foodPerPersonDay: 280000, // Local restaurants, riverside cafes
      transportPerPersonDay: 260000, // Train 1st/2nd, rented motorbike/minivan
      activityPerPersonDay: 120000, // Waterfalls, boat rentals, lagoons
    },
    luxury: {
      roomPerNight: 2200000, // 4-5 star luxury resort & heritage villa
      foodPerPersonDay: 850000, // Fine royal Lao dining, French wine bistros
      transportPerPersonDay: 850000, // Private chauffeur VIP vehicle / flights
      activityPerPersonDay: 450000, // Private guided tours, ziplines, private cruises
    },
  };

  const currentRate = rates[tier];

  // Number of hotel rooms needed (assuming 2 people per room)
  const roomsCount = Math.ceil(travelers / 2);

  // Calculation in LAK
  // Transport multiplier: more provinces = slightly more inter-provincial travel
  const provinceCount = Math.max(1, selectedIds.length);
  const interProvinceMultiplier = 1 + (provinceCount - 1) * 0.15;

  const totalAccommodation = currentRate.roomPerNight * roomsCount * days;
  const totalFood = currentRate.foodPerPersonDay * travelers * days;
  const totalTransport = Math.round(currentRate.transportPerPersonDay * travelers * days * interProvinceMultiplier);
  const totalActivities = currentRate.activityPerPersonDay * travelers * days;
  const totalLAK = totalAccommodation + totalFood + totalTransport + totalActivities;

  const perPersonPerDayLAK = Math.round(totalLAK / travelers / days);

  // Currency conversion formatting
  const formatCost = (lakAmount: number) => {
    if (currency === 'USD') {
      const val = Math.round(lakAmount / RATE_USD);
      return `$${val.toLocaleString()}`;
    }
    if (currency === 'THB') {
      const val = Math.round(lakAmount / RATE_THB);
      return `฿${val.toLocaleString()}`;
    }
    return `${lakAmount.toLocaleString()} ₭`;
  };

  const toggleProvinceSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((p) => p !== id)
          : prev
        : [...prev, id]
    );
  };

  const handleCopyBudget = () => {
    const provinceNames = selectedIds
      .map((id) => provinces.find((p) => p.id === id)?.name[currentLang])
      .filter(Boolean)
      .join(', ');

    const tierName =
      tier === 'budget'
        ? t.budgetTierBudget
        : tier === 'standard'
        ? t.budgetTierStandard
        : t.budgetTierLuxury;

    const summary = `💰 ${t.budgetCalcTitle}
📅 ${t.daysLabel}: ${days} | 👥 ${t.travelersLabel}: ${travelers} | ⭐ ${tierName}
📍 ${t.selectedProvincesLabel}: ${provinceNames}
----------------------------------
🏨 ${t.breakdownAccommodation}: ${formatCost(totalAccommodation)}
🍜 ${t.breakdownFood}: ${formatCost(totalFood)}
🚗 ${t.breakdownTransport}: ${formatCost(totalTransport)}
🎫 ${t.breakdownActivities}: ${formatCost(totalActivities)}
----------------------------------
✨ ${t.totalEstimatedCost}: ${formatCost(totalLAK)} (${formatCost(perPersonPerDayLAK)} / ຄົນ / ມື້)
Lao Travel 18 Provinces Explorer`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">{t.budgetCalcTitle}</h3>
              <p className="text-xs text-neutral-500">
                ປະເມີນຄ່າໃຊ້ຈ່າຍທີ່ພັກ, ອາຫານ, ການເດີນທາງ ແລະ ກິດຈະກຳ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Controls: Days, Travelers & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Days */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.daysLabel}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={days}
                  onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-sm font-bold text-neutral-900 tabular-nums focus:outline-hidden focus:border-emerald-600"
                />
                <span className="text-xs text-neutral-500 shrink-0">ມື້</span>
              </div>
            </div>

            {/* Travelers */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5 mb-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.travelersLabel}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={travelers}
                  onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-sm font-bold text-neutral-900 tabular-nums focus:outline-hidden focus:border-emerald-600"
                />
                <span className="text-xs text-neutral-500 shrink-0">ຄົນ</span>
              </div>
            </div>

            {/* Currency selector */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
              <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                ສະກຸນເງິນ (Currency)
              </label>
              <div className="flex bg-neutral-200/80 p-0.5 rounded-lg text-xs font-bold">
                {(['LAK', 'THB', 'USD'] as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                      currency === cur
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Budget Tier Selector (Budget / Standard / Luxury) */}
          <div>
            <label className="text-xs font-bold text-neutral-800 block mb-2">
              {t.budgetPrefLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Budget */}
              <button
                onClick={() => setTier('budget')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  tier === 'budget'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="text-sm font-bold text-neutral-900 flex items-center justify-between">
                  <span>{t.budgetTierBudget}</span>
                  {tier === 'budget' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  ເຮືອນພັກ, ອາຫານທ້ອງຖິ່ນ, ລົດເມ/ລົດໄຟ 2nd class
                </p>
              </button>

              {/* Standard */}
              <button
                onClick={() => setTier('standard')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  tier === 'standard'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="text-sm font-bold text-neutral-900 flex items-center justify-between">
                  <span>{t.budgetTierStandard}</span>
                  {tier === 'standard' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  ໂຮງແຮມ 3 ດາວ, ຮ້ານອາຫານແຄມນ້ຳ, ລົດໄຟ EMU
                </p>
              </button>

              {/* Luxury */}
              <button
                onClick={() => setTier('luxury')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  tier === 'luxury'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="text-sm font-bold text-neutral-900 flex items-center justify-between">
                  <span>{t.budgetTierLuxury}</span>
                  {tier === 'luxury' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  ຣີສອດ 4-5 ດາວ, ອາຫານຟາຍໄດນິງ, ລົດ VIP / ຖ້ຽວບິນ
                </p>
              </button>
            </div>
          </div>

          {/* Selected Provinces Pill selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-800">
                {t.selectedProvincesLabel} ({selectedIds.length} ແຂວງ):
              </span>
              <span className="text-neutral-500 text-[11px]">
                ກົດເພື່ອເລືອກ ຫຼື ຍົກເລີກ
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-neutral-50 rounded-xl border border-neutral-200">
              {provinces.map((prov) => {
                const isSelected = selectedIds.includes(prov.id);
                return (
                  <button
                    key={prov.id}
                    onClick={() => toggleProvinceSelection(prov.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                    }`}
                  >
                    {prov.name[currentLang].replace('ແຂວງ ', '').replace('แขวง', '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Total Cost Display Highlight */}
          <div className="bg-gradient-to-r from-emerald-900 via-neutral-900 to-neutral-950 rounded-2xl p-5 sm:p-6 text-white shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                  {t.totalEstimatedCost}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5 tabular-nums">
                  {formatCost(totalLAK)}
                </div>
              </div>

              <div className="text-xs text-neutral-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
                <span>{t.perPersonPerDay}: </span>
                <strong className="text-emerald-300 font-bold tabular-nums">
                  {formatCost(perPersonPerDayLAK)}
                </strong>
              </div>
            </div>

            {/* Visual Progress Bar Ratio */}
            <div className="space-y-1.5 pt-1">
              <div className="h-2.5 w-full bg-white/15 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${(totalAccommodation / totalLAK) * 100}%` }}
                  className="bg-blue-500 h-full"
                  title="Accommodation"
                />
                <div
                  style={{ width: `${(totalFood / totalLAK) * 100}%` }}
                  className="bg-amber-500 h-full"
                  title="Food"
                />
                <div
                  style={{ width: `${(totalTransport / totalLAK) * 100}%` }}
                  className="bg-emerald-500 h-full"
                  title="Transport"
                />
                <div
                  style={{ width: `${(totalActivities / totalLAK) * 100}%` }}
                  className="bg-purple-500 h-full"
                  title="Activities"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-300 flex-wrap gap-2 pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                  <span>ທີ່ພັກ {Math.round((totalAccommodation / totalLAK) * 100)}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  <span>ອາຫານ {Math.round((totalFood / totalLAK) * 100)}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span>ເດີນທາງ {Math.round((totalTransport / totalLAK) * 100)}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>
                  <span>ປີ້ກິດຈະກຳ {Math.round((totalActivities / totalLAK) * 100)}%</span>
                </span>
              </div>
            </div>
          </div>

          {/* 4 Cost Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Accommodation */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.breakdownAccommodation.split(' ')[0]}</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 tabular-nums">
                {formatCost(totalAccommodation)}
              </div>
              <p className="text-[10px] text-neutral-500">
                {roomsCount} ຫ້ອງ × {days} ຄືນ
              </p>
            </div>

            {/* Food */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.breakdownFood.split(' ')[0]}</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 tabular-nums">
                {formatCost(totalFood)}
              </div>
              <p className="text-[10px] text-neutral-500">
                {travelers} ຄົນ × 3 ຄາບ × {days} ມື້
              </p>
            </div>

            {/* Transport */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                <Car className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.breakdownTransport.split(' ')[0]}</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 tabular-nums">
                {formatCost(totalTransport)}
              </div>
              <p className="text-[10px] text-neutral-500">
                ລົດໄຟ/ລົດຕູ້ {selectedIds.length} ແຂວງ
              </p>
            </div>

            {/* Activities */}
            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                <Ticket className="w-3.5 h-3.5 text-purple-600" />
                <span>{t.breakdownActivities.split(' ')[0]}</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 tabular-nums">
                {formatCost(totalActivities)}
              </div>
              <p className="text-[10px] text-neutral-500">
                ຄ່າປີ້ຕາດ, ວັດ, ຖ້ຳ
              </p>
            </div>
          </div>

          {/* Practical advice */}
          <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-neutral-700">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-emerald-950 font-semibold">ຄຳແນະນຳງົບປະມານ: </strong>
              {t.budgetTipText}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between gap-3">
          <button
            onClick={handleCopyBudget}
            className="py-2 px-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'ສຳເນົາງົບແລ້ວ!' : 'ສຳເນົາລາຍລະອຽດງົບ'}</span>
          </button>

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
