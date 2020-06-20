import {
    AppBar,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Collapse,
    Divider,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popover,
    SwipeableDrawer, Theme,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {ReactNode, useCallback, useContext} from "react";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {iOS} from "../tools/deviceHelper"
import {loadThemeType} from "../tools/localStorage";
import DarkModeIcon from "@material-ui/icons/Brightness4Rounded";
import LightModeIcon from "@material-ui/icons/Brightness7Rounded";
import Home from "@material-ui/icons/HomeRounded";
import Emoji from "@material-ui/icons/EmojiEmotionsRounded";
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TranslateIcon from '@material-ui/icons/TranslateRounded';
import MenuIcon from '@material-ui/icons/MenuRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import PostsIcon from '@material-ui/icons/ChromeReaderModeRounded';
import {Link} from "gatsby";
import {makeStyles} from "@material-ui/core/styles";
import TopLayoutContext from "./contexts/TopLayoutContext";


interface Navigation {
    key: string;
    icon: (style?: React.CSSProperties, className?: string) => ReactNode;
    link: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        zIndex: 1400,
    },
    navigationButtonGroup: {
        borderRadius: "25px",
    },
    navigationButtonStartIcon: {
        margin: "0 3px 0 3px",
    },
    navigationButtonLabel: {
        margin: "0px 2px 0px 2px",
    },
    separatorDiv: {
        flexGrow: 1,
    },
    drawer: {
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px"
    },
    drawerList: {
        paddingTop: "56px",
        paddingBottom: "0px",
    },
    divider: {
        marginLeft: "25px",
        marginRight:"25px",
    },
    listItem: {
        borderRadius: "25px",
    },
    navigationListItemIcon: {
        marginLeft: "14px",
        minWidth: "42px",
    },
    popOverListItemIcon: {
        minWidth: "40px",
    },
    popOverListItemText: {
        textTransform: "uppercase",
        width: "100px"
    },
    card: {
        boxShadow: theme.palette.type === "light" ? "10px 10px 20px #cacaca, -10px -10px 20px #ffffff" : "10px 10px 20px #1f1f1f, -10px -10px 20px #2b2b2b",
    }
}));


