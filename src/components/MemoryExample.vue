<script setup lang="ts">
defineOptions({ name: 'MemoryExample' })

const composition = [
  { swatch: 'priv', label: '私有物理内存：', value: '20 MB', hint: '（只属于 A）' },
  { swatch: 'shared', label: '共享库物理内存：', value: '12 MB', hint: '（A、B、C 三家共用）' },
  { swatch: 'rest', label: '已申请未映射 / 已 Swap 的虚拟空间' },
]

const formulas = [
  { expr: 'USS = 20', note: '私有部分' },
  { expr: 'PSS = 20 + 12 ÷ 3 = 24', note: '平摊共享' },
  { expr: 'RSS = 20 + 12 = 32', note: '完整计共享' },
  { expr: 'VSS = 32 + 虚拟空间 > 32', note: '' },
]

const numbers = [
  { metric: 'USS', value: '20', unit: 'MB', foot: '独占' },
  { metric: 'PSS', value: '24', unit: 'MB', foot: '平摊 12÷3' },
  { metric: 'RSS', value: '32', unit: 'MB', foot: '全量共享' },
  { metric: 'VSS', value: '>32', unit: 'MB', foot: '含虚拟' },
]
</script>

<template>
  <div my-6>
    <div grid="~ cols-1 gap-3.5 sm:cols-2">
      <section class="box">
        <h4>进程 A 的内存构成</h4>
        <div v-for="item in composition" :key="item.label" class="row legend">
          <span class="swatch" :class="item.swatch" />
          <span class="text">
            {{ item.label }}<b v-if="item.value">{{ item.value }}</b>{{ item.hint }}
          </span>
        </div>
      </section>

      <section class="box">
        <h4>关键算式</h4>
        <div v-for="item in formulas" :key="item.expr" class="row">
          <code>{{ item.expr }}</code>
          <span v-if="item.note" class="note">{{ item.note }}</span>
        </div>
      </section>
    </div>

    <div grid="~ cols-2 gap-3 sm:cols-4" mt-3.5>
      <div v-for="item in numbers" :key="item.metric" class="num">
        <div class="m">
          {{ item.metric }}
        </div>
        <div class="v">
          {{ item.value }}<small>{{ item.unit }}</small>
        </div>
        <div class="f">
          {{ item.foot }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  padding: 12px 14px;
  border: 1px dashed #8884;
  border-radius: 10px;
}
.box h4 {
  margin: 0 0 8px;
  color: var(--fg-deep);
  font-size: 0.9rem;
  font-weight: 600;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  margin: 6px 0;
  color: var(--fg);
  font-size: 0.82rem;
  line-height: 1.5;
}
.row b {
  color: var(--fg-deep);
  font-weight: 600;
}
.row code {
  white-space: nowrap;
}
.row .note {
  color: var(--fg-light);
}

/* 色块与文字首行对齐，文字过长时在自身内部换行，不整体掉到下一行 */
.legend {
  flex-wrap: nowrap;
  align-items: flex-start;
}
.legend .text {
  flex: 1;
  min-width: 0;
}
.legend .swatch {
  margin-top: 4px;
}

.swatch {
  flex: none;
  width: 14px;
  height: 14px;
  border-radius: 4px;
}
.priv {
  background: #256abf;
}
.shared {
  background: #eda100;
}
.rest {
  background: #e1e0d9;
}
.dark .priv {
  background: #3987e5;
}
.dark .rest {
  background: #2c2c2a;
}

.num {
  padding: 10px 12px;
  border: 1px solid #8884;
  border-radius: 10px;
  text-align: center;
}
.num .m {
  color: var(--fg-light);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.4px;
}
.num .v {
  margin: 2px 0;
  color: var(--fg-deep);
  font-size: 1.35rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.num .v small {
  margin-left: 2px;
  font-size: 0.6em;
  font-weight: 600;
}
.num .f {
  color: var(--fg);
  font-size: 0.72rem;
}
</style>
