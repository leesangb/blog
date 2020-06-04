import i18next from "i18next";
import { initReactI18next } from "react-i18next"
import {loadLocale} from "./localStorage";


i18next.use(initReactI18next)
    .init({
        lng: loadLocale(),
        fallbackLng: "en",
        debug: false,
        resources: {
            "kr": {
                translation: require("../locales/kr/translation.json"),
                me: require("../locales/kr/me.json"),
                posts: require("../locales/kr/posts.json")
            },
            "fr": {
                translation: require("../locales/fr/translation.json"),
                me: require("../locales/fr/me.json"),
                posts: require("../locales/fr/posts.json")
            },
            "en": {
                translation: require("../locales/en/translation.json"),
                me: require("../locales/en/me.json"),
                posts: require("../locales/en/posts.json")
            },
        },
        ns: ["translation", "me", "posts"],
        defaultNS: "translation",
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

i18next.languages = ["kr", "fr", "en"];

export default i18next;
