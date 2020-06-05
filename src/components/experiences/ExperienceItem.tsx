import {
    Avatar,
    Chip,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText, Theme, Toolbar,
    Tooltip,
    Typography,
    useMediaQuery, useTheme
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
import WebsiteIcon from '@material-ui/icons/LanguageRounded';
import {makeStyles} from "@material-ui/core/styles";
import CompanyIcon from '@material-ui/icons/BusinessRounded';


interface ExperienceItemProps {
    experience: Experience;
    ready?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    listItemRoot: {
        borderRadius: "25px",
        alignItems: "flex-start",
        [theme.breakpoints.down('xs')]: {
            paddingRight: "4px"
        }
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
    },
    listItemNested: {
        padding: "0px",
    },
    expandButton: {
        alignSelf: "center",
    },
    skillChip: {
        margin:"5px 8px 0px 0px",
    },
    skeleton40: {
        height: "40px",
    },
    markdown: {
        padding: 0
    },
    skills: {
        marginTop:"10px",
    },
}));

const ExperienceItem = (props: ExperienceItemProps) => {
    const {t, i18n} = useTranslation("me");
    const {experience, ready} = props;
    const classes = useStyles();

    const theme = useTheme();
    const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

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
            {
                xsDown
                    ? <></>
                    : <ListItemAvatar>
                        {
                            ready
                                ? <Avatar variant={"rounded"} alt={experience.company} src={experience.logo}/>
                                : <Skeleton variant={"circle"} className={classes.skeletonAvatar}/>
                        }
                    </ListItemAvatar>
            }
            <ListItemText
                primary={
                    ready
                        ? <>
                        {
                            xsDown
                                ? <>
                                    <Toolbar style={{padding: "0px"}}>
                                        <Avatar style={{marginRight: "16px"}} variant={"rounded"} alt={experience.company} src={experience.logo}/>
                                        <Typography variant={"h6"} display={"inline"}>{experience.title}</Typography>
                                    </Toolbar>
                                </> : <>
                                    <Typography variant={"h6"} display={"inline"}>{experience.title}</Typography>
                                    <Typography display={"inline"}>{` - ${experience.company}`}</Typography>
                                    {
                                        experience.website
                                            ? <Tooltip title={experience.website}>
                                                <IconButton component={"a"} href={experience.website} className={classes.websiteButton}>
                                                    <WebsiteIcon fontSize={"small"}/>
                                                </IconButton>
                                            </Tooltip> : <></>
                                    }
                                </>
                        }
                        </>
                        : <Skeleton className={classes.skeleton40}/>
                }
                secondaryTypographyProps={{component: "span"}}
                secondary={<>
                    <List disablePadding>
                        {
                            xsDown ? <ListItem className={classes.listItemNested}>
                                <ListItemIcon className={classes.listItemIcon}><CompanyIcon fontSize={"small"}/></ListItemIcon>
                                <ListItemText>{
                                    ready
                                        ? experience.company
                                        : <Skeleton/>
                                }</ListItemText>
                            </ListItem> : <></>
                        }
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
                                {experience.skills.map(s => <Chip key={s} className={classes.skillChip} label={s}/>)}
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
