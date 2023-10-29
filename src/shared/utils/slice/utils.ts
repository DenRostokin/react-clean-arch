export const generateKeyWithPrefix = (prefix: string, key: string) => prefix + key.charAt(0).toUpperCase() + key.slice(1);

export const generateSliceName = (sliceName: string, subSliceName: string) => `${sliceName}/${subSliceName}`;
