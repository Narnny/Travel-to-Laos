import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Province, Language } from '../types/travel';
import { translations } from '../data/translations';
import { getDishesForProvince } from '../data/dishesData';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Camera,
  MapPin,
  Utensils,
  Sparkles,
} from 'lucide-react';

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  category: 'landmark' | 'nature' | 'heritage' | 'cuisine' | 'panorama';
}

interface ProvincePhotoCarouselProps {
  province: Province;
  currentLang: Language;
}

export const ProvincePhotoCarousel: React.FC<ProvincePhotoCarouselProps> = ({
  province,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Compile dynamic photos for this province
  const photos = React.useMemo<GalleryPhoto[]>(() => {
    const list: GalleryPhoto[] = [];
    const seenUrls = new Set<string>();

    // 1. Hero Image
    if (province.heroImage && !seenUrls.has(province.heroImage)) {
      seenUrls.add(province.heroImage);
      list.push({
        id: 'hero',
        url: province.heroImage,
        title: province.name[currentLang],
        subtitle: province.tagline[currentLang],
        category: 'panorama',
      });
    }

    // 2. Attractions with images
    province.attractions.forEach((attr) => {
      if (attr.image && !seenUrls.has(attr.image)) {
        seenUrls.add(attr.image);
        list.push({
          id: `attr-${attr.id}`,
          url: attr.image,
          title: attr.name[currentLang],
          subtitle: attr.highlights[currentLang],
          category: attr.category === 'unesco' ? 'heritage' : 'nature',
        });
      }
    });

    // 3. Signature dishes with images
    const dishes = getDishesForProvince(province.id);
    dishes.forEach((dish) => {
      if (dish.image && !seenUrls.has(dish.image)) {
        seenUrls.add(dish.image);
        list.push({
          id: `dish-${dish.id}`,
          url: dish.image,
          title: dish.name[currentLang],
          subtitle: dish.tasteProfile[currentLang],
          category: 'cuisine',
        });
      }
    });

    // 4. Any explicit galleryImages
    if (province.galleryImages) {
      province.galleryImages.forEach((imgUrl, idx) => {
        if (!seenUrls.has(imgUrl)) {
          seenUrls.add(imgUrl);
          list.push({
            id: `gallery-${idx}`,
            url: imgUrl,
            title: `${province.name[currentLang]} - ມຸມມອງທີ ${idx + 1}`,
            category: 'landmark',
          });
        }
      });
    }

    // 5. If fewer than 3 photos, enrich with contextual iconic assets
    if (list.length < 3) {
      const fallbackPool = [
        {
          url: '/images/laos_wat_xieng_thong_temple_1791336810412.jpg',
          title: 'ສິລະປະວັດວາອາຮາມລ້ານຊ້າງບູຮານ (Lao Ancient Heritage)',
          category: 'heritage' as const,
        },
        {
          url: '/images/laos_vang_vieng_blue_lagoon_1791336837367.jpg',
          title: 'ສາຍນ້ຳທຳມະຊາດສີຟ້າມໍລະກົດ (Emerald River & Lagoon)',
          category: 'nature' as const,
        },
        {
          url: '/images/lao_cuisine_or_lam_kaipen_1791279226086.jpg',
          title: 'ວັດທະນະທຳອາຫານພື້ນເມືອງລາວດັ້ງເດີມ (Traditional Lao Cuisine)',
          category: 'cuisine' as const,
        },
      ];

      for (const item of fallbackPool) {
        if (list.length >= 3) break;
        if (!seenUrls.has(item.url)) {
          seenUrls.add(item.url);
          list.push({
            id: `curated-${list.length}`,
            url: item.url,
            title: item.title,
            category: item.category,
          });
        }
      }
    }

    return list;
  }, [province, currentLang]);

  // Reset index when province changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [province.id]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Slideshow auto-advance
  useEffect(() => {
    if (!isPlaying || photos.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, photos.length, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape' && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div className="relative w-full bg-neutral-950 select-none overflow-hidden group/carousel">
      {/* Main Image Viewport (16:9 Aspect Ratio) */}
      <div
        className="relative aspect-16/9 w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={currentPhoto.url}
          src={resolveImageUrl(currentPhoto.url)}
          alt={currentPhoto.title}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover transition-all duration-700 ease-out animate-in fade-in zoom-in-102"
        />

        {/* Ambient Gradient Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/50 pointer-events-none" />

        {/* Top Floating Controls Bar */}
        <div className="absolute top-4 left-4 right-16 flex items-center justify-between gap-2 z-10">
          {/* Photo Counter Pill */}
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold border border-white/10 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span className="tabular-nums">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>

          {/* Autoplay & Fullscreen Actions */}
          <div className="flex items-center gap-1.5">
            {photos.length > 1 && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-1.5 rounded-full backdrop-blur-md text-white transition-colors cursor-pointer border border-white/15 ${
                  isPlaying ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-black/50 hover:bg-black/70'
                }`}
                title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            )}

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/15"
              title={t.viewFullscreen}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Previous & Next Carousel Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer border border-white/10 opacity-80 sm:opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer border border-white/10 opacity-80 sm:opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Slide Info & Caption */}
        <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white pointer-events-none z-10">
          <div className="flex items-center gap-2 text-xs font-semibold mb-1">
            <span className="text-emerald-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{province.capitalName[currentLang]}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-400">·</span>
            <span className="text-neutral-300">
              {province.region === 'north'
                ? t.northRegion
                : province.region === 'central'
                ? t.centralRegion
                : t.southRegion}
            </span>

            {/* Category tag */}
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] bg-white/15 backdrop-blur-md px-2 py-0.5 rounded-sm text-neutral-200 border border-white/10">
              {currentPhoto.category === 'cuisine' ? (
                <>
                  <Utensils className="w-3 h-3 text-amber-300" />
                  <span>{currentLang === 'lo' ? 'ອາຫານປະຈຳຖິ່ນ' : currentLang === 'th' ? 'อาหารท้องถิ่น' : 'Local Cuisine'}</span>
                </>
              ) : currentPhoto.category === 'heritage' ? (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  <span>{currentLang === 'lo' ? 'ມໍລະດົກວັດທະນະທຳ' : currentLang === 'th' ? 'มรดกวัฒนธรรม' : 'Cultural Heritage'}</span>
                </>
              ) : (
                <>
                  <Camera className="w-3 h-3 text-emerald-300" />
                  <span>{currentLang === 'lo' ? 'ທິວທັດທຳມະຊາດ' : currentLang === 'th' ? 'ทัศนียภาพธรรมชาติ' : 'Nature & Landscape'}</span>
                </>
              )}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white drop-shadow-md line-clamp-1">
            {currentPhoto.title}
          </h2>

          {currentPhoto.subtitle && (
            <p className="text-xs sm:text-sm text-neutral-200 mt-0.5 line-clamp-1 max-w-2xl drop-shadow-xs">
              {currentPhoto.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Thumbnail Strip (Bottom Bar) */}
      {photos.length > 1 && (
        <div className="bg-neutral-900/95 border-t border-white/10 px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider shrink-0 pl-1">
            {t.allPhotos} ({photos.length}):
          </span>

          <div className="flex items-center gap-2">
            {photos.map((photo, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={photo.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer group ${
                    isActive
                      ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/40'
                  }`}
                  title={photo.title}
                >
                  <img
                    src={resolveImageUrl(photo.url)}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200 select-none">
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between text-white z-10 pb-2">
            <div>
              <h3 className="font-bold text-base sm:text-lg">{currentPhoto.title}</h3>
              <p className="text-xs text-neutral-400">{province.name[currentLang]} · {currentPhoto.subtitle || province.tagline[currentLang]}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 bg-white/10 px-2.5 py-1 rounded-full tabular-nums">
                {currentIndex + 1} / {photos.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                title={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={resolveImageUrl(currentPhoto.url)}
              alt={currentPhoto.title}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
            />

            {/* Navigation Arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-black text-white transition-all cursor-pointer border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-black text-white transition-all cursor-pointer border border-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Thumbnails */}
          {photos.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {photos.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    idx === currentIndex
                      ? 'border-emerald-500 scale-105 shadow-md'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
