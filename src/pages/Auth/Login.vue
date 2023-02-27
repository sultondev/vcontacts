<template>
  <section class="reg">
    <div
      class="container flex mx-auto lg:flex-row sm:flex-col min-h-screen sm:justify-center lg:justify-auto items-center"
    >
      <div class="">
        <h6 class="text-3xl text-[#0080D0] uppercase text-center font-bold">
          V Contacts
        </h6>
        <p class="text-white text-center text-2xl m-4">Login</p>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <FormGroup title="Username" class="text-white">
            <Input
              prefix-classes="mr-1"
              class="py-1 px-2 rounded-md border-2 text-white bg-transparent"
              field-key="identifier"
              placeholder="Enter username or email"
              @input-change="handleInputChange"
              :error="
                formData.$v?.value?.identifier?.$error || formStatus.error
              "
              max="20"
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
              :error="formData.$v?.value?.password?.$error || formStatus.error"
            />
          </FormGroup>
          <Button
            type="submit"
            aria-label="Submit"
            spinner-color="#cdcdcd"
            class="bg-[#2A0096] text-white py-2 rounded-xl text-center disabled:opacity-50"
            :loading="formStatus.loading"
          >
            Login
          </Button>
        </form>
        <router-link
          to="/registration"
          class="block mt-4 text-gray-500 text-center text-xs"
        >
          I don't have account
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { publicApi } from "@/config/axios.config";
import { required } from "@vuelidate/validators";
import FormGroup from "@/components/UI/FormGroup.vue";
import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";
import { RegisterResponse } from "@/typing/types/fetchResponses";
import { useForm } from "@/composables/useForm";

const formData: any = useForm(
  {
    identifier: "",
    password: "",
  },
  {
    identifier: {
      required,
    },
    password: {
      required,
    },
  }
);
const formStatus = reactive({
  loading: false,
  error: false,
});

async function handleSubmit() {
  formData.$v.value.$touch();
  if (!formData.$v.value.$invalid) {
    formStatus.loading = true;
    await publicApi
      .post("/auth/local", JSON.stringify(formData.values))
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
