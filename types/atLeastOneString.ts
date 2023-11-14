export type AtLeastOneString = [string, ...string[]];

export function isAtLeastOneString(arr: string[]): arr is AtLeastOneString {
  return arr.length > 0;
}
