<script>
import { defineComponent } from "vue";
import TheNavbar from "@/components/TheNavbar.vue";

export default defineComponent({
  components: { TheNavbar },
});
</script>

<template>
  <router-view />
</template>

<style>
body {
  background: #050134;
}
</style>
