import * as React from 'react'
import { graphql } from 'gatsby'
import ElevationCard from "../components/ElevationCard";
import {CardContent} from "@material-ui/core";
import { MDXRenderer } from "gatsby-plugin-mdx"
import {Helmet} from "react-helmet";

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
            },
            excerpt: string;
        }
    }
}

const PostTemplate: React.FC<PostTemplateProps> = ({ data }) => (
    <>
        <Helmet>
            <title>{data.mdx.fields.title}</title>
            <meta name="description" content={data.mdx.excerpt}/>
            <meta property="og:title" content={data.mdx.fields.title}/>
            <meta property="og:description" content={data.mdx.excerpt}/>
            <meta name="keywords" content={data.mdx.fields.tags?.join(",")}/>
        </Helmet>
        <ElevationCard>
            <CardContent>
                <h1>{data.mdx.fields.title}</h1>
                <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </CardContent>
        </ElevationCard>
    </>
)

export default PostTemplate

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
      }
      excerpt
    }
  }
`
