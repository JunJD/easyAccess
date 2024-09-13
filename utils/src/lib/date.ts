
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepSearchAndParseDates = (obj: any, dateKeys: string[]): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const keys = Object.keys(obj);

  if (keys.length === 0) {
    return obj;
  }

  for (const key of keys) {
    let value = obj[key];

    if (dateKeys.includes(key) && typeof value === "string") {
      const parsedDate = new Date(value);
      if (!Number.isNaN(parsedDate.getTime())) {
        value = parsedDate;
      }
    }

    obj[key] = deepSearchAndParseDates(value, dateKeys);
  }

  return obj;
};
