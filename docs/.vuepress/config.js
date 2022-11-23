module.exports = {
  title: '树不梢的博客',
  description: '树不梢的博客',
  base: '/blog/',
  theme: 'reco',
  locales: {
    '/': { lang: 'zh-CN' },
  },
  themeConfig: {
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '树不梢的博客',
        items: [
          { text: 'Github', link: 'https://github.com/ShuBuShao' },
          { text: '掘金', link: 'https://juejin.cn/user/4054654612145367/posts' },
        ],
      },
    ],
    sidebar: [
      {
        title: '欢迎学习',
        path: '/',
        collapsable: false, // 不折叠
        children: [{ title: '学前必读', path: '/' }],
      },
      {
        title: 'JavaScript学习',
        path: '/JavaScriptLearning/usePrettier',
        collapsable: false, // 不折叠
        children: [{ title: '使用Prettier统一格式化项目代码', path: '/JavaScriptLearning/usePrettier' }],
      },
      {
        title: '英语学习',
        path: '/EnglishLearning/note',
        collapsable: false, // 不折叠
        children: [{ title: '英语学习笔记', path: '/EnglishLearning/note' }],
      },
    ],
  },
};
