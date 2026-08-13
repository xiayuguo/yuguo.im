<script setup lang="ts">
interface Layer {
  abbr: string
  full: string
  zh: string
  note: string
  /** 用 **text** 标记加粗 */
  desc: string
  tone: string
}

defineOptions({ name: 'MemoryLayers' })

const props = defineProps<{ layers?: Layer[] }>()

const ALL: Layer[] = [
  {
    abbr: 'VSS',
    full: 'Virtual Set Size',
    zh: '虚拟耗用内存',
    note: '最虚 · 最不可信',
    desc: '进程申请的**全部虚拟地址空间**：含未映射物理页的区域、已换出（Swap）的页、共享库的完整大小。数字大，但不代表真实占用。',
    tone: 'vss',
  },
  {
    abbr: 'RSS',
    full: 'Resident Set Size',
    zh: '常驻物理内存',
    note: '会重复计算',
    desc: '真正装进物理内存的部分 = 独占物理内存 + 共享库的**完整**物理内存。多个进程共享同一个库时，**每个进程都完整计一遍**。',
    tone: 'rss',
  },
  {
    abbr: 'PSS',
    full: 'Proportional Set Size',
    zh: '比例物理内存',
    note: '最能反映真实贡献',
    desc: '独占物理内存 + **按共享进程数平摊**的共享物理内存。所有进程的 PSS 相加 ≈ 系统实际用量，最适合评估单进程的真实贡献。',
    tone: 'pss',
  },
  {
    abbr: 'USS',
    full: 'Unique Set Size',
    zh: '独占物理内存',
    note: '杀掉即释放',
    desc: '仅进程自身私有、不与任何人共享的物理内存。**杀掉该进程，系统能立即回收的量**就是它。',
    tone: 'uss',
  },
]

const isRoot = computed(() => !props.layers)
const list = computed(() => props.layers ?? ALL)
const current = computed(() => list.value[0])
const rest = computed(() => list.value.slice(1))

function segments(text: string) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) => ({ bold: i % 2 === 1, text: part }))
}
</script>

<template>
  <div :class="isRoot ? 'my-6' : ''">
    <div class="layer" :class="current.tone">
      <div flex="~ wrap" items-baseline justify-between gap-x-3 gap-y-1>
        <span class="tag">
          <b>{{ current.abbr }}</b>
          <small>{{ current.full }} · {{ current.zh }}</small>
        </span>
        <span class="note">{{ current.note }}</span>
      </div>

      <p class="desc">
        <template v-for="(seg, i) in segments(current.desc)" :key="i">
          <strong v-if="seg.bold">{{ seg.text }}</strong>
          <template v-else>
            {{ seg.text }}
          </template>
        </template>
      </p>

      <MemoryLayers v-if="rest.length" :layers="rest" mt-3.5 />
    </div>

    <div v-if="isRoot" class="scale">
      <span>数字更大 / 更虚</span>
      <span class="bar" />
      <span>更真实 / 更私有</span>
    </div>
  </div>
</template>

<style scoped>
/* 蓝色渐深：越往里 = 越真实、越私有的物理内存 */
.vss {
  --l-bg: #e4eefb;
  --l-bd: #bcd6f5;
  --l-fg: #0b0b0b;
  --l-sub: #52514e;
  --l-pill-bg: rgb(0 0 0 / 6%);
  --l-pill-fg: #52514e;
}
.rss {
  --l-bg: #bcd6f5;
  --l-bd: #8fbaef;
  --l-fg: #0b0b0b;
  --l-sub: #52514e;
  --l-pill-bg: rgb(0 0 0 / 6%);
  --l-pill-fg: #52514e;
}
.pss {
  --l-bg: #6da7ec;
  --l-bd: #4a90e6;
  --l-fg: #0b0b0b;
  --l-sub: rgb(11 11 11 / 82%);
  --l-pill-bg: rgb(0 0 0 / 12%);
  --l-pill-fg: #0b0b0b;
}
.uss {
  --l-bg: #256abf;
  --l-bd: #184f95;
  --l-fg: #fff;
  --l-sub: rgb(255 255 255 / 90%);
  --l-pill-bg: rgb(255 255 255 / 18%);
  --l-pill-fg: #fff;
}

.dark .vss {
  --l-bg: #20303f;
  --l-bd: #2f4a63;
  --l-fg: #fff;
  --l-sub: #c3c2b7;
  --l-pill-bg: rgb(255 255 255 / 8%);
  --l-pill-fg: #c3c2b7;
}
.dark .rss {
  --l-bg: #2f4a63;
  --l-bd: #31608f;
  --l-fg: #fff;
  --l-sub: #c3c2b7;
  --l-pill-bg: rgb(255 255 255 / 8%);
  --l-pill-fg: #c3c2b7;
}
.dark .pss {
  --l-bg: #256abf;
  --l-bd: #3987e5;
  --l-fg: #fff;
  --l-sub: rgb(255 255 255 / 90%);
  --l-pill-bg: rgb(255 255 255 / 18%);
  --l-pill-fg: #fff;
}
.dark .uss {
  --l-bg: #3987e5;
  --l-bd: #5598e7;
  --l-fg: #fff;
  --l-sub: rgb(255 255 255 / 92%);
  --l-pill-bg: rgb(255 255 255 / 22%);
  --l-pill-fg: #fff;
}

.layer {
  padding: 14px 16px 16px;
  border: 1.5px solid var(--l-bd);
  border-radius: 12px;
  background: var(--l-bg);
  color: var(--l-fg);
}

.tag {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}
.tag b {
  font-size: 1rem;
  font-weight: 700;
}
.tag small {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--l-sub);
}

.note {
  padding: 2px 9px;
  border-radius: 999px;
  background: var(--l-pill-bg);
  color: var(--l-pill-fg);
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

.desc {
  margin: 6px 0 0;
  color: var(--l-sub);
  font-size: 0.85rem;
  line-height: 1.65;
}
.desc strong {
  color: var(--l-fg);
  font-weight: 600;
}

.scale {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  color: var(--fg-light, #888781);
  font-size: 0.75rem;
}
.scale .bar {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, #bcd6f5, #256abf);
}
.dark .scale .bar {
  background: linear-gradient(90deg, #2f4a63, #5598e7);
}

@media (width <= 640px) {
  .layer {
    padding: 12px 12px 14px;
  }
  .tag {
    flex-wrap: wrap;
    gap: 4px 8px;
  }
}
</style>
