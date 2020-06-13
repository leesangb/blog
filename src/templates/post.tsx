import * as React from 'react'
import { graphql } from 'gatsby'
import ElevationCard from "../components/ElevationCard";
import {CardActions, CardContent, Chip, Divider, Typography} from "@material-ui/core";
import { MDXRenderer } from "gatsby-plugin-mdx"
import {Helmet} from "react-helmet";
import {makeStyles} from "@material-ui/core/styles";
import {formatLangForHtml} from "../tools/helpers";
import {useTranslation} from "react-i18next";
import {useCallback} from "react";
import {enUS, fr, ko} from "date-fns/locale";
import {format} from "date-fns";

interface PostTemplateProps {
    data: {
        site: {
            siteMetadata: {
                title: string;
                description: string;
                author: {
                    name: string;
                    url: string;
                }
            }
        }
        mdx: {
            body: string;
            fields: {
                title: string;
                date: string;
                lang: string;
                slug: string;
                tags?: string[];
                thumb: string;
            },
            excerpt: string;
            timeToRead: string;
        }
    }
}

const useStyles = makeStyles(() => ({
    tag: {
        margin: "3px"
    },
    divider: {
        marginTop: "10px"
    },
    container: {
        margin:"auto",
        maxWidth: "1300px"
    }
}));

const PostTemplate: React.FC<PostTemplateProps> = ({ data }) => {
    const classes = useStyles();
    const {t, i18n} = useTranslation("posts");

    const formatDate = useCallback((date: string) => {
        const d = new Date(date);
        const locale = i18n.language === "en" ? enUS : i18n.language === "fr" ? fr : ko;
        return format(d, t("dateFormat"), {locale});
    }, [i18n.language, t]);

    return (
        <>
            <Helmet htmlAttributes={{"lang": formatLangForHtml(data.mdx.fields.lang)}}>
                <title>{data.mdx.fields.title}</title>
                <meta name="description" content={data.mdx.excerpt}/>
                <meta property="og:title" content={data.mdx.fields.title}/>
                <meta property="og:description" content={data.mdx.excerpt}/>
                <meta property="og:image" content={data.mdx.fields.thumb}/>
                <meta name="keywords" content={data.mdx.fields.tags?.join(",")}/>
            </Helmet>
            <div className={classes.container}>
                <ElevationCard>
                    <CardContent>
                        <h1>{data.mdx.fields.title}</h1>
                        <Typography>{formatDate(data.mdx.fields.date)} • {data.mdx.timeToRead} min read</Typography>
                        <Divider className={classes.divider}/>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </CardContent>
                    <CardActions>
                        {
                            data.mdx.fields.tags?.map(t => <Chip key={t} className={classes.tag} label={t}/>)
                        }
                    </CardActions>
                </ElevationCard>
            </div>
        </>
    );
}

export default PostTemplate;

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        title
        date
        lang
        slug
        tags
        thumb
      }
      timeToRead
      excerpt
    }
  }
`;
