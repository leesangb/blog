export const formatLangForHtml = (lang: string): string => {
    switch (lang) {
        case "fr":
        case "fr-FR":
            return "fr-FR";
        case "kr":
        case "ko":
            return "ko";
        default:
            return "en";
    }
}