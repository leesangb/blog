import {
    Avatar, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme,
} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {format} from "date-fns";
import {enUS, fr, ko} from "date-fns/locale";
import {useCallback} from "react";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {Education} from "../../models";
import DateIcon from "@material-ui/icons/DateRangeRounded";
import LocationIcon from "@material-ui/icons/LocationOnRounded";
import {makeStyles} from "@material-ui/core/styles";


interface EducationItemProps {
    education: Education;
    ready?: boolean;
}

const useStyles = makeStyles(() => ({
    listItemRoot: {
        paddingLeft: "20px",
        borderRadius: "25px",
        alignItems: "flex-start",
        paddingRight: "12px",
        paddingTop: "6px",
        paddingBottom: "6px"
    },
    skeletonAvatar: {
        height: "40px",
        width:"40px",
    },
    listItemIcon: {
        minWidth: "30px",
        marginRight: "8px",
    },
    listItemNested: {
        padding: "0px",
        paddingLeft: "9px"
    },
    skeleton40: {
        height: "40px",
    },
    skills: {
        marginTop:"10px",
    },
    toolbar: {
        padding: 0
    },
    title: {
        fontWeight: 700
    },
    schoolAvatar: {
        marginRight: "16px",
        height: "auto"
    },
    titleDiv: {
        marginBottom: "12px"
    },
    description: {
        marginTop: "0px",
        paddingLeft: "46px",
        paddingBottom: "12px"
    }
}));

const EducationItem = (props: EducationItemProps & {className?: string}) => {
    const {t, i18n} = useTranslation("me");
    const {education, ready} = props;
    const classes = useStyles();
    const theme = useTheme();
    const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

    const formatDate = useCallback((education: Education): string => {
        const locale = i18n.language === "en" ? enUS : i18n.language === "fr" ? fr : ko;

        return format(education.beginDate, t("dateFormat"), {locale})
            + ` → ${education.endDate !== undefined
                ? format(education.endDate, t("dateFormat"), {locale})
                : t("present")}`;
    }, [i18n.language, t]);

    return <>
        <ListItem className={classes.listItemRoot}>
            <ListItemText
                primary={
                    ready
                        ? <>
                            <Toolbar className={classes.toolbar}>
                                <Avatar className={classes.schoolAvatar} variant={"rounded"} alt={education.name} src={education.logo}/>
                                <Typography className={classes.title} variant={"h6"} display={"inline"}>{education.name}</Typography>
                            </Toolbar>
                        </> : <Skeleton className={classes.skeleton40}/>
                }
                secondaryTypographyProps={{component: "span"}}
                secondary={<>
                    <List disablePadding>
                        <ListItem className={classes.listItemNested}>
                            <ListItemText className={classes.description}>{
                                ready
                                    ? education.description
                                    : <Skeleton/>
                            }</ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemNested}>
                            <ListItemIcon className={classes.listItemIcon}><DateIcon fontSize={"small"}/></ListItemIcon>
                            <ListItemText>{
                                ready
                                    ? formatDate(education)
                                    : <Skeleton/>
                            }</ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemNested}>
                            <ListItemIcon className={classes.listItemIcon}><LocationIcon fontSize={"small"}/></ListItemIcon>
                            <ListItemText>{
                                ready
                                    ? education.location
                                    : <Skeleton/>
                            }</ListItemText>
                        </ListItem>
                    </List>
                </>}
            />
        </ListItem>
    </>
};

export default EducationItem;
