import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation (default: 30)
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number = 30): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Creates a tooltip-friendly version of text for display
 * @param text - The original text
 * @param maxLength - Maximum length before truncation
 * @returns Object with displayText and full text for tooltip
 */
export function createTruncatedDisplay(text: string, maxLength: number = 30) {
  const displayText = truncateText(text, maxLength);
  const isTruncated = text.length > maxLength;
  
  return {
    displayText,
    fullText: text,
    isTruncated,
  };
}
