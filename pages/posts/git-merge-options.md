---
title: 'git merge 的三种链路形态：--ff / --no-ff / --squash'
date: 2026-08-14T16:40:00+08:00
duration: 8min
draft: false
tags:
  - Git
---

> 这三个选项决定的不是「代码怎么合」，而是**合完之后提交链长什么样** —— 分支指针怎么动、有没有新提交、新提交有几个父。

<GitMergeLegend />

## 起点：统一的初始状态

main 停在 C 之后没再动；feature 从 C 拉出，多了 D、E。因为 **C 是 E 的祖先、两边没有分叉**，所以此时「快进（fast-forward）」是可能的。

<GitMergeGraph mode="init" />

## `--ff`：只挪指针，不留痕迹（默认）

既然 main 上没有新提交，git 根本不需要「合」任何东西：把 main 这个指针直接**快进**到 E 就行。提交总数不变，历史是一条直线。

<GitMergeGraph mode="ff" />

- **前提**：能快进才快进。一旦 main 上也有了新提交（出现分叉），`--ff` 自动失效，git 会退化成造一个 merge commit。
- **好处**：历史干净、线性，`git log` 一条线读下来。
- **代价**：事后完全看不出「这里曾经有一个 feature 分支」，D、E 混进主干序列里；想整体回滚只能一个个 revert。
- **想强制线性**：`git merge --ff-only` —— 不能快进就直接报错退出，绝不偷偷造合并提交。CI 与主干保护常用这个。

## `--no-ff`：即使能快进也要造一个合并提交

强制生成合并提交 **M**。M 的特点是**有两个父**：第一父 C（主干来路）、第二父 E（被合进来的分支）。提交链因此出现一个「菱形」。

<GitMergeGraph mode="no-ff" />

- **好处**：分支边界永久保留。`git log --graph --first-parent` 看主干时，一个功能就是一个节点。
- **整体回滚很爽**：`git revert -m 1 M` 一条命令撤掉整个功能。
- **代价**：历史图变成「铁路网」，多出很多信息量为零的 `Merge branch 'feature'` 提交。
- **默认场景**：合并 annotated / signed tag 时 git 本来就用 `--no-ff`（因为要把 tag 信息记进合并提交）。想让所有合并都这样：`git config --global merge.ff false`。

> [!NOTE]
> D、E 两个提交**原样保留在 main 的历史里**，作者、时间、单个提交的 diff 全都在，`git bisect` 能定位到 D 或 E。

## `--squash`：只要结果，不要链路

git 把 D+E 的**合并结果**铺到工作区和索引里，然后**就停在这儿**：不提交、不移动 HEAD、不写 `MERGE_HEAD`。你自己 `git commit`，得到一个普通的**单父**提交 S。

<GitMergeGraph mode="squash" />

```bash
git merge --squash feature   # 改动已在工作区 + 索引，尚未提交
git status                   # 看到一堆 staged 改动
git commit -m "feat: 用户导入功能"   # 这才产生 S
```

- **好处**：主干只留一个语义完整的提交，分支里 `wip`、`fix typo`、`再改一下` 全部消失。
- **代价 1**：中间提交历史丢了 —— bisect 粒度变粗，分支内多人协作的作者信息被并成提交者一人。
- **代价 2（最容易踩）**：因为没有父子关系，**git 不知道 feature 已经合过了**。`git branch --merged` 不会列出它；之后再从这个分支合过来，同样的改动会被重新算一遍，极易冲突。所以 squash 之后应当**删掉该分支**，不要继续在上面开发。
- `--no-squash` 用来**覆盖前面的 `--squash`**（比如别名、脚本或配置里已经加了 `--squash`），恢复「真合并并直接提交」的行为。

> [!WARNING]
> `--squash` 和 `--ff / --no-ff` 不是同一维度的东西。前两者决定「要不要造合并提交」，`--squash` 决定「要不要保留分支链路」—— 它产生的 S 是个普通提交，不是合并提交。

## 一张表对齐三者

|                     | `--ff`（默认）    | `--no-ff`       | `--squash`                    |
| ------------------- | ----------------- | --------------- | ----------------------------- |
| 新提交              | 无                | 1 个合并提交 M  | 1 个普通提交 S（手动 commit） |
| 新提交的父          | —                 | 2 个（C 和 E）  | 1 个（C）                     |
| HEAD / 分支指针     | 快进到 E          | 移到 M          | **不动**，等你提交            |
| D、E 是否进主干历史 | 是（原样）        | 是（原样）      | 否（只有内容）                |
| 历史形状            | 直线              | 菱形 / 分叉图   | 直线                          |
| git 认为已合并      | 是                | 是              | **否**                        |
| 整体回滚            | 逐个 revert       | `revert -m 1 M` | `revert S`                    |
| 有分叉时            | 失效 → 自动真合并 | 照常合并        | 照常压扁                      |

## 怎么选

- **短小的个人分支 / 只有一两个提交**：`--ff`（默认）即可，别给历史加噪音。
- **有意义的功能块，需要可追溯与整体回滚（release / hotfix / 大特性）**：`--no-ff`。
- **分支里提交很碎、过程不值得留档（典型的 PR 合主干）**：`--squash`，合完删分支。GitHub 的 “Squash and merge” 就是它。
- **团队想要纯线性历史**：合并前先 `git rebase main`，再 `git merge --ff-only`。

```bash
git config merge.ff false          # 本仓库所有 merge 都造合并提交
git config --global pull.ff only   # pull 不许自动造合并提交
```
