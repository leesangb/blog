import * as React from 'react';
import {useEffect} from 'react';
import i18next from "../locales/i18next";
import {Helmet} from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, Theme, ThemeProvider} from '@material-ui/core/styles';
import {useDarkMode} from "../theme";
import {enUS} from "@material-ui/core/locale";
import {I18nextProvider} from "react-i18next";
// @ts-ignore
import {MDXProvider} from "@mdx-js/react"
import {Link} from "@material-ui/core";
import "prism-themes/themes/prism-material-dark.css";
import TopLayoutContext from "./contexts/TopLayoutContext";

const shortcodes = { Link }

const TopLayout = (props: {children: React.ReactNode}) => {
    const {theme, toggleDarkMode} = useDarkMode();

    const [localization, setLocalization] = React.useState(enUS);
    const [simpleTheme, setSimpleTheme] = React.useState<Theme>(createMuiTheme(theme, localization));

    useEffect(() => {
        setSimpleTheme(createMuiTheme(theme, localization));
    }, [theme, localization]);

    return <>
        <Helmet htmlAttributes={{"lang": "en"}}>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <meta content="text/html; charset=utf-8" />
        </Helmet>
        <ThemeProvider theme={simpleTheme}>
            <I18nextProvider i18n={i18next}>
                <MDXProvider components={shortcodes}>
                    <CssBaseline />
                    <TopLayoutContext.Provider value={{themeOptions: theme, toggleDarkMode, setLocalization}}>
                        {props.children}
                    </TopLayoutContext.Provider>
                </MDXProvider>
            </I18nextProvider>
        </ThemeProvider>
    </>
};

export default TopLayout;