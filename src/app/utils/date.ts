
// convert the string to(ISO) (ISO) or Date в ISO-строку.
export const toISOString = (input: Date | string | null | undefined): string | null => {
  if (!input) return null;
  if (typeof input === "string") return new Date(input).toISOString();
  return input.toISOString();
};


//   convert the string to(ISO) (ISO) or Date в Date.

export const toDate = (input: Date | string | null | undefined): Date | null => {
  if (!input) return null;
  if (input instanceof Date) return input;
  return new Date(input);
};

