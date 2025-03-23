export { IDENTIFIERS, getUrl } from './urlHelper';

export function countDots(str: string) {
  return (str.match(/\./g) || []).length;
}

export function countCommas(str: string) {
  return (str.match(/,/g) || []).length;
}

export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

export const maskEmail = (email: string): string => {
  const visibleStart = email.slice(0, 3); // First 3 characters
  const visibleEnd = email.slice(-4); // Last 4 characters
  const hiddenLength = email.length - (visibleStart.length + visibleEnd.length);

  return visibleStart + '*'.repeat(hiddenLength) + visibleEnd;
};
