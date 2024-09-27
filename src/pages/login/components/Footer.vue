<template>
  <footer class="bg-white border-t border-gray-200 py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm text-gray-500">
        © {{ currentYear }} Ooci Studios. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {ref} from "vue";

const currentYear = ref(new Date().getFullYear())
</script>
