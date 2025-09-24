export const arrayToObject = <T extends Record<string, any>>(arr: T[]): Record<string, any> =>
  arr.reduce((acc: Record<string, any>, item: T) => {
    const [key, value] = Object.entries(item)[0];
    acc[key] = value;
    return acc;
  }, {});
