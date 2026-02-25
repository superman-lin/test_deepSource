# Vue 2 DeepSource JS 分析器验证 Demo

用于验证 [DeepSource](https://deepsource.com) 的 **JavaScript 分析器** 对 Vue 2 项目的检测能力。

## 项目说明

- **Vue 版本**: 2.7
- **构建工具**: Vue CLI 5
- **DeepSource**: 通过根目录 `.deepsource.toml` 启用 `javascript` 分析器，并配置 `plugins = ["vue"]`

## 故意编写的“错误代码”（供 DeepSource 检测）

| 文件 | 问题类型 | 预期规则 / 说明 |
|------|----------|-----------------|
| `BuggyList.vue` | `v-for` 未绑定 `key` | `vue/require-v-for-key` |
| `MutatingPropsDemo.vue` | 在子组件内直接修改 prop | `vue/no-mutating-props` |
| `UnsafeHtmlDemo.vue` | 使用 `v-html` 渲染用户输入（XSS 风险） | 安全类规则 |
| `DeprecatedApiDemo.vue` | 使用 `==`、未使用变量、`console.log` | `eqeqeq`、`no-unused-vars`、`no-console` 等 |

## 本地运行

```bash
npm install
npm run serve
```

## 本地 Lint（与 DeepSource 规则对齐）

```bash
npm run lint
```

若 `vue-cli-service lint` 在本地报错，可直接用 ESLint 检查：

```bash
npx eslint "src/**/*.{js,vue}"
```

预期会报出：`vue/require-v-for-key`、`vue/no-mutating-props`、`eqeqeq`、`no-console` 等问题。

## 在 DeepSource 中验证

1. 将本仓库连接到 DeepSource。
2. 确保仓库/分析配置中启用了 **JavaScript** 分析器，且启用了 **Vue** 插件（或在仓库根目录使用本项目的 `.deepsource.toml`）。
3. 触发一次分析，在 DeepSource 的 Issue 列表中查看上述文件是否被报出对应问题。

## 参考

- [DeepSource - JavaScript Analyzer](https://docs.deepsource.com/docs/analyzers-javascript)
- [eslint-plugin-vue Rules](https://eslint.vuejs.org/rules/)
