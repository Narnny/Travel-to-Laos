import React from 'react';
import { Language } from '../types/travel';
import { translations } from '../data/translations';
import { Banknote, Train, HeartHandshake, Wifi } from 'lucide-react';

interface TravelTipsSectionProps {
  currentLang: Language;
}

export const TravelTipsSection: React.FC<TravelTipsSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const tips = [
    {
      icon: Train,
      title: t.tipTrain,
      description: t.tipTrainDesc,
      tag: 'Transport',
    },
    {
      icon: Banknote,
      title: t.tipCurrency,
      description: t.tipCurrencyDesc,
      tag: 'Finance',
    },
    {
      icon: HeartHandshake,
      title: t.tipEtiquette,
      description: t.tipEtiquetteDesc,
      tag: 'Culture',
    },
    {
      icon: Wifi,
      title: t.tipSim,
      description: t.tipSimDesc,
      tag: 'Connectivity',
    },
  ];

  return (
    <section id="travel-tips" className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-10">
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
          Travel Guide & Advice
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {t.travelTipsTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <div
              key={idx}
              className="bg-neutral-800/80 rounded-xl p-5 border border-neutral-700/60 flex items-start gap-4 hover:border-neutral-600 transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/50 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-white text-base">
                  {tip.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
