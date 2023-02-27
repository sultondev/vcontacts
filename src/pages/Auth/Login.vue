<template>
  <section class="reg">
    <div
      class="container flex mx-auto lg:flex-row sm:flex-col min-h-screen sm:justify-center lg:justify-auto items-center"
    >
      <div class="">
        <h6 class="text-3xl text-[#0080D0] uppercase text-center font-bold">
          V Contacts
        </h6>
        <p class="text-white text-center mb-4">Login</p>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <FormGroup title="Username" class="text-white">
            <Input
              prefix-classes="mr-1"
              class="py-1 px-2 rounded-md border-2 text-white bg-transparent"
              field-key="identifier"
              placeholder="Enter username or email"
              @input-change="handleInputChange"
              :error="v$.identifier.$error"
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
              :error="v$.password.$error"
            />
          </FormGroup>
          <Button
            type="submit"
            aria-label="Submit"
            spinner-color="#cdcdcd"
            class="bg-[#2A0096] text-white py-2 rounded-xl text-center disabled:opacity-50"
            :loading="loading"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { publicApi } from "@/config/axios.config";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import FormGroup from "@/components/UI/FormGroup.vue";
import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";
import { RegisterResponse } from "@/typing/types/fetchResponses";
const formData: any = reactive({
  identifier: "",
  password: "",
});

const loading = ref(false);

const rules = {
  identifier: {
    required,
  },
  password: {
    required,
  },
};

const v$ = useVuelidate(rules, formData);
async function handleSubmit() {
  const result = await v$.value.$validate();
  if (result) {
    loading.value = true;
    await publicApi
      .post("/auth/local", JSON.stringify(formData))
      .then((response: RegisterResponse) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.jwt);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
}

function handleInputChange(value: string, key: string) {
  formData[key] = value;
}
</script>
