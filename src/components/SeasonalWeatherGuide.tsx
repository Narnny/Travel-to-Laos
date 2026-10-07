import React from 'react';
import { Language } from '../types/travel';
import { translations } from '../data/translations';
import { CloudSun, SunMedium, CloudRain, MessageSquare, Volume2 } from 'lucide-react';

interface SeasonalWeatherGuideProps {
  currentLang: Language;
}

export const SeasonalWeatherGuide: React.FC<SeasonalWeatherGuideProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const travelPhrases = [
    {
      lao: 'ສະບາຍດີ',
      phonetic: 'Sa-bai-dee',
      meaning: { lo: 'ຄຳທັກທາຍ ສະບາຍດີທຸກເວລາ', th: 'สวัสดี', en: 'Hello / Greetings' },
    },
    {
      lao: 'ຂອບໃຈ',
      phonetic: 'Khop-chai',
      meaning: { lo: 'ຂອບໃຈ (ຂອບໃຈຫຼາຍໆ)', th: 'ขอบคุณ', en: 'Thank you' },
    },
    {
      lao: 'ລາຄາເທົ່າໃດ?',
      phonetic: 'La-kha thao dai?',
      meaning: { lo: 'ຖາມລາຄາສິນຄ້າ ຫຼື ຄ່າລົດ', th: 'ราคาเท่าไหร่?', en: 'How much is it?' },
    },
    {
      lao: 'ແຊບຫຼາຍ',
      phonetic: 'Saep lai',
      meaning: { lo: 'ຊົມອາຫານວ່າແຊບຫຼາຍ', th: 'อร่อยมาก', en: 'Very delicious!' },
    },
    {
      lao: 'ໄປໃສ?',
      phonetic: 'Pai sai?',
      meaning: { lo: 'ຈະໄປໃສ ຫຼື ຖາມທາງ', th: 'ไปไหน?', en: 'Where are you going?' },
    },
    {
      lao: 'ບໍ່ເປັນຫຍັງ',
      phonetic: 'Bor pen yang',
      meaning: { lo: 'ບໍ່ເປັນຫຍັງ, ດ້ວຍຄວາມຍິນດີ', th: 'ไม่เป็นไร', en: 'No worries / You are welcome' },
    },
  ];

  return (
    <section className="space-y-8">
      {/* 3 Seasons in Laos */}
      <div className="bg-gradient-to-br from-emerald-900 via-neutral-900 to-neutral-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-800/40 shadow-sm">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
            Climate & Best Seasons
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t.seasonGuideTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cool Season */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:border-emerald-400/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3">
              <CloudSun className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">{t.seasonDry}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {t.seasonDryDesc}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-emerald-400">
              ✓ ເໝາະສຸດ: ຫຼວງພະບາງ, ຊຽງຂວາງ, ວັງວຽງ
            </div>
          </div>

          {/* Hot Season */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:border-amber-400/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3">
              <SunMedium className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">{t.seasonHot}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {t.seasonHotDesc}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-amber-400">
              ✓ ເໝາະສຸດ: ວັງວຽງ (ລ່ອງນ້ຳຊອງ), ສີ່ພັນດອນ
            </div>
          </div>

          {/* Green Season */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:border-teal-400/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center mb-3">
              <CloudRain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">{t.seasonRainy}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {t.seasonRainyDesc}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-teal-400">
              ✓ ເໝາະສຸດ: ນ້ຳຕົກຕາດກວາງຊີ, ຕາດຟານ, ປ່າສະຫງວນ
            </div>
          </div>
        </div>
      </div>

      {/* Useful Lao Phrases for Travelers */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-xs">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wide">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Language & Etiquette</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mt-0.5">
              {t.essentialPhrasesTitle}
            </h3>
          </div>
          <span className="text-xs text-neutral-500 hidden sm:inline">
            ຝຶກເວົ້າພາສາລາວເພື່ອຄວາມປະທັບໃຈ
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {travelPhrases.map((phrase, idx) => (
            <div
              key={idx}
              className="bg-neutral-50 hover:bg-emerald-50/60 transition-colors p-3.5 rounded-xl border border-neutral-200 hover:border-emerald-200 text-center space-y-1"
            >
              <div className="text-base sm:text-lg font-bold text-neutral-950 font-sans">
                {phrase.lao}
              </div>
              <div className="text-xs font-medium text-emerald-700 flex items-center justify-center gap-1">
                <Volume2 className="w-3 h-3 shrink-0" />
                <span>{phrase.phonetic}</span>
              </div>
              <div className="text-[11px] text-neutral-500 pt-1 line-clamp-1 border-t border-neutral-200/60 mt-1">
                {phrase.meaning[currentLang]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
