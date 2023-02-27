<template>
  <form @submit.prevent="createContact" class="flex flex-col gap-4">
    <FormGroup title="Name" class="text-white">
      <Input
        @input-change="handleInputChange"
        :error="v$.name.$error"
        class="py-1 px-2 rounded-md border-2 text-white"
        max="30"
        min="3"
        field-key="name"
      />
    </FormGroup>
    <FormGroup title="Phone" class="text-white">
      <Input
        @input-change="handleInputChange"
        :error="v$.phone.$error"
        prefix-classes="mr-1"
        class="py-1 px-2 rounded-md border-2 text-white"
        prefix="+998"
        maskaOptions="## ###-##-##"
        field-key="phone"
      />
    </FormGroup>
    <FormGroup title="Email" class="text-white">
      <Input
        @input-change="handleInputChange"
        :error="v$.email.$error"
        prefix-classes="mr-1"
        class="py-1 px-2 rounded-md border-2 text-white"
        field-key="email"
        placeholder="enter username or email"
      />
    </FormGroup>

    <Button
      type="submit"
      :loading="false"
      aria-label="Submit"
      spinner-color="#cdcdcd"
      class="bg-[#2A0096] text-white py-2 rounded-xl text-center disabled:opacity-50"
      :disabled="v$.phone.$error || v$.name.$error"
    >
      Create
    </Button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Input from "@/components/UI/Input.vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { useContactsStore } from "@/store/contacts";
import FormGroup from "@/components/UI/FormGroup.vue";
import Button from "@/components/UI/Button.vue";

interface Emits {
  (e: "closeModal"): void;
}
const emits = defineEmits<Emits>();
const contactData = reactive({
  id: 0,
  name: "",
  phone: "",
  email: "",
});

const contactStore = useContactsStore();

const rules = {
  name: {
    required,
    minLength: minLength(2),
  },
  phone: {
    required,
  },
  email: {
    required,
  },
};

const v$ = useVuelidate(rules, contactData);

async function createContact() {
  const result = await v$.value.$validate();
  if (result) {
    contactStore.addContact({ ...contactData, id: crypto.randomUUID() });
    localStorage.setItem("contacts", JSON.stringify(contactStore.contacts));
    clearInputs();
    emits("closeModal");
  }
  // v$.$reset();
}
function handleInputChange(value: string, key: string) {
  contactData[key] = value;
}
function clearInputs() {
  contactData.id = 0;
  contactData.name = "";
  contactData.phone = "";
}
</script>

<style></style>
