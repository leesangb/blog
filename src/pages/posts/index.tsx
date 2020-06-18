import {Grid, Grow} from "@material-ui/core";
import * as React from "react";
import PostCard from "../../components/PostCard";
import {Post} from "../../models";
import {useTranslation} from "react-i18next";
import {graphql, Link, useStaticQuery} from "gatsby";
import {makeStyles} from "@material-ui/core/styles";
import {Helmet} from "react-helmet";

const useStyles = makeStyles(() => ({
    postItem: {
        textDecoration: "none"
    }
}))

const Posts = (props: {style?: React.CSSProperties}) => {
    const { i18n } = useTranslation();

    const { allMdx, site } = useStaticQuery(graphql`
        query GetPosts {
          allMdx(filter: {fields: {layout: {eq: "post"}}}, sort: {order: DESC, fields: fields___date}) {
            nodes {
              fields {
                date
                slug
                title
                lang
                tags
                thumb
              }
            }
          }
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
    `);

    const allPosts: Post[] = allMdx.nodes.map((n: { fields: Post }) => ({ ...n.fields, date: new Date(n.fields.date) }));

    const kr = allPosts.filter(p => p.lang === "kr");
    const fr = allPosts.filter(p => p.lang === "fr");
    const en = allPosts.filter(p => p.lang === "en");

    const posts = i18n.language === "kr" ? kr : i18n.language === "fr" ? fr : en;
    const classes = useStyles();
    const {t, ready} = useTranslation("translation");

    return <>
        {
            ready ? <Helmet>
                <title>{site.siteMetadata.title} - {t("posts")}</title>
                <meta name="description" content={t("profile.description")}/>
                <meta property="og:title" content={t("about me")}/>
                <meta property="og:description" content={t("profile.description")}/>
            </Helmet> : <></>
        }
        <Grid container spacing={2}>
            {
                posts.map((p: Post, i: number) => <Grid component={Link} to={p.slug}
                                                        className={classes.postItem}
                                                        key={i}
                                                        item
                                                        xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Grow in={true} timeout={500}>
                        <div style={{...props.style}}>
                            <PostCard post={p}/>
                        </div>
                    </Grow>
                </Grid>)
            }
        </Grid>
    </>
};

export default Posts;