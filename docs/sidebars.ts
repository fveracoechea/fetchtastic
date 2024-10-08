import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docSidebar: [
    //{ type: 'autogenerated', dirName: '.' },
    'getting-started',
    'core-concepts',
    'usage-guide',
    'error-handling',
    {
      type: 'category',
      label: 'API Reference',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'api/index',
      },
      items: require('./docs/api/typedoc-sidebar.cjs'),
    },
  ],
  //typedocSidebar: [
  //  ,
  //],

  // But you can create a sidebußar manually
  /*
  tutorialSidebar: 
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
