import * as React from "react";
import Experiences from "../components/experiences/ExperiencesCard";
import Profile from "../components/profile/ProfileCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    divider: {
        margin: "10px"
    }
}));

const Me = () => {
    const classes = useStyles();
    return <>
        <Profile/>
        <div className={classes.divider}/>
        <Experiences/>
    </>;
};

export default Me;
