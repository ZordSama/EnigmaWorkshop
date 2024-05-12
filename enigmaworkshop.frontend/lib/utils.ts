import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasKey(obj: any, key: string): obj is any {
  return obj.hasOwnProperty(key);
}

export function hasLeastOneKey(obj: any, keys: string[]): obj is any {
  return keys.some((key) => obj.hasOwnProperty(key));
}
