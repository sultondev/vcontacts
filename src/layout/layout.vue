<template>
  <div class="flex">
    <div
      class="bg-[#1F0354] h-screen sticky top-0 flex flex-col items-center py-8"
    >
      <div class="">
        <img
          src="@/assets/images/test-user-icon.png"
          alt=""
          class="w-[100px]"
        />
      </div>
      <TheNavbar />
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
</script>
