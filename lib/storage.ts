export const STORAGE_KEYS = {
  name: "protein-calculator-user-name",
  onboarded: "protein-calculator-onboarded",
  preferences: "protein-calculator-preferences",
} as const;

function isStorageAvailable(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const testKey = "__protein_calculator_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getItem(key: string): string | null {
  if (!isStorageAvailable()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setItem(key: string, value: string): boolean {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeItem(key: string): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // no-op: storage unavailable or blocked
  }
}

export function clearAppData(): void {
  Object.values(STORAGE_KEYS).forEach(removeItem);
}
