export { validateWeight, validateBodyFat } from "./calculations";

export function sanitizeName(raw: string): string {
  return raw.trim().slice(0, 40);
}