const Header = () => {
    const { t, i18n } = useTranslation();
    const { toggleDarkMode } = useContext(TopLayoutContext)!;
    const classes = useStyles();
    const [themeType, setThemeType] = React.useState(loadThemeType());
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [expand, setExpand] = React.useState(false);
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const xsDown = useMediaQuery(theme.breakpoints.down('xs'));


    const handleClickNavigation = () => {
        setOpenDrawer(false);
    };

    const getNavigations = useCallback((): Navigation[] => [
        {
            key: "home",
            icon: (style?: React.CSSProperties, className?: string) => <Home style={style} className={className}/>,
            link: `/${i18n.language}`
        },
        {
            key: "posts",
            icon: (style?: React.CSSProperties, className?: string) => <PostsIcon style={style} className={className}/>,
            link: `/${i18n.language}/posts`
        },
        {
            key: "about me",
            icon: (style?: React.CSSProperties, className?: string) => <Emoji style={style} className={className}/>,
            link: `/${i18n.language}/me`
        }
    ], [i18n.language]);

    const onClick = (lang: string) => () => {
        i18n.changeLanguage(lang).then();
    };

    const handleChangeTheme = () => {
        setThemeType(toggleDarkMode());
    };

    const clickSettings = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const expandLang = () => {
        setExpand(true);
    };

    const toggleExpandLang = () => {
        setExpand(!expand);
    };

    const languages = [
        {lang: "en", label: "English"},
        {lang: "fr", label: "Français"},
        {lang: "kr", label: "한국어"}
    ];

    const closePopover = () => {
        setAnchorEl(null);
        setExpand(false);
    };

    const navigations = getNavigations();

    const handleDrawer = (open: boolean) => () => {
        setOpenDrawer(open);
    };

    const handleExpand = (expand: boolean) => () => {
        setExpand(expand);
    };

    return <>
        <AppBar className={classes.appBar} elevation={0} position={"sticky"} color={"inherit"}>
            <Toolbar>
                {
                    xsDown
                        ? <IconButton aria-label={"Open Navigation Menu"} onClick={handleDrawer(!openDrawer)}>
                            {
                                openDrawer
                                    ? <CloseIcon/>
                                    : <MenuIcon/>
                            }
                        </IconButton>
                        : <ButtonGroup variant={"text"} className={classes.navigationButtonGroup}>
                            {
                                navigations.map(n =>
                                    <Button component={Link}
                                            to={n.link}
                                            key={n.key}
                                            startIcon={n.icon(undefined, classes.navigationButtonStartIcon)}>
                                            <span className={classes.navigationButtonLabel}>
                                                {t(n.key)}
                                            </span>
                                    </Button>)
                            }
                        </ButtonGroup>
                }
                <div className={classes.separatorDiv}/>
                <IconButton aria-label={"Open Settings"} onClick={clickSettings}>
                    <SettingsIcon/>
                </IconButton>

                <Hidden smUp>
                    <SwipeableDrawer
                        anchor={"top"}
                        open={openDrawer}
                        disableBackdropTransition={!iOS}
                        disableDiscovery={iOS}
                        onClose={handleDrawer(false)}
                        onOpen={handleDrawer(true)}
                        className={classes.drawer}
                    >
                        <List className={classes.drawerList}>
                            {
                                navigations.map((n) => <React.Fragment key={n.key}>
                                    <Divider className={classes.divider}/>
                                    <ListItem className={classes.listItem} button component={Link} to={n.link} onClick={handleClickNavigation}>
                                        <ListItemIcon className={classes.navigationListItemIcon}>{n.icon()}</ListItemIcon>
                                        <ListItemText>{t(n.key)}</ListItemText>
                                    </ListItem>
                                </React.Fragment>)
                            }
                        </List>
                    </SwipeableDrawer>
                </Hidden>
                <Popover open={Boolean(anchorEl)}
                         onClose={closePopover}
                         anchorEl={anchorEl}
                         PaperProps={{className:classes.card}}
                         style={{zIndex: 1500}}
                         anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                    <Card
                        className={classes.card} onMouseLeave={handleExpand(false)}>
                        <CardContent>
                            <ListItem className={classes.listItem} button onClick={handleChangeTheme}>
                                <ListItemIcon className={classes.popOverListItemIcon}>
                                    {themeType === "light" ? <LightModeIcon/> : <DarkModeIcon/>}
                                </ListItemIcon>
                                <ListItemText className={classes.popOverListItemText} primary={t(themeType)}/>
                            </ListItem>
                            <Divider className={classes.divider} />
                            <List disablePadding>
                                <ListItem className={classes.listItem} button aria-label={"Select Language"} onMouseEnter={expandLang} onClick={toggleExpandLang}>
                                    <ListItemIcon className={classes.popOverListItemIcon}>
                                        <TranslateIcon/>
                                    </ListItemIcon>
                                    <ListItemText className={classes.popOverListItemText}
                                                  primary={languages.find(l => l.lang === i18n.language)!.label}/>
                                    {expand ? <ExpandLess/> : <ExpandMore/>}
                                </ListItem>
                                <Collapse in={expand} timeout={"auto"} unmountOnExit>
                                    <List disablePadding>
                                        {
                                            languages.map(e =>
                                                <ListItem className={classes.listItem} button key={e.lang}
                                                          onClick={onClick(e.lang)}>
                                                    <ListItemIcon className={classes.popOverListItemIcon}/>
                                                    <ListItemText primary={<Typography>{e.label}</Typography>}/>
                                                </ListItem>)
                                        }
                                    </List>
                                </Collapse>
                            </List>
                        </CardContent>
                    </Card>
                </Popover>
            </Toolbar>
        </AppBar>
    </>
};

export default Header;
