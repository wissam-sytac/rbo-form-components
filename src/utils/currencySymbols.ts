const currencySymbols = {
  EUR: '\u20AC',
  USD: '$',
};

export default function(currency: string) {
  return currencySymbols[currency] || '';
}
