// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const codeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'shineve',
  tagline: 'Front-End Engineer',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'shineve', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.
  deploymentBranch: 'main',
  url: 'https://github.com/shineve',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          path: './blog',
          routeBasePath: '/',
          showReadingTime: true,
          blogTitle: "shineve's Blog",
          blogDescription: "shineve's Blog",
          blogSidebarCount: 8,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: { changefreq: 'weekly', priority: 0.5 },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'shineve',
        logo: {
          alt: 'shineve blog Logo',
          src: 'img/logo.jpg',
        },
        items: [
          {
            href: 'https://github.com/shineve',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://www.linkedin.com/in/hao-ting-88802416b/',
            label: 'LinkedIn',
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
      googleAnalytics: {
        trackingID: 'G-TCLVEN66J8',
      },
      sitemap: { changefreq: 'weekly', priority: 0.5 },
    }),
};

module.exports = config;
