export const SessionStorageUtil = {
    setItem<T>(key: string, value: T): void {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`[SessionStorage] Error setting key "${key}"`, error);
        }
    },

    getItem<T>(key: string): T | null {
        try {
            const value = sessionStorage.getItem(key);
            return value ? (JSON.parse(value) as T) : null;
        } catch (error) {
            console.error(`[SessionStorage] Error parsing key "${key}"`, error);
            return null;
        }
    },

    removeItem(key: string): void {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error(`[SessionStorage] Error removing key "${key}"`, error);
        }
    },
};
