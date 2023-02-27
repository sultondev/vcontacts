<template>
  <label
    class="group block flex items-center cursor-text w-full"
    :class="[wrapperClass, { 'border-2 border-rose-500': error }]"
    :for="uniqueId"
  >
    <span
      :class="['text-inherit', prefixClasses]"
      v-if="prefix || prefixClasses"
    >
      <slot name="prefix">
        {{ prefix }}
      </slot>
    </span>
    <input
      :class="['outline-none w-full bg-inherit', inputClasses]"
      v-model="textValue"
      :id="uniqueId"
      v-maska
      :maxlength="max"
      :minlength="min"
      :data-maska="maskaOptions"
      autocomplete="off"
      :name="fieldKey"
      :placeholder="placeholder"
      :type="hide"
    />
    <button
      type="button"
      aria-label="togglePassword"
      @click="toggleHide"
      v-if="type === 'password'"
      class="px-1 bg-white ml-1 text-black rounded-sm text-black min-w-[50px] w-fit"
    >
      {{ type === "password" && hide === "password" ? "show" : "hide" }}
    </button>
    <span
      :class="['text-inherit', suffixClasses]"
      v-if="suffix || suffixClasses"
    >
      <slot name="suffix">
        {{ suffix }}
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { vMaska } from "maska";

interface Props {
  prefix?: string;
  prefixClasses?: string;
  suffix?: string;
  suffixClasses?: string;
  inputClasses?: string;
  text?: string;
  error?: boolean;
  maskaOptions?: string;
  fieldKey: string;
  max?: string;
  min?: string;
  wrapperClass?: string;
  placeholder?: string;
  type?: string;
}
interface Emits {
  (e: "inputChange", value: string, key: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  maskaOptions: "",
  wrapperClass: "bg-primary border border-gray",
  type: "text",
});
const textValue = ref("");
const emits = defineEmits<Emits>();
const hide = ref(props.type);
// const textValue = ref("");
watch(textValue, () => {
  emits("inputChange", textValue.value, props.fieldKey);
});
const uniqueId = ref(crypto.randomUUID());

function toggleHide() {
  if (hide.value === props.type) {
    hide.value = "text";
  } else {
    hide.value = "password";
  }
}
</script>

<style></style>
