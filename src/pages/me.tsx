import * as React from "react";
import Experiences from "../components/experiences/ExperiencesCard";
import Profile from "../components/profile/ProfileCard";
import {makeStyles} from "@material-ui/core/styles";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({
    divider: {
        margin: "10px"
    }
}));

const Me = () => {
    const classes = useStyles();
    const { t, ready } = useTranslation("me");
    return <>
        {
            ready ? <Helmet>
                <title>{t("about me")}</title>
                <meta name="description" content={t("profile.description")}/>
                <meta property="og:title" content={t("about me")}/>
                <meta property="og:description" content={t("profile.description")}/>
            </Helmet> : <></>
        }
        <Profile/>
        <div className={classes.divider}/>
        <Experiences/>
    </>;
};

export default Me;
