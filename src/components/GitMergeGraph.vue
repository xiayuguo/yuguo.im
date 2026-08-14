<script setup lang="ts">
type Tone = 'main' | 'feat' | 'merge' | 'squash' | 'muted'

interface Line {
  d: string
  tone: Tone
  dashed?: boolean
  arrow?: boolean
}

interface Dot {
  text: string
  x: number
  y: number
  tone: Tone
  r?: number
}

interface Note {
  text: string
  x: number
  y: number
  tone?: Tone
  anchor?: 'start' | 'middle' | 'end'
  size?: number
}

interface Graph {
  height: number
  alt: string
  lines: Line[]
  dots: Dot[]
  notes: Note[]
}

defineOptions({ name: 'GitMergeGraph' })

const props = defineProps<{ mode: 'init' | 'ff' | 'no-ff' | 'squash' }>()

const GRAPHS: Record<string, Graph> = {
  // main 停在 C，feature 从 C 拉出多了 D、E —— 两边没有分叉
  'init': {
    height: 175,
    alt: '初始状态：main 在 C，feature 在 E，共同祖先是 C',
    lines: [
      { d: 'M70 55 H230', tone: 'main' },
      { d: 'M230 55 C 285 55, 285 130, 335 130', tone: 'feat' },
      { d: 'M335 130 H415', tone: 'feat' },
    ],
    dots: [
      { text: 'A', x: 70, y: 55, tone: 'main' },
      { text: 'B', x: 150, y: 55, tone: 'main' },
      { text: 'C', x: 230, y: 55, tone: 'main' },
      { text: 'D', x: 335, y: 130, tone: 'feat' },
      { text: 'E', x: 415, y: 130, tone: 'feat' },
    ],
    notes: [
      { text: '← main', x: 258, y: 36, tone: 'main' },
      { text: '← feature', x: 441, y: 135, tone: 'feat' },
      { text: '共同祖先 C', x: 200, y: 100, anchor: 'middle', size: 11.5 },
      { text: 'HEAD 在 main，C 是 E 的祖先，两边没有分叉 —— 快进是可能的', x: 70, y: 166, size: 11.5 },
    ],
  },

  // 指针快进，提交总数不变
  'ff': {
    height: 150,
    alt: 'fast-forward 之后：A B C D E 一条直线，没有新提交',
    lines: [
      { d: 'M70 75 H470', tone: 'main' },
      { d: 'M276 48 C 330 20, 420 20, 466 48', tone: 'muted', dashed: true, arrow: true },
    ],
    dots: [
      { text: 'A', x: 70, y: 75, tone: 'main' },
      { text: 'B', x: 170, y: 75, tone: 'main' },
      { text: 'C', x: 270, y: 75, tone: 'main' },
      { text: 'D', x: 370, y: 75, tone: 'feat' },
      { text: 'E', x: 470, y: 75, tone: 'feat' },
    ],
    notes: [
      { text: 'main 指针快进（没有新提交）', x: 371, y: 18, anchor: 'middle' },
      { text: 'main / feature', x: 470, y: 113, tone: 'main', anchor: 'middle' },
      { text: '两个名字指向同一个提交', x: 470, y: 133, anchor: 'middle', size: 11.5 },
    ],
  },

  // 强制生成双父合并提交 M
  'no-ff': {
    height: 190,
    alt: 'no-ff 之后：生成有两个父的合并提交 M，提交链出现菱形',
    lines: [
      { d: 'M70 55 H525', tone: 'main' },
      { d: 'M230 55 C 285 55, 285 135, 335 135', tone: 'feat' },
      { d: 'M335 135 H415', tone: 'feat' },
      { d: 'M415 135 C 470 135, 480 55, 525 55', tone: 'feat' },
    ],
    dots: [
      { text: 'A', x: 70, y: 55, tone: 'main' },
      { text: 'B', x: 150, y: 55, tone: 'main' },
      { text: 'C', x: 230, y: 55, tone: 'main' },
      { text: 'D', x: 335, y: 135, tone: 'feat' },
      { text: 'E', x: 415, y: 135, tone: 'feat' },
      { text: 'M', x: 525, y: 55, tone: 'merge', r: 15 },
    ],
    notes: [
      { text: '← main（M）', x: 549, y: 36, tone: 'merge' },
      { text: 'feature 仍指向 E', x: 415, y: 172, tone: 'feat', anchor: 'middle' },
      { text: '第一父 C', x: 378, y: 42, anchor: 'middle', size: 11.5 },
      { text: '第二父 E', x: 500, y: 110, anchor: 'end', size: 11.5 },
    ],
  },

  // 只搬内容，不建立父子关系
  'squash': {
    height: 195,
    alt: 'squash 之后：main 上多出单父提交 S，feature 的链路没有进入 main',
    lines: [
      { d: 'M70 55 H330', tone: 'main' },
      { d: 'M230 55 C 300 55, 315 140, 395 140', tone: 'feat' },
      { d: 'M395 140 H475', tone: 'feat' },
      { d: 'M428 116 C 405 95, 372 80, 350 74', tone: 'squash', dashed: true, arrow: true },
    ],
    dots: [
      { text: 'A', x: 70, y: 55, tone: 'main' },
      { text: 'B', x: 150, y: 55, tone: 'main' },
      { text: 'C', x: 230, y: 55, tone: 'main' },
      { text: 'S', x: 330, y: 55, tone: 'squash', r: 15 },
      { text: 'D', x: 395, y: 140, tone: 'feat' },
      { text: 'E', x: 475, y: 140, tone: 'feat' },
    ],
    notes: [
      { text: '← main（S，父只有 C）', x: 356, y: 36, tone: 'squash' },
      { text: '← feature', x: 501, y: 145, tone: 'feat' },
      { text: '只复制内容，不建立父子关系', x: 448, y: 102, tone: 'squash', size: 11.5 },
      { text: 'S 的内容 = D+E 的合并结果；D、E 本身没有进入 main 的历史', x: 70, y: 180, size: 11.5 },
    ],
  },
}

