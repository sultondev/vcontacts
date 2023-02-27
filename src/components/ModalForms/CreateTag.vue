<template>
  <form @submit.prevent="createContact" class="flex flex-col gap-4">
    <FormGroup title="Title" class="text-white">
      <Input
        @input-change="handleInputChange"
        :error="formData.$v?.value.title.$error"
        class="py-1 px-2 rounded-md border-2 text-white"
        max="30"
        min="3"
        field-key="title"
        placeholder="Enter title"
      />
    </FormGroup>

    <Button
      type="submit"
      :loading="false"
      aria-label="Submit"
      spinner-color="#cdcdcd"
      class="bg-[#2A0096] text-white py-2 rounded-xl text-center disabled:opacity-50"
      :disabled="formData.$v?.value.title.$error"
    >
      Create
    </Button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Input from "@/components/UI/Input.vue";
import { minLength, required, email } from "@vuelidate/validators";
import { useContactsStore } from "@/store/useContacts";
import FormGroup from "@/components/UI/FormGroup.vue";
import Button from "@/components/UI/Button.vue";
import { authProtectedApi } from "@/config/axios.config";
import { useForm } from "@/composables/useForm";
import { useUserStore } from "@/store/userStore";
import { useTagsStore } from "@/store/useTags";

interface Emits {
  (e: "closeModal"): void;
}

const formStatus = reactive({
  loading: false,
  error: false,
});
const emits = defineEmits<Emits>();

const tagsStore = useTagsStore();
const userStore = useUserStore();

const formData: any = useForm(
  {
    title: "",
  },
  {
    title: {
      required,
    },
  }
);

async function createContact() {
  formData.$v.value.$touch();
  if (!formData.$v.value.$invalid) {
    authProtectedApi
      .post("/tags", {
        ...formData.values,
        user: userStore.user,
      })
      .then((response: any) => {
        tagsStore.initialize();
      });
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
