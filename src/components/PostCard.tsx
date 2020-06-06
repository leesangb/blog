import * as React from "react";
import ElevationCard from "./ElevationCard";
import {CardActionArea, CardContent, CardMedia, Chip, Typography} from "@material-ui/core";
import {Post} from "../models";
import {useTranslation} from "react-i18next";
import {useCallback} from "react";
import {enUS, fr, ko} from "date-fns/locale";
import {format} from "date-fns";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

interface PostCardProps {
    post: Post;
}

const useStyles = makeStyles(() => ({
    skeletonTitle: {
        height:"50px"
    },
    tagChip: {
        margin: "3px",
    },
    cardMedia: {
        height: 250
    }
}));

const PostCard = (props: PostCardProps) => {
    const {t, ready, i18n} = useTranslation("posts");
    const { post } = props;
    const classes = useStyles();

    const formatDate = useCallback(() => {
        const locale = i18n.language === "en" ? enUS : i18n.language === "fr" ? fr : ko;
        return format(post.date, t("dateFormat"), {locale});
    }, [i18n.language, t, post.date]);

    return <ElevationCard>
            <CardActionArea>
                <CardMedia className={classes.cardMedia} image={post.thumb}/>
                <CardContent>
                    {
                        ready
                            ? <Typography gutterBottom variant="h5" component="h2">{post.title}</Typography>
                            : <Skeleton className={classes.skeletonTitle}/>
                    }
                    {
                        ready
                            ? <Typography>{formatDate()}</Typography>
                            : <Skeleton/>
                    }
                    <br/>
                    {
                        post.tags?.map(t => <Chip key={t} className={classes.tagChip} label={t}/>)
                    }
                </CardContent>
            </CardActionArea>
        </ElevationCard>
};

export default PostCard;