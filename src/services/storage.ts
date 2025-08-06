export const getLocalStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setLocalStorage = (key: string, data: string): void => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.error(error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(error);
  }
};
