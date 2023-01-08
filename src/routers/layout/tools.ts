export function getLocalStorage<T>(searchName: string, defaultRes: T) {
  if (!localStorage.getItem(searchName)) {
    localStorage.setItem(searchName, JSON.stringify(defaultRes));
  }
  return JSON.parse(localStorage.getItem(searchName) as string);
}
export function setLocalstorage(itemName: string, targetRes: unknown): void {
  localStorage.setItem(itemName, JSON.stringify(targetRes));
}
