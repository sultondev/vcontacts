import { ref, Ref } from "vue";
import { defineStore } from "pinia";
import { Contact } from "@/typing/types/contacts";
import { authProtectedApi } from "@/config/axios.config";

export const useContactsStore = defineStore("contactsStore", () => {
  const contacts: Ref<Contact[] | [] | any> = ref([]);
  function initialize() {
    authProtectedApi.get("/contacts").then((response: any) => {
      if (response.data.length > 0) {
        contacts.value = response.data;
      }
    });
    // contacts.value = localContacts;
  }
  function updateContacts() {
    initialize();
  }

  //@ts-ignore
  function addContact(data: Contact) {
    contacts.value.push(data);
  }
  return { contacts, initialize, updateContacts, addContact };
});
