export const getSessionsStorage = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setSessionsStorage = (key: string, data: string): void => {
  try {
    sessionStorage.setItem(key, data);
  } catch (error) {
    console.error(error);
  }
};

export const clearSessionsStorage = (): void => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error(error);
  }
};
