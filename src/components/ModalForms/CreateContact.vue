<template>
  <form @submit.prevent="createContact" class="flex flex-col gap-4">
    <FormGroup title="Name" class="text-white">
      <Input
        @input-change="handleInputChange"
        :error="formData.$v?.value.name.$error"
        class="py-1 px-2 rounded-md border-2 text-white"
        max="30"
        min="3"
        field-key="name"
      />
    </FormGroup>
    <FormGroup title="Phone" class="text-white">
      <Input
        @input-change="handleInputChange"
        :error="formData.$v?.value.phone.$error"
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
        :error="formData.$v?.value.email.$error"
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
      :disabled="
        formData.$v?.value.phone.$error || formData.$v.value.name.$error
      "
    >
      Create
    </Button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Input from "@/components/UI/Input.vue";
import { minLength, required } from "@vuelidate/validators";
import { useContactsStore } from "@/store/contacts";
import FormGroup from "@/components/UI/FormGroup.vue";
import Button from "@/components/UI/Button.vue";
import { authProtectedApi } from "@/config/axios.config";
import { useForm } from "@/composables/useForm";
import { phoneMaskClean } from "@/helpers";
import { ContactDataType } from "@/typing/types/contacts";

interface Emits {
  (e: "closeModal"): void;
}

const formStatus = reactive({
  loading: false,
  error: false,
});
const emits = defineEmits<Emits>();

const contactStore = useContactsStore();

const formData: any = useForm(
  {
    name: "",
    phone: "",
    email: "",
  },
  {
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
  }
);

async function createContact() {
  formData.$v.value.$touch();
  if (!formData.$v.value.$invalid) {
    authProtectedApi
      .post("/contacts", {
        ...formData.values,
        phone: phoneMaskClean(formData.values.phone),
      })
      .then((response: any) => {
        contactStore.initialize();
        console.log(response);
      });
    clearInputs();
    emits("closeModal");
  }
  // v$.$reset();
}
function handleInputChange(value: string, key: string) {
  formData.values[key] = value;
}
function clearInputs() {
  formData.values.name = "";
  formData.values.phone = "";
}
</script>

<style></style>
