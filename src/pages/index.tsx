import * as React from "react"
import {CardContent, Grow, Typography} from "@material-ui/core";
import ElevationCard from "../components/ElevationCard";
import {useTranslation} from "react-i18next";

const Home: React.FC = () => {
    const {t, ready} = useTranslation();

    return (ready ?
        <>
            <Grow in={ready} timeout={500}>
                <ElevationCard>
                    <CardContent>
                        <Typography>{t("hello")}</Typography>
                    </CardContent>
                </ElevationCard>
            </Grow>
        </> : <></>);
}

export default Home;