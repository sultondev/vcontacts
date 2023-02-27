<template>
  <div class="w-full container mx-auto my-6 text-white relative">
    <button
      @click="openModal"
      class="absolute right-0 bg-[#2A0096] hover:bg-[#6909B8] m-2 p-2 text-sm rounded-full"
    >
      #+
    </button>
    <div>
      <h6 class="text-center text-2xl">Tags</h6>
      <ul
        class="grid grid-cols-2 gap-2 mx-6 mt-12"
        v-if="tagsStore.tags.length > 0"
      >
        <li
          v-for="item in tagsStore.tags"
          class="px-6 py-5 transition-all duration-300 cursor-pointer bg-[#DBE3FF1A] hover:bg-[#4200D8b9] rounded-lg text-white"
        >
          <div class="flex flex-col">
            <span class="text-sm font-medium leading-md">
              {{ item.title }}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <teleport to="#modal">
      <TheModal
        :is-modal-open="isModaOpen"
        @closeModal="closeModal"
        container-classes="bg-[#4200D8] px-4 py-8 rounded-md"
      >
        <CreateTag @closeModal="closeModal" />
      </TheModal>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { useTagsStore } from "@/store/useTags";
import { ref } from "vue";
import TheModal from "@/components/TheModal.vue";
import CreateTag from "@/components/ModalForms/CreateTag.vue";
const isModaOpen = ref(false);

function closeModal() {
  isModaOpen.value = false;
}

function openModal() {
  isModaOpen.value = true;
}
const tagsStore = useTagsStore();
</script>
