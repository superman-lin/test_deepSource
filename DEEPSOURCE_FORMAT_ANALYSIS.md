# DeepSource 代码格式化未自动修复 — 原因分析

根据 [DeepSource 官方文档](https://docs.deepsource.com/docs/guides/setup-code-formatting)，代码格式化**仅在特定条件下**才会执行。若未看到自动修复，可按下面原因逐项排查。

---

## 一、最可能的原因

### 1. 未在 Dashboard 中启用 Code Formatters（最常见）

- **文档说明**：配置的默认方式是在 **Dashboard** 里启用，而不是仅靠 `.deepsource.toml`。
- **操作**：打开 DeepSource → 进入该仓库 → **Settings → Code Formatters** → 搜索 **Prettier** → **打开开关**。
- 若只在 `.deepsource.toml` 里写了 `[[code_formatters]]` 却未在 Dashboard 开启，格式化可能不会跑。

### 2. 代码格式化只在「Pull Request」上运行

- **文档说明**：_"Code formatters automatically format your code on every **pull request**"_、_"When enabled, every **pull request** will be checked automatically."_
- **含义**：只有存在 **PR** 时，DeepSource 才会在该 PR 上跑 Prettier 并自动提交格式化结果。
- **若你只是 `git push` 到默认分支（如 main）且没有开 PR**：不会触发“在 PR 上自动格式化”的逻辑。
- **建议验证方式**：  
  新建分支 → 改一点代码（或保留现有 formatTest.js）→ 推送到该分支 → **针对默认分支开一个 PR** → 看 DeepSource 是否在该 PR 上自动加了一个格式化 commit。

### 3. 直接推默认分支时的行为依赖 Autofix 权限

- **文档说明**：_"If changes are made directly to the default branch without a pull request, DeepSource automatically generates a **new pull request** with the necessary formatting changes."_
- 也就是说：**直接推默认分支**时，DeepSource 不会在默认分支上直接改代码，而是会尝试**自动创建一个新 PR** 把格式化结果放进去。
- **前提**：**Settings → Autofix™** 中，DeepSource 需要有 **自动创建 PR / 推送到仓库** 的权限；若权限未授予或未开启，就不会看到自动修复或自动 PR。

---

## 二、其他可能原因

### 4. Fork 仓库的写权限限制

- 若仓库是 **GitHub Fork**，GitHub 可能限制第三方应用直接向 Fork 的分支推送。
- **结果**：DeepSource 无法把格式化 commit 推上去，看起来就像“没有自动修复”。
- **可行做法**：在 Fork 上照常开 PR；若无法自动推送，可合并 PR 后依赖合并产生的 commit，或在本仓库（非 Fork）上测试。

### 5. 仅配置了 .deepsource.toml，但 Dashboard 未启用

- 文档提到：_"Dashboard configuration is the **default**"_、_"TOML-based configuration is an **optional alternative**"_。
- 若 Dashboard 里 **Code Formatters** 区域没有启用 Prettier，仅靠 TOML 可能不生效或被忽略。
- **建议**：**Dashboard 里启用 Prettier**，`.deepsource.toml` 中的 `[[code_formatters]]` 可作为补充或与 Dashboard 保持一致。

### 6. 首次启用或配置刚改完

- 首次启用 Code Formatters 或刚改配置后，有时需要等**一次完整分析**跑完。
- 建议：启用并保存后，新开一个 PR 或新推一个 commit 到已有 PR，再等几分钟看是否出现格式化 commit。

---

## 三、推荐验证步骤（按顺序做）

| 步骤 | 操作                                                                                                                                                                |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | DeepSource 控制台 → 该仓库 → **Settings → Code Formatters** → 确认 **Prettier** 已开启。                                                                            |
| 2    | 确认 **Settings → Autofix™** 已授予 DeepSource 创建 PR / 推送的权限（若需在默认分支直接 push 时也看到自动 PR）。                                                    |
| 3    | 用 **PR** 触发：新建分支 → 推送包含 `src/utils/formatTest.js` 的提交 → 对该仓库**默认分支**开 PR → 等待分析完成，查看是否多出一个“格式化”的 commit。                |
| 4    | 若仍无自动修复：检查仓库是否为 Fork、是否有分支/权限限制，并在 DeepSource 的 **Audit log / 分析记录** 中查看该 PR 是否有“Code Formatters”或“Prettier”相关执行记录。 |

---

## 四、总结

| 可能原因                      | 处理方式                                           |
| ----------------------------- | -------------------------------------------------- |
| 未在 Dashboard 启用 Prettier  | Settings → Code Formatters → 打开 Prettier         |
| 只有直接 push，没有 PR        | 改为「开 PR」再观察是否在 PR 上自动格式化          |
| 直接推默认分支但未看到自动 PR | 检查 Autofix 权限，并确认文档中“自动创建 PR”的条件 |
| 仅配置 TOML、Dashboard 未开   | 以 Dashboard 启用为主，TOML 为辅                   |
| Fork 或权限限制               | 在主仓库测试，或合并 PR 后查看合并结果             |

当前项目中的 `.deepsource.toml` 已包含正确的 `[[code_formatters]] name = "prettier"` 配置，**下一步优先在 DeepSource 控制台里启用 Code Formatters 的 Prettier，并用一次“新建分支 + 开 PR”的方式验证**。
