export function getLocalStorage<T>(searchName: string, defaultRes: T): T {
  if (!localStorage) {
    return defaultRes;
  }
  if (!localStorage.getItem(searchName)) {
    localStorage.setItem(searchName, JSON.stringify(defaultRes));
  }
  return JSON.parse(localStorage.getItem(searchName) as string);
}
export function setLocalstorage(itemName: string, targetRes: unknown): void {
  if (localStorage) localStorage.setItem(itemName, JSON.stringify(targetRes));
}
