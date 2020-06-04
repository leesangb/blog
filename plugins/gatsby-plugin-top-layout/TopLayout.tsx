import * as React from 'react';
import i18next from "../../src/locales/i18next";
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {useDarkMode} from "../../src/theme";
import {enUS, frFR, koKR} from "@material-ui/core/locale";
import Header from "../../src/components/Header";
import {I18nextProvider, useTranslation} from "react-i18next";
import { navigate } from "gatsby"
// @ts-ignore
import { MDXProvider } from "@mdx-js/react"
import {Link} from "@material-ui/core";
import {useEffect} from "react";
import {isBrowser, loadLocale, saveLocale} from "../../src/tools/localStorage";


const shortcodes = { Link }

const useStyles = makeStyles(() => ({
    container: {
        padding: "20px 12px 12px 12px"
    }
}));

const getLocale = (path: string): {locale: ("en" | "fr" | "kr"), path: string} => {
    const split = path.split("/");
    if (split.length < 2)
        return {locale: loadLocale() as "en" | "fr" | "kr", path: "/en"};
    if (!["en", "fr", "kr"].includes(split[1]))
        return {locale: loadLocale() as "en" | "fr" | "kr", path: path};

    const locale = split[1] as ("en" | "fr" | "kr");
    const newPath = `/${split.slice(2).join("/")}`;
    return {locale, path: newPath};
}

const getUrl = (props: any) => {
    if (isBrowser) {
        return window.location.pathname;
    }
    // FIXME
    return props.children.props.children.props.url;
}

export default function TopLayout(props: {children: React.ReactNode}) {
    const {theme, toggleDarkMode} = useDarkMode();
    const {locale, path} = getLocale(getUrl(props));
    const classes = useStyles();

    const {i18n} = useTranslation();

    const muiLocale = locale === "en" ? enUS : locale === "fr" ? frFR : koKR;
    const [localization, setLocalization] = React.useState(muiLocale);

    const simpleTheme = createMuiTheme(theme, localization);

    useEffect(() => {
        if (i18n.language === "kr")
            setLocalization(koKR);
        else if (i18n.language === "fr")
            setLocalization(frFR);
        else
            setLocalization(enUS);

        navigate(`/${i18n.language}${path}`);
        saveLocale(i18n.language as ("en" | "fr" | "kr"));
    }, [i18n.language]);

    return <React.Fragment>
        <Helmet>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet"/>
        </Helmet>
        <MuiThemeProvider theme={simpleTheme}>
            <I18nextProvider i18n={i18next}>
                <MDXProvider components={shortcodes}>
                    <CssBaseline />
                    <Header toggleDarkMode={toggleDarkMode}/>
                    <div className={classes.container}>
                        {props.children}
                    </div>
                </MDXProvider>
            </I18nextProvider>
        </MuiThemeProvider>
    </React.Fragment>
}