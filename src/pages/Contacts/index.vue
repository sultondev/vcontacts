<template>
  <div class="w-full relative text-white">
    <button
      @click="isModaOpen = true"
      class="absolute right-0 bg-[#2A0096] hover:bg-[#6909B8] m-2 p-3 rounded-full"
    >
      <img src="@/assets/images/add-user-icon.svg" alt="" class="w-[16px]" />
    </button>

    <div class="w-[80%] mx-auto pt-2">
      <h5 class="text-3xl text-white text-center">Contacts</h5>
      <ul
        class="flex flex-col gap-2 mt-12"
        v-if="contactStore.contacts.length > 0"
      >
        <li
          v-for="item in contactStore.contacts"
          class="px-6 py-5 transition-all duration-300 cursor-pointer bg-[#DBE3FF1A] hover:bg-[#4200D8b9] rounded-lg text-white"
        >
          <div class="flex flex-col">
            <span class="text-sm font-medium leading-md">
              {{ item.name }}
            </span>
            <span class="text-[#DBE3FFA2] text-xs font-normal">
              +998 {{ item.phone }}
            </span>
          </div>
        </li>
      </ul>
      <div class="" v-else-if="contactStore.status.loading">Loading...</div>
      <div
        class="mx-auto flex flex-col items-center justify-center my-20"
        v-else
      >
        <img src="@/assets/images/no-data.svg" alt="" class="w-[260px]" />
        <h6 class="text-white text-4xl">No data</h6>
      </div>
    </div>
    <teleport to="#modal">
      <TheModal
        :is-modal-open="isModaOpen"
        @closeModal="closeModal"
        container-classes="bg-[#4200D8] px-4 py-8 rounded-md"
      >
        <CreateContact @closeModal="closeModal" />
      </TheModal>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TheModal from "@/components/TheModal.vue";
import CreateContact from "@/components/ModalForms/CreateContact.vue";
import { useContactsStore } from "@/store/useContacts";
const isModaOpen = ref(false);

function closeModal() {
  isModaOpen.value = false;
}
const contactStore = useContactsStore();
contactStore.initialize();
</script>
