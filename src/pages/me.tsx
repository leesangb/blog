import * as React from "react";
import Experiences from "../components/experiences/ExperiencesCard";
import Profile from "../components/profile/ProfileCard";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
    divider: {
        margin: "20px",
        [theme.breakpoints.down('xs')]: {
            margin: "10px",
        },
    },
    container: {
        maxWidth: "1300px",
        margin: "auto"
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
        <div className={classes.container}>
            <Profile/>
            <div className={classes.divider}/>
            <Experiences/>
        </div>
    </>;
};

export default Me;
