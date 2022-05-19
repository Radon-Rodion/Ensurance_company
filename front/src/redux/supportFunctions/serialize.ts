function serialize<T>(obj: T, serializedName: string): void {
  localStorage.setItem(serializedName, JSON.stringify(obj));
}

export default serialize;
