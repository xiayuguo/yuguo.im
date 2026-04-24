---
title: Claude Code Cheat Sheet
date: 2026-04-24T12:40:00+08:00
duration: 10min
draft: false
tags:
  - Claude Code
  - AI
---

[[toc]]

> 参考自 [cc.storyfox.cz](https://cc.storyfox.cz/) · 适用于 Claude Code v2.1.118+

---

## ⌨️ 键盘快捷键

### 通用控制
| 快捷键 | 说明 |
|---|---|
| `Ctrl+C` | 取消当前输入/生成 |
| `Ctrl+D` | 退出会话 |
| `Ctrl+L` | 清空提示符并强制全屏重绘 |
| `Ctrl+O` | 切换文本记录查看器 |
| `Ctrl+U` | 清空整个输入缓冲区 |
| `Ctrl+Y` | 恢复被清空的输入缓冲区 |
| `Ctrl+G` | 在编辑器中打开当前输入 |
| `Ctrl+R` | 反向搜索历史记录 |
| `Ctrl+B` | 后台运行任务 |
| `Ctrl+T` | 切换任务列表 |
| `Ctrl+X Ctrl+K` | 杀死所有后台代理 |
| `Esc Esc` | 回滚（rewind）或生成总结 |

### 模式与模型切换
| 快捷键 | 说明 |
|---|---|
| `Shift+Tab` | 循环切换权限模式 |
| `Option+P` (Mac) | 切换模型 |
| `Option+T` (Mac) | 切换扩展思考（extended thinking） |
| `Option+O` (Mac) | 切换快速模式（fast mode） |

### 输入
| 按键 | 说明 |
|---|---|
| `\` + `Enter` | 插入换行 |
| `v` | Vim 字符选择模式 |
| `V` | Vim 行选择模式 |

---

## ⚡ 斜杠命令（Slash Commands）

### 会话管理
| 命令 | 说明 |
|---|---|
| `/clear` | 清空当前对话 |
| `/compact [focus]` | 压缩上下文（可指定焦点） |
| `/branch [name]` | 从当前对话创建分支 |
| `/usage` | 显示 token 使用量、成本、缓存明细（取代旧版 `/cost` `/stats`） |
| `/context` | 以网格方式可视化上下文占用 |
| `/diff` | 交互式 diff 查看器 |
| `/copy [N]` | 复制最后一条或第 N 条响应 |
| `/recap` | 离开再回来时重新总结会话 |
| `/undo` / `/rewind` | 回滚到对话或代码检查点 |
| `/export` | 导出对话 |
| `/plan [desc]` | 直接进入计划模式 |
| `/resume [session]` | 按 ID 或名称恢复会话 |
| `/rename [name]` | 重命名当前会话 |

### 配置
| 命令 | 说明 |
|---|---|
| `/model [name]` | 切换模型 |
| `/fast [on\|off]` | 切换 Fast 模式（仅 Opus 4.6 可用） |
| `/theme [name]` | 创建或切换自定义主题 |
| `/effort [level]` | 设置思考强度 low/medium/high/ultra/max |
| `/permissions` | 查看或更新权限 |
| `/color [color]` | 设置提示栏颜色 |
| `/keybindings` | 自定义键盘绑定 |
| `/terminal-setup` | 配置终端键绑定 |

### 工具与分析
| 命令 | 说明 |
|---|---|
| `/init` | 在项目根创建 CLAUDE.md |
| `/memory` | 编辑所有 CLAUDE.md 文件 |
| `/mcp` | 管理 MCP 服务器 |
| `/hooks` | 管理钩子 |
| `/skills` | 列出可用技能 |
| `/agents` | 管理子代理配置 |
| `/review [PR]` | 本地审查 PR |
| `/ultrareview [PR#]` | 云端多智能体代码审查 |
| `/simplify [focus]` | 三智能体代码审查并修复 |
| `/security-review` | 扫描安全漏洞 |
| `/less-permission-prompts` | 自动生成允许列表，减少权限弹窗 |
| `/loop [interval] [prompt]` | 周期性循环执行任务 |
| `/schedule` | 创建、管理定时远程代理（routines） |
| `/chrome` | Chrome 集成 |
| `/ide` | 查看 IDE 集成状态 |
| `/reload-plugins` | 热重载插件 |
| `/add-dir <path>` | 添加工作目录到上下文 |

### 其他
| 命令 | 说明 |
|---|---|
| `/btw <question>` | 附带提问（不打断主线） |
| `/extra-usage` | 触发限流时查看额外用量 |
| `/voice` | 切换语音听写 |
| `/doctor` | 诊断安装环境 |
| `/insights` | 分析会话、生成报告 |
| `/desktop` | 在桌面应用继续当前会话 |
| `/help` | 显示帮助和命令列表 |
| `/feedback` | 提交反馈 |

---

## 🖥️ CLI 命令和标志

### 核心命令
```bash
claude                  # 交互模式
claude "query"          # 交互模式 + 初始提示
claude -p "query"       # 无头（headless）模式
claude -c               # 继续最近一次会话
claude -r "name"        # 按 ID 或名称恢复
claude update           # 更新到最新版
claude auth login       # 登录
claude agents           # 列出代理
claude mcp              # 配置 MCP
claude plugin           # 插件管理
```

### 常用标志
| 标志 | 说明 |
|---|---|
| `--model` | 指定模型 |
| `-n, --name` | 指定会话名称 |
| `-r, --resume` | 恢复会话 |
| `-c, --continue` | 继续最近会话 |
| `--add-dir` | 添加额外工作目录 |
| `--agent` | 使用指定代理 |
| `--agents <json>` | 通过 JSON 定义代理 |
| `--allowedTools` | 预批准工具列表 |
| `--disallowedTools` | 移除工具 |
| `--allow-dangerous-*` | 追加绕过权限 |
| `--output-format` | text / json / stream-json |
| `--json-schema` | 结构化输出 Schema |
| `--max-turns` | 限制对话轮数 |
| `--max-budget-usd` | 成本上限（USD） |
| `--exclude-dynamic-*` | 提升提示缓存命中率 |
| `--bare` | 最小模式 |
| `--channels` | MCP 推送通知频道 |
| `--remote` | 远程 Web 会话 |
| `--rc, --remote-control` | 远程控制模式 |
| `--effort` | 设置思考强度 |
| `--permission-mode` | 权限模式 |
| `--dangerously-skip-permissions` | 跳过所有权限提示 |
| `--chrome` / `--no-chrome` | 开关 Chrome 集成 |
| `--debug [filter]` | 调试日志 |
| `--system-prompt` | 自定义系统提示 |
| `--settings <file>` | 加载指定 settings JSON |
| `--sso` | SSO 登录 |
| `--console` | 控制台登录 |

---

## 📁 记忆与文件

### CLAUDE.md 位置（从上到下优先级递减）
| 路径 | 作用 |
|---|---|
| `./CLAUDE.md` 或 `./.claude/CLAUDE.md` | 项目级（可提交到 VCS） |
| `./CLAUDE.local.md` | 本地项目笔记（不提交） |
| `~/.claude/CLAUDE.md` | 个人级（全局） |
| `/etc/claude-code/CLAUDE.md` | 托管策略 |

### 规则
- `.claude/rules/*.md` — 项目规则
- `~/.claude/rules/*.md` — 用户规则

### 自动加载内存目录
- 启动时最多加载 25KB 或 200 行

---

## 🔌 MCP 服务器

### Transport 类型
| 类型 | 说明 |
|---|---|
| `--transport http` | 远程 HTTP（推荐） |
| `--transport stdio` | 本地子进程 |
| `--transport sse` | 远程 Server-Sent Events |

### 配置作用域
| 位置 | 作用 |
|---|---|
| `~/.claude.json` | 用户全局 |
| `.mcp.json` | 项目共享（可提交） |

---

## ⚙️ 配置文件

| 文件 | 作用 |
|---|---|
| `~/.claude/settings.json` | 用户设置 |
| `.claude/settings.json` | 项目共享设置 |
| `.claude/settings.local.json` | 项目本地设置（不提交） |
| `~/.claude.json` | OAuth、MCP、状态 |
| `.mcp.json` | 项目 MCP 服务器 |

### 关键配置项
- `modelOverrides` — 模型选择器映射
- `autoMemoryDirectory` — 自定义内存目录
- `worktree.sparsePaths` — 稀疏检出目录
- `sandbox.failIfUnavailable` — 沙箱不可用时退出
- `hooks.if` — 条件钩子
- `hooks.defer` — 暂停无头会话
- `showThinkingSummaries` — 显示思考总结
- `allowedChannelPlugins` — 允许的频道插件
- `disableSkillShellExec` — 阻止技能执行 shell
- `forceRemoteSettings` — 强制远程设置
- `refreshInterval` — 自定义状态栏刷新间隔
- `PermissionDenied` — 自动模式被拒时的钩子

---

## 🔑 环境变量

### 账号与模型
| 变量 | 说明 |
|---|---|
| `ANTHROPIC_API_KEY` | API 密钥 |
| `ANTHROPIC_MODEL` | 默认模型 |
| `ANTHROPIC_BASE_URL` | 代理/网关地址 |
| `ANTHROPIC_BETAS` | Beta 头部 |
| `ANTHROPIC_CUSTOM_MODEL_OPTION` | 自定义模型条目 |

### 思考与缓存
| 变量 | 说明 |
|---|---|
| `MAX_THINKING_TOKENS` | 思考 token 上限 |
| `ENABLE_PROMPT_CACHING_1H` | 启用 1 小时缓存 |
| `FORCE_PROMPT_CACHING_5M` | 强制 5 分钟缓存 |
| `DISABLE_PROMPT_CACHING` | 禁用提示缓存 |

### 行为开关
| 变量 | 说明 |
|---|---|
| `CLAUDECODE` | 检测是否在 CC shell 中 |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | 强制生成摘要 |
| `CLAUDE_CODE_DISABLE_CRON` | 禁用计划任务 |
| `CLAUDE_CODE_FORK_SUBAGENT` | 启用 fork 子代理 |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | 禁用自动内存 |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | 禁用 1M 上下文 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 自动压缩阈值 |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | 自动压缩窗口 |
| `DISABLE_UPDATES` | 阻止所有更新 |
| `API_TIMEOUT_MS` | API 超时 |
| `MCP_TIMEOUT` | MCP 启动超时 |

---

## 💡 常用组合技

- **减少权限弹窗**：`/less-permission-prompts` 扫描历史并自动生成 allowlist
- **代码审查三连**：`/simplify` → `/security-review` → `/ultrareview`
- **定时任务**：`/loop 5m /babysit-prs` 每 5 分钟运行一次
- **一次性跟进**：`/schedule` 创建 2 周后清理 feature flag 的 routine
- **上下文濒满**：`/compact [focus]` 带上焦点压缩，或 `/branch` 分叉
- **Fast 模式**：`/fast on`（仅 Opus 4.6）加速输出、不降智
