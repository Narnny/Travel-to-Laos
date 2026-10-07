export type Language = 'lo' | 'th' | 'en';

export type RegionId = 'north' | 'central' | 'south';

export interface Attraction {
  id: string;
  name: {
    lo: string;
    th: string;
    en: string;
  };
  category: 'nature' | 'culture' | 'unesco' | 'adventure' | 'history' | 'viewpoint';
  description: {
    lo: string;
    th: string;
    en: string;
  };
  isTopPopular: boolean;
  rating: number; // e.g. 4.9
  suggestedDuration: string; // e.g. "2-3 ຊົ່ວໂມງ"
  image?: string;
  highlights: {
    lo: string;
    th: string;
    en: string;
  };
}

export interface TransportDetails {
  distanceKm: number; // from Vientiane
  carTimeHours: number; // hours by car/minivan
  carTimeDisplay: {
    lo: string;
    th: string;
    en: string;
  };
  flightTimeMinutes: number | null; // minutes if domestic flight exists, null if no airport
  flightDisplay: {
    lo: string;
    th: string;
    en: string;
  };
  trainAvailable: boolean; // Lao-China Railway
  trainTimeDisplay?: {
    lo: string;
    th: string;
    en: string;
  };
  recommendedRouteTip: {
    lo: string;
    th: string;
    en: string;
  };
}

export interface LocalDish {
  id: string;
  name: {
    lo: string;
    th: string;
    en: string;
  };
  description: {
    lo: string;
    th: string;
    en: string;
  };
  tasteProfile: {
    lo: string;
    th: string;
    en: string;
  };
  category: 'main' | 'snack' | 'drink' | 'soup' | 'dessert';
  image?: string;
  mustTry?: boolean;
}

export interface Province {
  id: string;
  name: {
    lo: string;
    th: string;
    en: string;
  };
  capitalName: {
    lo: string;
    th: string;
    en: string;
  };
  region: RegionId;
  heroImage: string;
  galleryImages?: string[];
  popularityRank: number; // 1 to 18
  isMustVisit: boolean;
  tagline: {
    lo: string;
    th: string;
    en: string;
  };
  description: {
    lo: string;
    th: string;
    en: string;
  };
  transport: TransportDetails;
  attractions: Attraction[];
  famousFood: {
    lo: string[];
    th: string[];
    en: string[];
  };
  signatureDishes?: LocalDish[];
  bestSeason: {
    lo: string;
    th: string;
    en: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}
