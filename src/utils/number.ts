import { NumberFormatter } from "@internationalized/number";

export const parsePrice = (price: string): number => {
  // Remove any non-digit, non-decimal point characters
  const cleanedPrice = price.replace(/[^0-9.,]/g, "");

  // Replace commas with points
  const normalizedPrice = cleanedPrice.replace(/,/g, ".");

  // Split by the decimal point and ensure only the last segment is treated as the fractional part
  const parts = normalizedPrice.split(".");

  if (parts.length > 2) {
    // If there are multiple decimal points, join all parts except the last as integer part
    const integerPart = parts.slice(0, parts.length - 1).join("");
    const fractionalPart = parts[parts.length - 1];
    return parseFloat(`${integerPart}.${fractionalPart}`);
  } else {
    return parseFloat(normalizedPrice);
  }
};

export const formatNumber = (
  amount: number,
  locale = "nl-NL",
  minimumFractionDigits = 2
) => {
  return new NumberFormatter(locale, {
    minimumFractionDigits,
    useGrouping: true,
  }).format(amount);
};

export const stringToNumber = (value: string): number =>
  parseFloat(value.replace(/\./g, ","));
