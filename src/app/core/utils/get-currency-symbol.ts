export const getCurrencySymbol = (currencyCode: string): string => {
  const symbols: Record<string, string> = {
    UAH: '₴',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CNY: '¥',
    INR: '₹',
    KRW: '₩',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
    SEK: 'kr',
    NOK: 'kr',
    DKK: 'kr',
    PLN: 'zł',
    TRY: '₺',
    THB: '฿',
    VND: '₫',
  };
  return symbols[currencyCode.toUpperCase()] || currencyCode;
};
