import * as React from "react";
import {useTranslation} from "react-i18next";
import {useContext, useEffect} from "react";
import {enUS, frFR, koKR} from "@material-ui/core/locale";
import {graphql, navigate, useStaticQuery} from "gatsby";
import {loadLocale, saveLocale} from "../tools/localStorage";
import TopLayoutContext from "./contexts/TopLayoutContext";
import Header from "./Header";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Helmet} from "react-helmet";
import {formatLangForHtml} from "../tools/helpers";
import {useLocation} from "@reach/router";


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        margin: "60px",
        [theme.breakpoints.down('xs')]: {
            margin: "24px",
        },
    }
}));

const getLocaleAndPath = (path: string): {locale: ("en" | "fr" | "kr"), path: string} => {
    const split = path.split("/");
    if (split.length < 2)
        return {locale: loadLocale() as "en" | "fr" | "kr", path: "/en"};
    if (!["en", "fr", "kr"].includes(split[1]))
        return {locale: loadLocale() as "en" | "fr" | "kr", path: path};

    const locale = split[1] as ("en" | "fr" | "kr");
    const newPath = `/${split.slice(2).join("/")}`;
    return {locale, path: newPath};
};

const Layout = (props: {children: React.ReactNode}) => {
    const {i18n} = useTranslation();
    const {setLocalization} = useContext(TopLayoutContext)!;
    const {pathname} = useLocation();
    const {path} = getLocaleAndPath(pathname);

    const classes = useStyles();

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


    const { site } = useStaticQuery(query);

    return <>
        <Helmet htmlAttributes={{"lang": formatLangForHtml(i18n.language)}}>
            <title>{site.siteMetadata.title}</title>
            <meta name="description" content={site.siteMetadata.description}/>
            <meta property="og:title" content={site.siteMetadata.title} />
            <meta property="og:description" content={site.siteMetadata.description} />
            <meta property="og:url" content={`${site.siteMetadata.siteUrl}${pathname}`} />
        </Helmet>
        <Header/>
        <div className={classes.container}>
            {props.children}
        </div>
    </>
};



export const query = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }`;

export default Layout;