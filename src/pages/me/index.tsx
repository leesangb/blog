import * as React from "react";
import Experiences from "../../components/experiences/ExperiencesCard";
import Profile from "../../components/profile/ProfileCard";
import Education from "../../components/education/EducationCard";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {graphql, useStaticQuery} from "gatsby";

const useStyles = makeStyles((theme: Theme) => ({
    divider: {
        margin: "40px",
        [theme.breakpoints.down('xs')]: {
            margin: "20px",
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

    const { site } = useStaticQuery(graphql`
        query {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
    `);

    return <>
        {
            ready ? <Helmet>
                <title>{site.siteMetadata.title} - {t("about me")}</title>
                <meta name="description" content={t("profile.description")}/>
                <meta property="og:title" content={t("about me")}/>
                <meta property="og:description" content={t("profile.description")}/>
            </Helmet> : <></>
        }
        <div className={classes.container}>
            <Profile/>
            <div className={classes.divider}/>
            <Experiences/>
            <div className={classes.divider}/>
            <Education/>
        </div>
    </>;
};

export default Me;
