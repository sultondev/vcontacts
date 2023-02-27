import { ref, Ref, reactive } from "vue";
import { defineStore } from "pinia";
import { Contact } from "@/typing/types/contacts";
import { authProtectedApi } from "@/config/axios.config";

export const useContactsStore = defineStore("contactsStore", () => {
  const contacts: Ref<Contact[] | [] | any> = ref([]);
  const status = reactive({
    loading: false,
    error: false,
  });
  function initialize() {
    status.loading = true;
    authProtectedApi
      .get("/contacts")
      .then((response: any) => {
        if (response.data.length > 0) {
          contacts.value = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
        status.error = true;
      })
      .finally(() => {
        status.loading = false;
      });
  }
  function updateContacts() {
    initialize();
  }

  //@ts-ignore
  function addContact(data: Contact) {
    contacts.value.push(data);
  }
  return { contacts, initialize, updateContacts, addContact, status };
});
