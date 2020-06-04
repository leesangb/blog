import {CardContent, Divider, Grow, List, Theme, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import * as React from "react";
import {useTranslation} from "react-i18next";
import ElevationCard from "../ElevationCard";
import {Experience} from "../../models";
import ExperienceItem from "./ExperienceItem";
import {makeStyles} from "@material-ui/core/styles";
import {graphql, useStaticQuery} from "gatsby";

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        margin: "10px",
    },
    skeletonTitle: {
        margin: "10px",
        width: "50px",
    },
    divider: {
        [theme.breakpoints.up('sm')]: {
            margin: "0px 25px 0px 25px"
        },
        [theme.breakpoints.down('xs')]: {
            margin: "0px 25px 0px 25px"
        }
    },
    cardContent: {
        [theme.breakpoints.down('xs')]: {
            padding: "14px"
        }
    }
}));


interface Image {
    url: string;
    name: string;
}

const ExperiencesCard = () => {
    const {t, ready} = useTranslation("me");

    const classes = useStyles();

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
    `)

    const images: Image[] = allFile.edges.map((e: {node: {publicURL: string, relativePath: string}}) => ({url: e.node.publicURL, name: e.node.relativePath}));
    const getImage = (name: string): string => {
        return images.find(i => i.name === name)?.url ?? "";
    }

    const experiences: Experience[] = [
        {
            company: "Société Générale",
            website: "https://www.societegenerale.com/",
            logo: getImage("logo/socgen_logo.svg"),
            title: t("socgen.title"),
            beginDate: new Date("2020-02-10"),
            location: "Fontenay-sous-Bois, France",
            employmentType: t("internship"),
            description: t("socgen.description"),
            fullDescription: t("socgen.fullDescription"),
            skills: ["C#", ".NET Core 3.1", "OData", "PostgreSQL", "React", "Typescript"]
        },
        {
            company: "EPITA: Ecole d'Ingénieurs en Informatique",
            website: "https://www.epita.fr/",
            logo: getImage("logo/epita_logo.png"),
            title: t("epita.title"),
            beginDate: new Date("2019-09-01"),
            endDate: new Date("2019-12-31"),
            location: "Le Kremlim-Bicêtre, France",
            employmentType: t("contract"),
            description: t("epita.description"),
            fullDescription: t("epita.fullDescription"),
            skills: ["C", "Bash", "Unix"]
        },
        {
            company: "Crafty.im",
            website: "https://crafty.im/",
            logo: getImage("logo/crafty_logo.png"),
            title: t("crafty.title"),
            beginDate: new Date("2018-09-13"),
            endDate: new Date("2019-01-31"),
            location: "Station F, Paris 13e, France",
            employmentType: t("contract"),
            description: t("crafty.description"),
            fullDescription: t("crafty.fullDescription"),
            skills: ["C#", "ASP.NET Core 2.1", "SQL Server", "ElasticSearch", "Typescript"]
        },
        {
            company: t("samsung.name"),
            website: "https://www.samsung.com/fr/",
            logo: getImage("logo/samsung_logo.svg"),
            title: t("samsung.title"),
            beginDate: new Date("2017-07-01"),
            endDate: new Date("2017-08-31"),
            location: "Saint-Ouen, France",
            employmentType: t("intern"),
            description: t("samsung.description"),
            fullDescription: t("samsung.fullDescription"),
            skills: ["VBA", "Excel"]
        }
    ];

    return <Grow in={ready}>
        <ElevationCard>
            <CardContent className={classes.cardContent}>
                {
                    ready
                        ? <Typography className={classes.title} variant={"h5"}>{t("experiences")}</Typography>
                        : <Skeleton className={classes.skeletonTitle}/>
                }
                <List>
                    {
                        experiences.map((e, i) => <React.Fragment key={`${i}`}>
                            <ExperienceItem experience={e} ready={ready}/>
                            {
                                i === experiences.length - 1
                                    ? <></>
                                    : <Divider variant={"inset"} className={classes.divider} component={"li"}/>
                            }
                        </React.Fragment>)
                    }
                </List>
            </CardContent>
        </ElevationCard>
    </Grow>
};

export default ExperiencesCard;
