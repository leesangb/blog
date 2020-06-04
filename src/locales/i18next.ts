import i18next from "i18next";
import { initReactI18next } from "react-i18next"
import {loadLocale} from "../tools/localStorage";


i18next.use(initReactI18next)
    .init({
        lng: loadLocale(),
        fallbackLng: "en",
        debug: false,
        resources: {
            "kr": {
                translation: require("./kr/translation.json"),
                me: require("./kr/me.json"),
                posts: require("./kr/posts.json")
            },
            "fr": {
                translation: require("./fr/translation.json"),
                me: require("./fr/me.json"),
                posts: require("./fr/posts.json")
            },
            "en": {
                translation: require("./en/translation.json"),
                me: require("./en/me.json"),
                posts: require("./en/posts.json")
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
