import {
    Avatar,
    Chip,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Theme, Toolbar,
    Typography,
} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {format, formatDistance} from "date-fns";
import {enUS, fr, ko} from "date-fns/locale";
import {useCallback} from "react";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {Experience} from "../../models";
import DateIcon from "@material-ui/icons/DateRangeRounded";
import LocationIcon from "@material-ui/icons/LocationOnRounded";
import AssignmentIcon from "@material-ui/icons/AssignmentRounded";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ReactMarkdown from "react-markdown";
import {makeStyles} from "@material-ui/core/styles";
import CompanyIcon from '@material-ui/icons/BusinessRounded';


interface ExperienceItemProps {
    experience: Experience;
    ready?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    listItemRoot: {
        padding: "20px",
        borderRadius: "25px",
        alignItems: "flex-start",
        paddingRight: "12px",
        paddingTop: "6px"
    },
    skeletonAvatar: {
        height: "40px",
        width:"40px",
    },
    websiteButton: {
        marginBottom: "5px",
        padding: "2px",
    },
    listItemIcon: {
        minWidth: "30px",
        marginRight: "8px",
    },
    listItemNested: {
        padding: "0px",
        paddingLeft: "9px"
    },
    expandButton: {
        alignSelf: "center",
    },
    skillChip: {
        margin:"5px 8px 0px 0px",
        "&:hover": {
            backgroundColor: theme.palette.primary.main
        }
    },
    skeleton40: {
        height: "40px",
    },
    markdown: {
        padding: 0,
        marginTop: "10px",
        marginBottom: "10px"
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
    companyAvatar: {
        marginRight: "16px"
    },
    titleDiv: {
        marginBottom: "12px"
    }
}));

const ExperienceItem = (props: ExperienceItemProps) => {
    const {t, i18n} = useTranslation("me");
    const {experience, ready} = props;
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const formatDate = useCallback((experience: Experience): string => {
        const locale = i18n.language === "en" ? enUS : i18n.language === "fr" ? fr : ko;

        return format(experience.beginDate, t("dateFormat"), {locale})
            + ` → ${experience.endDate !== undefined
                ? format(experience.endDate, t("dateFormat"), {locale})
                : t("present")} • ${formatDistance(experience.beginDate, experience.endDate ?? new Date(), {locale})}`;
    }, [i18n.language, t]);

    const hasFullDescription = Boolean(experience.fullDescription);

    const handleClick = () => {
        if (hasFullDescription)
            setOpen(!open);
    };

    return <>
        <ListItem className={classes.listItemRoot} button onClick={handleClick}>
            <ListItemText
                primary={
                    ready
                        ? <>
                            <Toolbar className={classes.toolbar}>
                                <Avatar className={classes.companyAvatar} variant={"rounded"} alt={experience.company} src={experience.logo}/>
                                <Typography className={classes.title} variant={"h6"} display={"inline"}>{experience.title}</Typography>
                            </Toolbar>
                        </> : <Skeleton className={classes.skeleton40}/>
                }
                secondaryTypographyProps={{component: "span"}}
                secondary={<>
                    <List disablePadding>
                        <ListItem className={classes.listItemNested}>
                            <ListItemIcon className={classes.listItemIcon}><CompanyIcon fontSize={"small"}/></ListItemIcon>
                            <ListItemText>{
                                ready
                                    ? experience.company
                                    : <Skeleton/>
                            }</ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemNested}>
                            <ListItemIcon className={classes.listItemIcon}><DateIcon fontSize={"small"}/></ListItemIcon>
                            <ListItemText>{
                                ready
                                    ? formatDate(experience)
                                    : <Skeleton/>
                            }</ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemNested}>
                            <ListItemIcon className={classes.listItemIcon}><LocationIcon fontSize={"small"}/></ListItemIcon>
                            <ListItemText>{
                                ready
                                    ? experience.location
                                    : <Skeleton/>
                            }</ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemNested}>
                            <ListItemIcon className={classes.listItemIcon}><AssignmentIcon fontSize={"small"}/></ListItemIcon>
                            <ListItemText>{
                                ready
                                    ? experience.description
                                    : <Skeleton/>
                            }</ListItemText>
                        </ListItem>
                        {
                            hasFullDescription && ready
                                ? <Collapse in={open} timeout={"auto"} unmountOnExit>
                                        <List disablePadding>
                                            <ListItem className={classes.markdown} color={"primary"}>
                                                <ListItemText  primaryTypographyProps={{color: "textPrimary"}}>
                                                    <ReactMarkdown source={experience.fullDescription}/>
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                : <></>
                        }
                    </List>
                    {
                        ready
                            ? <div className={classes.skills}>
                                {experience.skills.map(s => <Chip onClick={() => {}} key={s} className={classes.skillChip} label={s}/>)}
                            </div>
                            : <Skeleton className={classes.skeleton40}/>
                    }
                </>}
            />
            {
                hasFullDescription && ready
                    ? (open ? <ExpandLess className={classes.expandButton}/> : <ExpandMore className={classes.expandButton}/>)
                    : <></>
            }
        </ListItem>
    </>
};

export default ExperienceItem;
