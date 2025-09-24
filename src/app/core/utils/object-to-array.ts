export const objectToArray = (obj: Record<string, any>): Record<string, any>[] =>
  Object.entries(obj).map(([key, value]) => ({[key]: value}));
