<script setup lang="ts">
</script>

<template>
  <div flex items-center gap-2 max-w-full min-w-20 h-20 p-2 resize-x border="1px solid" rounded overflow-hidden>
    <div w-10 h-10 rounded-full bg-green flex-shrink-0 />
    <p outline="1px dashed red-500">
      This is a long long long text
    </p>
  </div>
  <!-- <div grid="~ cols-2 gap2">
    <div flex h-20>
        <div h-full text-center leading-20 border="1px solid">1</div>
    </div>
    <div flex h-20 overflow-x-auto>
        <div h-20 flex-shrink-0 text-center leading-20 border="1px solid" v-for="i in 5" :key="i">{{ i }}</div>
    </div>
  </div> -->
</template>
