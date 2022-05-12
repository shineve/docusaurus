// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const codeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'shineve',
  tagline: 'Software Engineer',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'shineve', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.
  deploymentBranch: 'main',
  url: 'https://blog.shineve.dev',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          path: 'blog',
          routeBasePath: '/blog',
          showReadingTime: true,
          blogTitle: 'Blog',
          blogDescription: "shineve's Blog",
          blogSidebarCount: 7,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-TCLVEN66J8',
        },
        sitemap: { changefreq: 'weekly', priority: 0.5 },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: 'keywords', content: 'javascript, css, html, web deveolpment, blog' }],
      navbar: {
        title: 'shineve',
        logo: {
          alt: 'shineve blog Logo',
          src: 'img/logo.jpg',
          href: '/'
        },
        items: [
          {
            type: 'doc',
            docId: 'Style Guide/js-style-guide',
            position: 'left',
            label: 'Docs',
          },
          {to: 'blog', label: 'Blog', position: 'left'}, // or position: 'right'
          {
            href: 'https://github.com/shineve',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://www.linkedin.com/in/tinghao95/',
            label: 'LinkedIn',
            position: 'right',
          },
          {
            href: 'https://hao95.notion.site/Book-Club-c515cc928ab74cd6b7e0acae55ff51c5',
            label: 'Notion',
            position: 'right',
          },
        ],
      },
      image: 'img/logo.png',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} shineve, Built with Docusaurus.`,
      },
      prism: {
        theme: codeTheme,
        darkTheme: codeTheme,
      },
      sitemap: { changefreq: 'weekly', priority: 0.5 },
    }),
};

module.exports = config;
