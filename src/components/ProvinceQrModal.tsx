import React, { useState, useEffect } from 'react';
import { Province, Language } from '../types/travel';
import { translations } from '../data/translations';
import {
  generateProvinceQrDataUrl,
  downloadQrCodeImage,
  copyProvinceLink,
  getProvinceShareUrl,
} from '../utils/qrCode';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';
import {
  X,
  QrCode,
  Download,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Smartphone,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface ProvinceQrModalProps {
  province: Province | null;
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const ProvinceQrModal: React.FC<ProvinceQrModalProps> = ({
  province,
  currentLang,
  isOpen,
  onClose,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  const t = translations[currentLang];

  useEffect(() => {
    if (!province || !isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    generateProvinceQrDataUrl(province, {
      width: 380,
      margin: 2,
      darkColor: '#065f46', // emerald-800
      lightColor: '#ffffff',
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error('Failed to generate QR code', err);
        if (isMounted) setIsGenerating(false);
      });

    return () => {
      isMounted = false;
    };
  }, [province, isOpen]);

  if (!isOpen || !province) return null;

  const provinceName = province.name[currentLang];
  const shareUrl = getProvinceShareUrl(province.id);

  const handleCopyLink = async () => {
    const success = await copyProvinceLink(province.id);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const cleanName = province.id.replace(/[^a-zA-Z0-9_-]/g, '_');
    downloadQrCodeImage(qrDataUrl, `laos_travel_qr_${cleanName}.png`);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${provinceName} - ທ່ຽວລາວ 18 ແຂວງ`,
          text: province.tagline[currentLang],
          url: shareUrl,
        });
      } catch (e) {
        // user cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Header with Emerald Gradient */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-snug">
                {currentLang === 'lo'
                  ? 'ແບ່ງປັນດ້ວຍ QR Code'
                  : currentLang === 'th'
                  ? 'แชร์ผ่าน QR Code'
                  : 'Share via QR Code'}
              </h3>
              <p className="text-xs text-emerald-100 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-300" />
                <span>{provinceName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 flex flex-col items-center text-center">
          {/* Province Preview Card */}
          <div className="w-full bg-neutral-50 rounded-xl p-3 border border-neutral-200 flex items-center gap-3 text-left">
            <img
              src={resolveImageUrl(province.heroImage)}
              alt={provinceName}
              onError={handleImageError}
              className="w-14 h-14 rounded-lg object-cover shrink-0 shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>{province.capitalName[currentLang]}</span>
              </div>
              <h4 className="font-bold text-sm text-neutral-900 truncate">
                {provinceName}
              </h4>
              <p className="text-xs text-neutral-500 line-clamp-1">
                {province.tagline[currentLang]}
              </p>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="relative p-4 bg-white rounded-2xl border-2 border-emerald-100 shadow-md flex items-center justify-center min-w-[240px] min-h-[240px]">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-2 text-neutral-400">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">
                  {currentLang === 'lo'
                    ? 'ກຳລັງສ້າງ QR Code...'
                    : currentLang === 'th'
                    ? 'กำลังสร้าง QR Code...'
                    : 'Generating QR Code...'}
                </span>
              </div>
            ) : qrDataUrl ? (
              <div className="flex flex-col items-center">
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${provinceName}`}
                  className="w-52 h-52 object-contain"
                />
                <span className="text-[11px] font-medium text-emerald-800 mt-1 flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-emerald-600" />
                  {currentLang === 'lo'
                    ? 'ສະແກນດ້ວຍກ້ອງມືຖືເພື່ອເບິ່ງຂໍ້ມູນ'
                    : currentLang === 'th'
                    ? 'สแกนด้วยกล้องมือถือเพื่อดูข้อมูล'
                    : 'Scan with phone camera to view'}
                </span>
              </div>
            ) : null}
          </div>

          {/* Deep link info */}
          <div className="w-full text-xs text-neutral-500 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 truncate font-mono text-left select-all">
            {shareUrl}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full pt-1">
            <button
              onClick={handleCopyLink}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                copied
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200 shadow-xs'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>
                    {currentLang === 'lo'
                      ? 'ຄັດລອກແລ້ວ!'
                      : currentLang === 'th'
                      ? 'คัดลอกแล้ว!'
                      : 'Copied!'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-500" />
                  <span>
                    {currentLang === 'lo'
                      ? 'ຄັດລອກລິ້ງ'
                      : currentLang === 'th'
                      ? 'คัดลอกลิงก์'
                      : 'Copy Link'}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              disabled={!qrDataUrl}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>
                {currentLang === 'lo'
                  ? 'ດາວໂຫຼດ QR'
                  : currentLang === 'th'
                  ? 'ดาวน์โหลด QR'
                  : 'Download QR'}
              </span>
            </button>

            <button
              onClick={handleNativeShare}
              className="col-span-2 sm:col-span-1 px-3 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-emerald-100" />
              <span>
                {currentLang === 'lo'
                  ? 'ແບ່ງປັນ'
                  : currentLang === 'th'
                  ? 'แชร์'
                  : 'Share'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
