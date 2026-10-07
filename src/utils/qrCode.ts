import QRCode from 'qrcode';
import { Province, Language } from '../types/travel';

export interface QROptions {
  width?: number;
  margin?: number;
  darkColor?: string;
  lightColor?: string;
}

/**
 * Returns a canonical shareable URL for a specific province
 */
export function getProvinceShareUrl(provinceId: string): string {
  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    return `${origin}${pathname}?province=${encodeURIComponent(provinceId)}`;
  }
  return `https://laos-travel.app/?province=${encodeURIComponent(provinceId)}`;
}

/**
 * Generates a high-resolution QR code Data URL (PNG) for a given province
 */
export async function generateProvinceQrDataUrl(
  province: Province,
  options?: QROptions
): Promise<string> {
  const url = getProvinceShareUrl(province.id);

  return QRCode.toDataURL(url, {
    width: options?.width || 360,
    margin: options?.margin ?? 2,
    color: {
      dark: options?.darkColor || '#047857', // Emerald green brand color
      light: options?.lightColor || '#ffffff',
    },
    errorCorrectionLevel: 'M',
  });
}

/**
 * Generates an SVG string representation of the QR code
 */
export async function generateProvinceQrSvg(
  province: Province,
  options?: QROptions
): Promise<string> {
  const url = getProvinceShareUrl(province.id);

  return QRCode.toString(url, {
    type: 'svg',
    width: options?.width || 360,
    margin: options?.margin ?? 2,
    color: {
      dark: options?.darkColor || '#047857',
      light: options?.lightColor || '#ffffff',
    },
    errorCorrectionLevel: 'M',
  });
}

/**
 * Triggers downloading the QR code image as a PNG file
 */
export function downloadQrCodeImage(dataUrl: string, fileName: string): void {
  if (typeof document === 'undefined') return;
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copies the link or province summary to clipboard
 */
export async function copyProvinceLink(provinceId: string): Promise<boolean> {
  const url = getProvinceShareUrl(provinceId);
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard write failed, using fallback', err);
  }

  // Fallback for older browsers / iframes
  try {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (e) {
    return false;
  }
}
