import {ThemeOptions} from "@material-ui/core";
import {useState} from "react";
import {loadThemeType, saveThemeType} from "./tools/localStorage";

const blue = "#919aff";

const type = loadThemeType();

const loadPalette = (type: "dark" | "light") => {
    const shared = {
        type,
        primary: {main: blue},
        secondary: {main: blue},
    }

    if (type === "dark")
        return {
            ...shared,
            text: {
                primary: "#fff",
                secondary: "rgba(255,255,255,0.7)",
                disabled: "rgba(255,255,255,0.5)",
            },
            background: {
                default: "#1a1a1a",
                paper: "#2a2a2a"
            },
            action: {
                active: "#fff",
                hover: "rgba(255,255,255,0.08)",
                selected: "rgba(255,255,255,0.16)",
                disabled: "rgba(255,255,255,0.3)",
                disabledBackground: "rgba(255,255,255,0.12)"
            },
            divider: "rgba(255,255,255,0.12)"
        };
    return {
        ...shared,
        text: {
            primary:  "rgba(0,0,0,0.87)",
            secondary: "rgba(0,0,0,0.54)",
            disabled: "rgba(0,0,0,0.38)",
        },
        background: {
            default: "#ffffff",
            paper: "#fafafa"
        },
        action: {
            active: "rgba(0,0,0,0.54)",
            hover: "rgba(0,0,0,0.04)",
            selected: "rgba(0,0,0,0.08)",
            disabled: "rgba(0,0,0,0.26)",
            disabledBackground: "rgba(0,0,0,0.12)"
        },
        divider: "rgba(0,0,0,0.12)"
    }
};

const palette = loadPalette(type);


const themeOptions: ThemeOptions = {
    overrides: {
        MuiOutlinedInput: {
            root: {
                borderRadius: "25px"
            }
        },
        MuiAvatar: {
            img: {
                objectFit: "fill"
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: "25px"
            },
        },
        MuiCardContent: {
            root: {
                "&:last-child": {
                    paddingBottom: "16px"
                },
                "&>p": {
                    fontSize: "16px"
                }
            }
        },
        MuiButtonGroup: {
            groupedHorizontal: {
                "&:first-child": {
                    borderTopLeftRadius: "25px",
                    borderBottomLeftRadius: "25px",
                },
                "&:last-child": {
                    borderTopRightRadius: "25px",
                    borderBottomRightRadius: "25px",
                }
            }
        },
        MuiDrawer: {
            paperAnchorTop: {
                borderRadius: "25px"
            }
        },
    },
    palette,
};




export const useDarkMode = () => {
    const [theme, setTheme] = useState<ThemeOptions>(themeOptions);

    const toggleDarkMode = (): "light" | "dark" => {
        const isLight = theme?.palette?.type === "light";
        const palette = loadPalette(isLight ? "dark" : "light");

        const updatedTheme: ThemeOptions = {
            ...theme,
            palette,
        };
        setTheme(updatedTheme);
        const result: "light" | "dark" = updatedTheme.palette?.type!!;
        saveThemeType(result);
        return result;
    };

    return {theme, toggleDarkMode};
};
