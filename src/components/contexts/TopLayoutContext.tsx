import * as React from "react";
import {ThemeOptions} from "@material-ui/core";
import {Localization} from "@material-ui/core/locale";

interface TopLayoutContext {
    themeOptions: ThemeOptions;
    setLocalization: React.Dispatch<React.SetStateAction<Localization>>
    toggleDarkMode: () => ("dark" | "light");
}

export default React.createContext<TopLayoutContext | undefined>(undefined);