import {
    Avatar,
    CardContent,
    Grow,
    Hidden,
    IconButton,
    Paper,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import * as React from "react";
import {useTranslation} from "react-i18next";
import ElevationCard from "../ElevationCard";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/EmailRounded";
import {Profile as ProfileModel} from "../../models";
import {graphql, useStaticQuery} from "gatsby";

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        float: "left",
        margin: "0px 25px 15px 15px",
        width: "100px",
        height: "100px"
    },
    profile: {
        [theme.breakpoints.down('xs')]: {
            height: "100px"
        }
    },
    profileToolbar: {
        paddingLeft: "0px",
        paddingRight: "20px",
        minHeight: "0px"
    },
    name: {
        [theme.breakpoints.down('xs')]: {
            marginTop: "30px"
        },
        [theme.breakpoints.up('sm')]: {
            display: "inline",
        }
    },
    iconButton: {
        [theme.breakpoints.down('xs')]: {
            padding: "5px"
        },
    },
    aboutMe: {
        margin: "10px"
    },
    skeletonAboutMe: {
        margin: "10px",
        height: "50px"
    },
    skeletonDescription: {
        marginLeft: "142px",
        [theme.breakpoints.down('xs')]: {
            marginLeft: "0px"
        }
    },
    skeletonName: {
        marginLeft: "125px",
        height: "50px",
    },
    emailIcon: {
        color: "#F54242",
    },
    linkedInIcon: {
        color:"#0077B5",
    },
    cardContent: {
        [theme.breakpoints.down('xs')]: {
            padding: "14px"
        }
    }
}));

const ProfileCard = () => {
    const { t, i18n, ready } = useTranslation("me");
    const classes = useStyles();

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
    `)

    const images: {url: string, name: string}[] = allFile.edges.map((e: {node: {publicURL: string, relativePath: string}}) => ({url: e.node.publicURL, name: e.node.relativePath}));
    const getImage = (name: string): string => {
        return images.find(i => i.name === name)?.url ?? "";
    }

    const profile: ProfileModel = {
        lastname: t("profile.lastname"),
        firstname: t("profile.firstname"),
        picture: getImage("profile_memoji.png"),
        linkedin: "https://www.linkedin.com/in/sangbin-lee",
        github: "https://github.com/sb59",
        email: "leesangbin@outlook.com",
        description: t("profile.description")
    };

    const formatName = (profile: ProfileModel) => {
        return i18n.language === "kr" ? `${profile.lastname}${profile.firstname}` : `${profile.firstname} ${profile.lastname}`;
    };

    const Profile = () => <>
        {
            ready
                ? <Typography className={classes.name} variant={"h5"}>{formatName(profile)}</Typography>
                : <Skeleton className={classes.skeletonName}/>
        }
        <Hidden xsDown>
            <div style={{flexGrow: 1}}/>
        </Hidden>
        <Tooltip title={profile.email}>
            <IconButton className={classes.iconButton} component={"a"} href={`mailto:${profile.email}`}>
                <EmailIcon className={classes.emailIcon}/>
            </IconButton>
        </Tooltip>
        <Tooltip title={profile.linkedin}>
            <IconButton className={classes.iconButton} component={"a"} href={profile.linkedin}>
                <LinkedInIcon className={classes.linkedInIcon}/>
            </IconButton>
        </Tooltip>
        <Tooltip title={profile.github}>
            <IconButton className={classes.iconButton} component={"a"} href={profile.github}>
                <GitHubIcon/>
            </IconButton>
        </Tooltip>
    </>;

    return <Grow in={ready}>
        <ElevationCard>
            <CardContent className={classes.cardContent}>
                {
                    ready
                        ? <Typography className={classes.aboutMe} variant={"h5"}>{t("about me")}</Typography>
                        : <Skeleton className={classes.skeletonAboutMe}/>
                }
                {
                    ready
                        ? <Avatar className={classes.avatar} variant={"circle"} alt={profile.firstname} src={profile.picture}/>
                        : <Skeleton className={classes.avatar} variant={"circle"}/>
                }
                {
                    xsDown
                        ? <Paper elevation={0} className={classes.profile}><Profile/></Paper>
                        : <Toolbar className={classes.profileToolbar}><Profile/></Toolbar>
                }
                {
                    ready
                        ? <Typography>{profile.description}</Typography>
                        : <>
                            <Skeleton className={classes.skeletonDescription}/>
                            <Skeleton className={classes.skeletonDescription}/>
                        </>
                }
            </CardContent>
        </ElevationCard>
    </Grow>
};

export default ProfileCard;
