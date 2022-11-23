---
title: 使用Prettier统一格式化项目代码
author: 树不梢
date: '2022-11-23'
---

## IDE 整合

### vs code

1. 安装 [Prettier 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

2. 保存文件时自动格式化: 打开设置, editor.formatOnSave, 设为 true

### Git 整合

## Prettier 和各种 Linters

首先明确:

- eslint（包括其他一些 lint 工具）的主要功能包含 代码格式的校验(Formatting rules)，代码质量的校验(Code-quality rules)
- 而 Prettier 只是代码格式的校验（并格式化代码），不会对代码质量进行校验
- 代码格式问题通常指的是：单行代码长度、tab 长度、空格、逗号表达式等问题
- 而代码质量问题指的是：未使用变量、三等号、全局变量声明等问题
- Prettier 对 Code-quality rules 这类规则束手无策。而且这类规则也正是各种 Linters 的重点，因为它们真的能帮你发现很多低级的 Bug
- 所以，Prettier 并不会取代各种 Linters
- Linters 检查出来违反 Code-quality rules 的情况后还需要你自己根据业务逻辑和语法手动修改
- Prettier 帮你格式化代码，但是不会帮你挑出潜在的错误

那么既要让 Prettier 帮你格式化代码，还想让 Linters 帮你挑出潜在的 Code-quality 类错误，怎么办？就需要 Prettier 和 Linters 配合使用

### ESLint plugin

VSCode 中的 plugin ESLint，其起到的作用是，让编辑器集成了 ESLint 功能，包括：

- 显式在编辑框中标注 lint 问题代码
- 在保存时触发 ESLint 检查
- 自动修复 lint 问题代码

另外，让编辑器多了几个与 ESLint 相关的命令：

- ESLint: Create ESLint configuration -- 创建 ESLint 配置文件，类似于 eslint --init
- ESLint: Disable ESLint -- 关闭 ESLint 插件功能
- ESLint: Enable ESLint -- 开启 ESLint 插件功能
- ESLint: Fix all auto-fixable Problems -- 一键修复 Lint 问题代码

需要注意的是，ESLint plugin 和上文中提到的 ESLint package 并不冲突，它本身仍然立足于后者，只是针对编辑器环境做了一些功能扩展。换句话说，ESLint plugin 能正常使用的前提是：全局或者本地中，已经安装了 eslint 这个 package。

### Prettier plugin

Prettier 团队为 VSCode 开发了一个插件：Prettier Plugin。和 ESLint Plugin 不同，Prettier Plugin 可以独立于 prettier package 使用，使用该插件，可以在 VSCode 中，使用命令或者快捷键快速对单个文件或者代码片段（选中区域）进行格式化:

```
1. CMD + Shift + P -> Format Document

OR

1. Select the text you want to Prettify

2. CMD + Shift + P -> Format Selection
   同样，使用 Prettier Plugin 提供的功能有些类似于 npx prettier some.js --write，只是前者更强大些（毕竟能处理代码片段）；npx prettier 的配置选项默认来自于 prettier 配置文件（譬如.prettierrc），prettier plugin 也类似，详见 prettier-vscode#settings。所以说，如果同时使用 prettier package 和 prettier plugin，可以共用一份配置文件。
```

既然 prettier plugin 可以独立于 prettier package 使用，后者是不是就没有存在的价值呢？或者说，工程项目中是否就应该省略 npm i -D prettier 呢？prettier package 是有存在价值呢，如果想把代码 format 纳入到 pr 管理中，在 CI 工具中，显然要用到它。

### 个人使用思路

个人认为, 工具是为开发服务的, 提升开发的效率, 重要的是, 让团队使用统一的规范.

对于 代码格式的校验(Formatting rules),eslint 和 prettier 都有, 个人认为, 先选一种规范

## 配置项

每个选项的细节还是要参考[官方文档](https://prettier.io/docs/en/options.html)，这里不详细列出。

Prettier 先把代码转换成一种中间状态，叫 AST(Abstract Syntax Tree)。

用 Prettier 提供的[Playground](https://prettier.io/playground/)更直观看到, 也可以在这里尝试各种配置项效果。

| 选项                                        | 解释                                                               | 默认值                             |
| ------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------- |
| Print Width                                 | 换行的宽度，其实对于现在普遍的宽屏显示器可以适当调高。             | 80                                 |
| Tab Width                                   | Tab 字符的空格宽度                                                 | 2                                  |
| Tabs                                        | 缩进用 Tab 还是用空格                                              | useTabs: false                     |
| Semicolons                                  | 是否行尾自动加上分号                                               | semi: true                         |
| Quotes                                      | 是否用单引号替代双引号，JSX 会忽略这个配置                         | singleQuote: false                 |
| Quote Props                                 | 对象里的 key 要不要用引号包裹                                      | quoteProps: "as-needed"            |
| JSX Quotes                                  | JSX 里多行元素的>是否出现在新的一行                                | jsxSingleQuote: false              |
| Trailing Commas                             | JSX 里多行元素的>是否出现在新的一行                                | trailingComma: 'es5'               |
| Bracket Spacing                             | 对象直接量括号之间是否有空格                                       | bracketSpacing: true               |
| JSX Brackets                                | JSX 里多行元素的>是否出现在新的一行                                | jsxBracketSameLine: false          |
| Arrow Function Parentheses                  | 箭头函数的单参数是否用括号包裹                                     | arrowParens: 'always'              |
| Range                                       | 文件格式化的范围                                                   |                                    |
| Parser                                      | 指定哪种解析器                                                     |                                    |
| File Path                                   | 指定文件路径                                                       |                                    |
| Require pragma                              | 限制只格式化头部带有特殊注释(pragma)的文件                         | requirePragma: false               |
| Insert Pragma                               | 插入 pragma                                                        | insertPragma: false                |
| Prose Wrap                                  | 包裹 markdown 的文本                                               | insertPragma: false                |
| HTML Whitespace Sensitivity                 | 处理 HTML 的空白字符                                               |                                    |
| Vue files script and style tags indentation | indent the code inside script and style tags in Vue files          | vueIndentScriptAndStyle: false     |
| End of Line                                 | 处理换行行尾字符(因为它跟操作系统相关)                             | endOfLine: 'lf'                    |
| Embedded Language Formatting                | Control whether Prettier formats quoted code embedded in the file. | embeddedLanguageFormatting: 'auto' |

## 参考

1. [Prettier 看这一篇就行了](https://zhuanlan.zhihu.com/p/81764012)
2. [使用 eslint、prettier 优化代码](https://zhangbuhuai.com/post/eslint-prettier.html)
