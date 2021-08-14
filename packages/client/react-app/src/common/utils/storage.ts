/* Retrieve layout from local storage. */
export const getFromLS = (key: string): string | null =>
    window.localStorage?.getItem(key) ? JSON.parse(window.localStorage.getItem(key) || '') : null;

/* Save layout to local storage. */
export const saveToLS = (key: string, value: string | number | object) =>
    window.localStorage && window.localStorage.setItem(key, JSON.stringify(value));
