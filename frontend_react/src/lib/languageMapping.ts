// Language code to language name mapping
export const LANGUAGE_MAPPING: Record<string, string> = {
  'en': 'English',
  'hi': 'हिंदी (Hindi)',
  'bn': 'বাংলা (Bengali)',
  'te': 'తెలుగు (Telugu)',
  'mr': 'मराठी (Marathi)',
  'ta': 'தமிழ் (Tamil)',
  'gu': 'ગુજરાતી (Gujarati)',
  'kn': 'ಕನ್ನಡ (Kannada)',
  'ml': 'മലയാളം (Malayalam)',
  'pa': 'ਪੰਜਾਬੀ (Punjabi)',
  'or': 'ଓଡ଼ିଆ (Odia)',
  'as': 'অসমীয়া (Assamese)',
  'ur': 'اردو (Urdu)',
  'sa': 'संस्कृत (Sanskrit)',
  'ne': 'नेपाली (Nepali)',
  'si': 'සිංහල (Sinhala)',
  'my': 'မြန်မာ (Myanmar)',
  'ar': 'العربية (Arabic)',
  'fr': 'Français (French)',
  'es': 'Español (Spanish)',
  'de': 'Deutsch (German)',
  'ru': 'Русский (Russian)',
  'ja': '日本語 (Japanese)',
  'ko': '한국어 (Korean)',
  'zh': '中文 (Chinese)',
  'pt': 'Português (Portuguese)',
  'it': 'Italiano (Italian)',
  'nl': 'Nederlands (Dutch)',
  'tr': 'Türkçe (Turkish)',
  'pl': 'Polski (Polish)',
  'sv': 'Svenska (Swedish)',
  'da': 'Dansk (Danish)',
  'no': 'Norsk (Norwegian)',
  'fi': 'Suomi (Finnish)',
  'he': 'עברית (Hebrew)',
  'th': 'ไทย (Thai)',
  'vi': 'Tiếng Việt (Vietnamese)',
  'id': 'Bahasa Indonesia (Indonesian)',
  'ms': 'Bahasa Melayu (Malay)',
  'tl': 'Filipino (Filipino)',
  'sw': 'Kiswahili (Swahili)',
  'am': 'አማርኛ (Amharic)',
  'ha': 'Hausa',
  'yo': 'Yorùbá (Yoruba)',
  'ig': 'Igbo',
  'zu': 'isiZulu (Zulu)',
  'af': 'Afrikaans',
  'fa': 'فارسی (Persian)',
  'ps': 'پښتو (Pashto)',
  'sd': 'سنڌي (Sindhi)',
  'ks': 'कॉशुर (Kashmiri)',
  'dv': 'ދިވެހި (Dhivehi)',
  'bo': 'བོད་ཡིག (Tibetan)',
  'mn': 'Монгол (Mongolian)',
  'ky': 'Кыргызча (Kyrgyz)',
  'kk': 'Қазақша (Kazakh)',
  'uz': 'Oʻzbekcha (Uzbek)',
  'tg': 'Тоҷикӣ (Tajik)',
  'tk': 'Türkmençe (Turkmen)',
  'az': 'Azərbaycanca (Azerbaijani)',
  'hy': 'Հայերեն (Armenian)',
  'ka': 'ქართული (Georgian)',
  'eu': 'Euskera (Basque)',
  'ca': 'Català (Catalan)',
  'gl': 'Galego (Galician)',
  'cy': 'Cymraeg (Welsh)',
  'ga': 'Gaeilge (Irish)',
  'gd': 'Gàidhlig (Scottish Gaelic)',
  'is': 'Íslenska (Icelandic)',
  'mt': 'Malti (Maltese)',
  'sq': 'Shqip (Albanian)',
  'mk': 'Македонски (Macedonian)',
  'bg': 'Български (Bulgarian)',
  'ro': 'Română (Romanian)',
  'hr': 'Hrvatski (Croatian)',
  'sr': 'Српски (Serbian)',
  'bs': 'Bosanski (Bosnian)',
  'me': 'Crnogorski (Montenegrin)',
  'sl': 'Slovenščina (Slovenian)',
  'sk': 'Slovenčina (Slovak)',
  'cs': 'Čeština (Czech)',
  'hu': 'Magyar (Hungarian)',
  'et': 'Eesti (Estonian)',
  'lv': 'Latviešu (Latvian)',
  'lt': 'Lietuvių (Lithuanian)',
  'be': 'Беларуская (Belarusian)',
  'uk': 'Українська (Ukrainian)',
  'el': 'Ελληνικά (Greek)',
  'la': 'Latina (Latin)',
};

/**
 * Decode a language code to its proper language name
 * @param code - The language code (e.g., 'en', 'hi', 'bn')
 * @returns The decoded language name or the original code if not found
 */
export function decodeLanguage(code: string): string {
  return LANGUAGE_MAPPING[code.toLowerCase()] || code;
}

/**
 * Decode an array of language codes to their proper language names
 * @param codes - Array of language codes
 * @returns Array of decoded language names
 */
export function decodeLanguages(codes: string[]): string[] {
  return codes.map(code => decodeLanguage(code));
}

/**
 * Check if a language code is valid (exists in our mapping)
 * @param code - The language code to check
 * @returns True if the code exists in our mapping
 */
export function isValidLanguageCode(code: string): boolean {
  return code.toLowerCase() in LANGUAGE_MAPPING;
} 