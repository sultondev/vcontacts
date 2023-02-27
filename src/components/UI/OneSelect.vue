<template>
  <div class="relative" ref="select">
    <!--  SELECTED OPTION  -->
    <div
      class="bg-white rounded px-3 py-2 cursor-pointer flex items-center justify-between"
      :class="selectedOptionStyles"
      @click="toggleSelect(!showOptions)"
    >
      <slot name="selectedOption" :value="value">
        <div v-if="!value">Select</div>
        <div v-else>{{ value[labelKey] || value }}</div>
        <slot name="chevron">
          <span
            class="transition-all duration-200 inline-block"
            :class="{ 'rotate-180': showOptions }"
          >
            ^
          </span>
        </slot>
      </slot>
    </div>

    <!--  OPTIONS  -->
    <Transition name="select">
      <div
        v-if="showOptions"
        class="absolute top-full w-full bg-white rounded z-10 translate-y-3 overflow-hidden"
      >
        <slot name="options">
          <div
            v-for="(option, idx) in options"
            :key="idx"
            :class="{ 'bg-blue-300': isActive(option) }"
            class="transition-all duration-200 px-3 py-2 hover:bg-gray-300 cursor-pointer"
            @click="onSelect(option)"
          >
            <slot name="option" :option="option" :index="idx">
              <div>{{ option[labelKey] }}</div>
            </slot>
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

type TOption =
  | string
  | number
  | { [key: string]: string | number }
  | { id: number | string; name: string };

interface Props {
  modelValue: TOption;
  options: TOption[] | any;
  labelKey: string;
  valueKey: string;
  selectedOptionStyles?: string;
}
const props = withDefaults(defineProps<Props>(), {
  labelKey: "name",
  valueKey: "id",
});

const emit = defineEmits<{
  (e: "on-toggle", value: boolean): void;
  (e: "update:modelValue", value: boolean | string | number): void;
}>();

const showOptions = ref(false);

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue;
  emit("on-toggle", showOptions.value);
}

function findOption(option: TOption) {
  return props.options.find(
    (o: any) => o === option || o[props.valueKey] === option
  );
}

const value: any = ref(findOption(props.modelValue));
function onSelect(option: any) {
  value.value = option;
  toggleSelect(false);
  emit("update:modelValue", option[props.valueKey] || option);
}

const select = ref();
onClickOutside(select, () => toggleSelect(false));

function isActive(option: any) {
  return (
    option === value.value ||
    value.value?.id === option?.id ||
    option?.id === value.value
  );
}
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
