/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
    siteMetadata: {
        title: "Sangbin's blog",
        description: "Personal blog",
        keywords: "",
        siteUrl: "https://blog.leesangbin.com",
        author: {
            name: "Sangbin Lee",
            url: "https://blog.leesangbin.com",
            email: "leesangbin@outlook.com",
        },
        languages: ["en", "fr", "kr"],
    },
    plugins: [
        "gatsby-plugin-catch-links",
        "gatsby-plugin-no-sourcemaps",
        "gatsby-plugin-material-ui",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-typescript",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: `${__dirname}/src/pages`
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "img",
                path: `${__dirname}/static/img`
            }
        },
        "gatsby-transformer-json",
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                extensions: [".mdx", ".md"],
                gatsbyRemarkPlugins: [
                    "gatsby-remark-graphviz",
                    "gatsby-remark-prismjs",
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 1140,
                            quality: 90,
                            linkImagesToOriginal: false
                        }
                    },

                ]
            }
        },
        {
            resolve: "gatsby-plugin-sharp",
            options: {
                useMozJpeg: false,
                stripMetadata: true,
                defaultQuality: 75,
            },
        },
        "gatsby-transformer-sharp",
    ],
};
