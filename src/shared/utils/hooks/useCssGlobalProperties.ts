export const useCssGlobalProperties = (name: string) => {
  return getComputedStyle(document.documentElement, null).getPropertyValue(name);
}
