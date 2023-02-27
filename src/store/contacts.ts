import { ref, Ref } from "vue";
import { defineStore } from "pinia";
import { Contact } from "@/typing/types/contacts";

export const useContactsStore = defineStore("contactsStore", () => {
  const contacts: Ref<Contact[] | [] | any> = ref([]);
  function initialize() {
    const localContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    if (localContacts) {
      contacts.value = localContacts;
    }
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
