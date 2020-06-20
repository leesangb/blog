import {Card, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) => {
    return {
        card: {
            boxShadow: theme.palette.type === "light" ? "10px 10px 20px #cacaca, -10px -10px 20px #ffffff" : "10px 10px 20px #1f1f1f, -10px -10px 20px #2b2b2b",
        }
    }
});

interface NeomorphismCardProps {
    children?: React.ReactNode,
}


const NeomorphismCard = (props: NeomorphismCardProps) => {
    const classes = useStyles();

    return <Card className={classes.card}>
        {props.children}
    </Card>
};

export default NeomorphismCard;