<script setup lang="ts">
defineOptions({ name: 'GitMergeLegend' })

const items = [
  { tone: 'main', text: 'main 上的提交' },
  { tone: 'feat', text: 'feature 上的提交' },
  { tone: 'merge', text: 'merge commit（双父）' },
  { tone: 'squash', text: 'squash commit（单父）' },
]
</script>

<template>
  <div class="gm-legend">
    <span v-for="item in items" :key="item.tone">
      <i class="dot" :class="item.tone" />{{ item.text }}
    </span>
  </div>
</template>

<style scoped>
.gm-legend {
  --gm-main: #2f6fd0;
  --gm-feat: #b06c12;
  --gm-merge: #7c4dbd;
  --gm-squash: #1f8a63;

  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  margin: 1.25rem 0;
  color: var(--fg-light);
  font-size: 0.8rem;
}

:global(.dark) .gm-legend {
  --gm-main: #7aa9ee;
  --gm-feat: #e6a95a;
  --gm-merge: #b393e6;
  --gm-squash: #5fc79c;
}

.gm-legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.main {
  background: var(--gm-main);
}
.feat {
  background: var(--gm-feat);
}
.merge {
  background: var(--gm-merge);
}
.squash {
  background: var(--gm-squash);
}
</style>
