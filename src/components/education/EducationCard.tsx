import * as React from "react";
import {useTranslation} from "react-i18next";
import {Grid, Grow, Theme, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Education, Image} from "../../models";
import NeomorphismCard from "../NeomorphismCard";
import EducationItem from "./EducationItem";
import {graphql, useStaticQuery} from "gatsby";

const useStyles = makeStyles((theme: Theme) => ({
    education: {
        fontWeight: 700,
        margin: "30px"
    },
    cardContent: {
        padding: "0px",
        [theme.breakpoints.down('xs')]: {
            padding: "14px"
        }
    },
}));


const EducationCard = (props: {style?: React.CSSProperties}) => {
    const {t, ready} = useTranslation("me");
    const theme = useTheme();
    const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

    const { allFile } = useStaticQuery(graphql`
        query {
          allFile(filter: {sourceInstanceName: { eq: "img" }}) {
            edges {
              node {
                publicURL
                relativePath
              }
            }
          }
        }
    `);

    const images: Image[] = allFile.edges.map((e: {node: {publicURL: string, relativePath: string}}) => ({url: e.node.publicURL, name: e.node.relativePath}));
    const getImage = (name: string): string => {
        return images.find(i => i.name === name)?.url ?? "";
    };

    const educations: Education[] = [
        {
            name: "EPITA: Ecole d'Ingénieurs en Informatique",
            location: "Le Kremlin-Bicêtre, France",
            beginDate: new Date("2015-09"),
            endDate: new Date("2020-09"),
            description: t("educations.epita.description"),
            logo: getImage("logo/epita_logo.png")
        },
        {
            name: "UQAC: Université du Québec à Chicoutimi",
            location: "Chicoutimi, Canada",
            beginDate: new Date("2017-01"),
            endDate: new Date("2017-05"),
            description: t("educations.uqac.description"),
            logo: getImage("logo/uqac_logo.png")
        }
    ];

    const classes = useStyles();

    return <Grow in>
        <div style={props.style}>
            <Typography variant={xsDown ? "h4" : "h3"} className={classes.education}>{t("education")}</Typography>
            <Grid container spacing={xsDown ? 2 : 6}>
                {
                    educations.map((e, i) => <Grid item xs={12} key={i}>
                        <Grow in timeout={500}>
                            <NeomorphismCard>
                                <EducationItem className={classes.cardContent} education={e} ready={ready}/>
                            </NeomorphismCard>
                        </Grow>
                    </Grid>)
                }
            </Grid>
        </div>
    </Grow>;
};

export default EducationCard;