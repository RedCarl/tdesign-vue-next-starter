<template>
  <header class="p-4 bg-white shadow-sm">
    <div class="flex items-center space-x-2">
      <component :is="LogoFull" style="width: 96px"/>
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoFull from '@/assets/assets-logo-full.svg?component';
</script>
