'use strict'

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  switch (node.internal.type) {
    case 'Mdx': {
      const {layout, title, date, tags, thumb} = node.frontmatter;
      const {relativePath} = getNode(node.parent);

      const dirs = relativePath.split("/");
      const last = dirs.length - 1;
      const tmp = dirs[last].split(".");
      const locale = tmp[0];
      let slug = `/${locale}/${dirs.slice(0, last).join("/")}/`;

      createNodeField({node, name: 'slug', value: slug || ''});
      createNodeField({node, name: 'layout', value: layout || ''});
      createNodeField({node, name: 'title', value: title || ''});
      createNodeField({node, name: 'date', value: date || ''});
      createNodeField({node, name: 'lang', value: locale});
      createNodeField({node, name: 'tags', value: tags});
      createNodeField({node, name: 'thumb', value: (thumb ? thumb : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg")});
    }
  }
}

const languages = ["fr", "en", "kr"];
const pagePath = "src/pages/";

exports.onCreatePage = ({ page, actions }) => {
  if (page.component.endsWith(".tsx")) {
    const { componentPath, path } = page;
    languages.forEach(l => {
      const p = {
        component: require.resolve(`./${componentPath.substring(componentPath.indexOf(pagePath))}`),
        path: `/${l}${path}`,
        context: {
          slug: `/${l}${path}`,
          lang: l,
        }
      };
      actions.createPage(p);
    })
  } else if (page.component.endsWith(".mdx")) {
    const { componentPath } = page;
    const locale = componentPath.substring(componentPath.lastIndexOf("/") + 1, componentPath.lastIndexOf("."));
    const name = componentPath.substring(componentPath.indexOf(pagePath) + pagePath.length, componentPath.length - (componentPath.length - componentPath.lastIndexOf("/")));
    const path = `/${locale}/${name}/`;
    const p = {
      component: require.resolve(`./src/templates/post.tsx`),
      path,
      context: {
        slug: path,
        lang: locale
      }
    }
    actions.deletePage(page);
    actions.createPage(p);
  }
}