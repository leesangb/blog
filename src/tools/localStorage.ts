const THEME_TYPE = "THEME_TYPE";
const LOCALE = "LOCALE";

export const isBrowser = typeof window !== "undefined";

export const saveThemeType = (type: "light" | "dark") => {
    if (isBrowser)
        window.localStorage.setItem(THEME_TYPE, type);
};

export const loadThemeType = (): "light" | "dark" => {
    if (isBrowser) {
        let type = window.localStorage.getItem(THEME_TYPE);
        if (type === null || (type !== "light" && type !== "dark")) {
            type = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
        }
        const themeType = type as ("light" | "dark");
        saveThemeType(themeType);
        return themeType;
    }

    return "light";
};

export const saveLocale = (locale: "en" | "fr" | "kr") => {
    if (isBrowser)
        window.localStorage.setItem(LOCALE, locale);
};

const normalizeLocale = (lang: string): string => {
    if (lang.startsWith("en"))
        return "en";
    if (lang.startsWith("fr"))
        return "fr";
    if (lang.startsWith("ko") || lang.startsWith("kr"))
        return "kr";
    return "en";
};

export const loadLocale = (): ("en" | "fr" | "kr") => {
    if (isBrowser) {
        let locale = window.localStorage.getItem(LOCALE);
        if (locale === null || !["en", "fr", "kr"].includes(locale)) {
            locale = normalizeLocale(window.navigator.language);
        }
        const res = locale as ("en" | "fr" | "kr");
        saveLocale(res);
        return res;
    }

    return "en";
};
