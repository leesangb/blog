import {ThemeOptions} from "@material-ui/core";
import {useState} from "react";
import {loadThemeType, saveThemeType} from "./tools/localStorage";

const blue = "#919aff";

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
    palette: {
        primary: {main: blue},
        secondary: {main: blue},
        type: loadThemeType(),
    }
};

export const useDarkMode = () => {
    const [theme, setTheme] = useState<ThemeOptions | undefined>(themeOptions);

    const toggleDarkMode = (): "light" | "dark" => {
        const updatedTheme: ThemeOptions = {
            ...theme,
            palette: {
                ...theme?.palette,
                type: theme?.palette?.type === "light" ? "dark" : "light",
            },
        };
        setTheme(updatedTheme);
        const result: "light" | "dark" = updatedTheme.palette?.type!!;
        saveThemeType(result);
        return result;
    };

    return {theme, toggleDarkMode};
};
