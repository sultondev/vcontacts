<template>
  <div class="">
    djwilajdlwa
    <button class="" @click="isModaOpen = true">Open modal</button>
    <teleport to="#modal">
      <TheModal :is-modal-open="isModaOpen" @closeModal="closeModal">
        <div class="">dawdwdw</div>
      </TheModal>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheModal from "@/components/TheModal.vue";
const isModaOpen = ref(false);
function closeModal() {
  isModaOpen.value = false;
}
</script>
