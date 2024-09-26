<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header />
    <Login />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Login from "@/pages/login/components/Login.vue";
import Footer from "@/pages/login/components/Footer.vue";
import Header from "@/pages/login/components/Header.vue";
</script>
