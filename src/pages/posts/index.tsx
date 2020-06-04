import {Grid, Grow} from "@material-ui/core";
import * as React from "react";
import PostCard from "../../components/PostCard";
import {Post} from "../../models";
import {useTranslation} from "react-i18next";
import {graphql, useStaticQuery} from "gatsby";

const Posts = (props: {style?: React.CSSProperties}) => {
    const { i18n } = useTranslation();

    const { allMdx } = useStaticQuery(graphql`
        query GetPostsAndImages {
          allMdx(filter: {fields: {layout: {eq: "post"}}}, sort: {order: DESC, fields: fields___date}) {
            nodes {
              fields {
                date
                slug
                title
                lang
              }
            }
          }
        }
    `)

    const allPosts: Post[] = allMdx.nodes.map((n: { fields: Post }) => ({ ...n.fields, date: new Date(n.fields.date) }));

    const kr = allPosts.filter(p => p.lang === "kr");
    const fr = allPosts.filter(p => p.lang === "fr");
    const en = allPosts.filter(p => p.lang === "en");

    const posts = i18n.language === "kr" ? kr : i18n.language === "fr" ? fr : en;

    return <>
        <Grid container spacing={2}>
            {
                posts.map((p: Post, i: number) => <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Grow in={true} timeout={200 + i * 125}>
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