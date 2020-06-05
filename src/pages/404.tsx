import * as React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "gatsby";
import {Button, Divider, Typography} from "@material-ui/core";

const NotFound = () => {
    const {t, ready} = useTranslation();

    return ready ? <>
        <Typography variant={"h3"}>{t("page not found")}</Typography>
        <Divider/>
        <Button component={Link} to={"/"}>{t("go to home")}</Button>
    </> : <></>
};

export default NotFound;