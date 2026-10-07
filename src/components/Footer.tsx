import React from 'react';
import { Language } from '../types/travel';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  onOpenCalculator: () => void;
  onOpenBudgetCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenCalculator,
  onOpenBudgetCalculator,
}) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-white border-t border-neutral-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-100">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xl font-bold tracking-tight text-neutral-900 block">
              {t.siteTitle}
            </span>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm leading-relaxed">
              {t.tagline} · ຄູ່ມືການທ່ອງທ່ຽວລາວແບບຄົບວົງຈອນ ພ້ອມຂໍ້ມູນໄລຍະທາງກິໂລແມັດ, ເວລາເດີນທາງດ້ວຍລົດ, ຖ້ຽວບິນ ແລະ ລົດໄຟລາວ-ຈີນ.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
              {t.filterByRegion}
            </span>
            <ul className="text-xs text-neutral-600 space-y-2">
              <li>{t.northRegion}</li>
              <li>{t.centralRegion}</li>
              <li>{t.southRegion}</li>
              <li>18 ແຂວງ ແລະ ນະຄອນຫຼວງ</li>
            </ul>
          </div>

          {/* Tools & Links */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
              ເຄື່ອງມືການເດີນທາງ
            </span>
            <ul className="text-xs text-neutral-600 space-y-2">
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  {t.calculatorTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBudgetCalculator}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left text-emerald-800 font-semibold"
                >
                  {t.budgetCalcTitle}
                </button>
              </li>
              <li>
                <a href="#interactive-map" className="hover:text-emerald-700 transition-colors">
                  {t.mapView}
                </a>
              </li>
              <li>
                <a href="#travel-tips" className="hover:text-emerald-700 transition-colors">
                  {t.travelTipsTitle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
          <span>{t.footerRights}</span>
          <div className="flex items-center gap-3">
            <span>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</span>
            <span aria-hidden="true">·</span>
            <span>Lao PDR 360°</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
