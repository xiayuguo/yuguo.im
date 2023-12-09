<template>
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Yu Guo @ yuguo.im</title>
    <path class="path1" d="M51.3542 15C46.0208 18.6667 40.0434 26.5 42.5 38.5C44.6495 49 62.3958 47.5 68.3542 41C74.5 35.5 76.5 20.5 71.3542 16.5C65 13 60.0209 18.5 59.3542 21.5L50.1543 65C47.8111 75.1536 47.4348 84 36.1542 85.5C26.0873 86.8386 20.8736 76 33.1542 68C45.4348 60 64.6543 64 66.6543 66.5" stroke="black" stroke-width="2.5" stroke-linecap="round" />
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion) {
  .path1 {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@media print {
  .path1 {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@keyframes grow {
  0% {
    stroke-dashoffset: 1px;
    stroke-dasharray: 0 350px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  40% {
    stroke-dasharray: 350px 0;
  }
  85% {
    stroke-dasharray: 350px 0;
  }
  95%, to {
    stroke-dasharray: 0 350px;
  }
}
.path1 {
  stroke-dashoffset: 1px;
  stroke-dasharray: 350px 0;
  animation: grow 10s ease forwards infinite;
  transform-origin: center;
  stroke: #303030;
  animation-delay: 0s;
}
.dark .path1 {
  stroke: #fdfdfd;
}
</style>
