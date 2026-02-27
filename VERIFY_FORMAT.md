# DeepSource 代码格式化自动修复 - 验证说明

## 验证用文件

- **`src/utils/formatTest.js`**：故意写了不符合 Prettier 规范的代码（缩进混乱、无分号、对象/数组不换行、超长行等），用于触发 DeepSource 的自动修复。

## 验证步骤

### 1. 本地预览 Prettier 修复效果（可选）

```bash
npm install
npx prettier --write src/utils/formatTest.js
```

查看 `formatTest.js` 的 diff，即可看到 Prettier 会做哪些自动修复。

### 2. 在 DeepSource 上验证自动修复

1. **提交并推送** 当前代码（包含格式错误的 `formatTest.js`）到仓库：
   ```bash
   git add src/utils/formatTest.js
   git commit -m "test: 添加格式测试文件以验证 DeepSource Prettier 自动修复"
   git push
   ```

2. **打开 DeepSource 控制台**：在 [DeepSource](https://app.deepsource.com) 中打开本仓库。

3. **查看自动修复结果**：
   - **有 PR 时**：DeepSource 会在该 PR 上运行 Prettier，并**自动把格式化后的改动提交到同一分支**。
   - **在默认分支直接 push 时**：DeepSource 可能会**新建一个分支**（如 `deepsource-autofix-xxx`）并提交格式化结果，或在该分支上直接提交。

4. **对比修复前后**：在 DeepSource 的 Autofix / 提交历史 中查看对 `src/utils/formatTest.js` 的修改，应看到与本地运行 `prettier --write` 类似的格式化结果。

## 预期修复内容（formatTest.js）

| 问题           | 修复后表现                     |
|----------------|--------------------------------|
| 多余空格       | `const foo = "bar"`            |
| 对象写在一行   | 多属性换行、尾逗号             |
| 数组写在一行   | 按需换行、尾逗号               |
| 函数括号空格   | `function test(a, b, c)`       |
| 超长行         | 按行宽断行                     |
| 缺少分号       | 按 Prettier 默认规则添加分号   |

## 若未触发自动修复

- 确认仓库已在 DeepSource 中启用，且 **Code Formatters** 已开启。
- 在 DeepSource 仓库设置中查看 **Code Review > Code Formatters**，确认 Prettier 已启用。
- 首次启用 formatter 时，有时需要等待一次分析完成后再推送新提交。
