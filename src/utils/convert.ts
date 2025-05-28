export const getValueOrNull = <Type>(
  value: Type | null | undefined
): Type | null => {
  return value ?? null;
};

export const convertToValueOrUndefined = <Type>(
  value: Type | null | undefined
): Type | undefined => {
  return value ?? undefined;
};
