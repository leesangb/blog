import * as React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    page: {
        size: "21cm 29.7cm",
        margin: "30mm 45mm 30mm 45mm",
    }
}));

const CV = () => {
    const classes = useStyles();
    return <div className={classes.page}>
    </div>;
};

export default CV;