const graph = computed(() => GRAPHS[props.mode])

function color(tone: Tone = 'muted') {
  return `var(--gm-${tone})`
}

/**
 * 排版相关的属性一律走内联 style：SVG presentation attribute
 * （font-size / text-anchor 等）优先级低于 CSS，会被 UnoCSS attributify
 * 为 `font-size="13"` 这类属性生成的工具类规则覆盖掉。
 */
function textStyle(note: Note) {
  return {
    fontSize: `${note.size ?? 12.5}px`,
    textAnchor: note.anchor ?? 'start',
    fill: color(note.tone),
  }
}

function dotTextStyle(dot: Dot) {
  return {
    fontSize: '13px',
    fontWeight: 600,
    textAnchor: 'middle',
    fill: dot.tone === 'feat' ? 'var(--gm-on-feat)' : 'var(--gm-on)',
  }
}

function lineStyle(line: Line) {
  return {
    fill: 'none',
    stroke: color(line.tone),
    strokeWidth: line.dashed ? 1.5 : 2.5,
    strokeDasharray: line.dashed ? '5 4' : undefined,
  }
}
</script>

<template>
  <figure class="gm">
    <div class="scroll">
      <svg :viewBox="`0 0 660 ${graph.height}`" role="img" :aria-label="graph.alt">
        <defs>
          <template v-for="(line, i) in graph.lines" :key="i">
            <marker
              v-if="line.arrow" :id="`gm-arrow-${mode}-${i}`"
              markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 z" :style="{ fill: color(line.tone) }" />
            </marker>
          </template>
        </defs>

        <path
          v-for="(line, i) in graph.lines" :key="i"
          :d="line.d"
          :style="lineStyle(line)"
          :marker-end="line.arrow ? `url(#gm-arrow-${mode}-${i})` : undefined"
        />

        <g v-for="dot in graph.dots" :key="dot.text">
          <circle :cx="dot.x" :cy="dot.y" :r="dot.r ?? 14" :style="{ fill: color(dot.tone) }" />
          <text :x="dot.x" :y="dot.y + 5" :style="dotTextStyle(dot)">
            {{ dot.text }}
          </text>
        </g>

        <text
          v-for="note in graph.notes" :key="note.text"
          :x="note.x" :y="note.y"
          :style="textStyle(note)"
        >
          {{ note.text }}
        </text>
      </svg>
    </div>
  </figure>
</template>

<style scoped>
.gm {
  --gm-main: #2f6fd0;
  --gm-feat: #b06c12;
  --gm-merge: #7c4dbd;
  --gm-squash: #1f8a63;
  --gm-muted: #888781;
  --gm-on: #fff;
  --gm-on-feat: #fff;

  margin: 1.5rem 0;
}

:global(.dark) .gm {
  --gm-main: #7aa9ee;
  --gm-feat: #e6a95a;
  --gm-merge: #b393e6;
  --gm-squash: #5fc79c;
  --gm-muted: #8c8b86;
  --gm-on: #0b0b0b;
  --gm-on-feat: #0b0b0b;
}

/* 窄屏不缩字，改为容器内横向滚动 */
.scroll {
  overflow-x: auto;
  padding-bottom: 2px;
}

svg {
  display: block;
  width: 100%;
  min-width: 560px;
  height: auto;
}

text {
  font-family: var(--prose-font-mono, ui-monospace, sfmono-regular, menlo, consolas, monospace);
}
</style>
