<template>
  <section class="reg">
    <div
      class="container flex mx-auto lg:flex-row sm:flex-col min-h-screen sm:justify-center lg:justify-auto items-center"
    >
      <div class="w-1/2">
        <div
          class="lg:text-8xl sm:text-4xl text-center font-bold text-[#0080D0] uppercase"
        >
          v contacts
        </div>
        <div class="text-white text-center block lg:hidden my-4">
          Registration
        </div>
      </div>
      <div class="w-1/2 flex justify-center">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <FormGroup title="Username" class="text-white">
            <Input
              prefix-classes="mr-1"
              class="py-1 px-2 rounded-md border-2 text-white bg-transparent"
              field-key="username"
              placeholder="Enter username"
              @input-change="handleInputChange"
              :error="formData.$v?.value.username.$error || formStatus.error"
              max="20"
            />
          </FormGroup>
          <FormGroup title="Email" class="text-white">
            <Input
              prefix-classes="mr-1"
              class="py-1 px-2 rounded-md border-2 text-white bg-transparent"
              field-key="email"
              placeholder="Enter email"
              @input-change="handleInputChange"
              :error="formData.$v?.value.email.$error || formStatus.error"
              max="30"
            />
          </FormGroup>
          <FormGroup title="Password" class="text-white">
            <Input
              prefix-classes="mr-1"
              class="py-1 px-2 rounded-md border-2 text-white bg-transparent"
              field-key="password"
              placeholder="Enter password"
              type="password"
              @input-change="handleInputChange"
              max="30"
              :error="formData.$v?.value.password.$error || formStatus.error"
            />
          </FormGroup>
          <Button
            type="submit"
            aria-label="Submit"
            spinner-color="#cdcdcd"
            class="bg-[#2A0096] text-white py-2 rounded-xl text-center disabled:opacity-50"
            :loading="formStatus.loading"
          >
            Create an account
          </Button>
          <router-link to="/login" class="text-xs text-gray-500 text-center"
            >I have an account</router-link
          >
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { publicApi } from "@/config/axios.config";
import { required, email } from "@vuelidate/validators";
import FormGroup from "@/components/UI/FormGroup.vue";
import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";
import { RegisterResponse } from "@/typing/types/fetchResponses";
import { useForm } from "@/composables/useForm";

const formStatus = reactive({
  loading: false,
  error: false,
});
const formData: any = useForm(
  {
    username: "",
    email: "",
    password: "",
    confirm: true,
  },
  {
    username: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  }
);
async function handleSubmit() {
  formData.$v.value.$touch();
  if (!formData.$v.value.$invalid) {
    formStatus.loading = true;
    await publicApi
      .post("/auth/local/register", JSON.stringify(formData.values))
      .then((response: RegisterResponse) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.jwt);
          location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        formStatus.error = true;
      })
      .finally(() => {
        formStatus.loading = false;
      });
  }
}

function handleInputChange(value: string, key: string) {
  formData.values[key] = value;
}
</script>
