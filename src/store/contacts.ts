import { ref, Ref } from "vue";
import { defineStore } from "pinia";

export const useContactsStore = defineStore("contactsStore", () => {
  const contacts: Ref<[]> = ref([]);
  return { contacts };
});
