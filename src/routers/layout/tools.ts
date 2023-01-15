export class Storage<T> {
  itemName: string;
  constructor(itemName: string) {
    this.itemName = itemName;
  }
  private getStorage(Storagename: globalThis.Storage, defaultRes: T): T {
    if (!Storagename) {
      return Storagename;
    }
    if (!Storagename.getItem(this.itemName)) {
      Storagename.setItem(this.itemName, JSON.stringify(defaultRes));
    }
    return JSON.parse(Storagename.getItem(this.itemName) as string);
  }
  private setStorage(Storagename: globalThis.Storage, targetRes: T): void {
    if (Storagename)
      Storagename.setItem(this.itemName, JSON.stringify(targetRes));
  }
  getLocalStorage(defaultRes: T): T {
    return this.getStorage(localStorage, defaultRes);
  }
  getSessionStorage(defaultRes: T): T {
    return this.getStorage(sessionStorage, defaultRes);
  }
  setLocalstorage(targetRes: T): void {
    this.setStorage(localStorage, targetRes);
  }
  setSessionStorage(targetRes: T): void {
    this.setStorage(sessionStorage, targetRes);
  }
}
