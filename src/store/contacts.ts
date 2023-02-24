import { ref } from "vue";
import { defineStore } from "pinia";

export const useContactsStore = defineStore("contactsStore", () => {
  const contacts = ref([]);

  return { contacts };
});
