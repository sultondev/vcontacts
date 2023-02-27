<template>
  <main
    class="main min-h-screen flex items-center justify-center container mx-auto flex-col gap-10"
  >
    <div class="banner">
      <img src="@/assets/images/welcome.svg" class="h-[160px] w-full" alt="" />
      <h1 class="text-8xl font-bold text-center text-white">V CONTACTS</h1>
    </div>
    <div class="flex gap-6" v-if="!userStore.user">
      <router-link
        class="text-white bg-[#0080D0] px-2 py-1 rounded-lg"
        to="/registration"
      >
        Become a client
      </router-link>
      <router-link
        class="text-white bg-[#0080D0] px-2 py-1 rounded-lg"
        to="/login"
      >
        Login
      </router-link>
    </div>
    <div class="" v-else>
      <router-link
        class="text-white bg-[#0080D0] px-2 py-1 rounded-lg"
        to="/dashboard"
      >
        Dashboard
      </router-link>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();
userStore.checkAuth();
</script>

<style></style>
