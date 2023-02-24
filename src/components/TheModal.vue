<template>
  <Transition name="modal" mode="out-in">
    <div
      class="modal-wrapper fixed top-0 w-auto h-auto z-[1000]"
      v-if="isModalOpen"
    >
      <div
        class="modal__backdrop bg-[#00000080] w-full h-screen w-screen flex justify-center items-center"
        @click.self="emits('closeModal', windowNum || '')"
      >
        <div :class="containerClasses" class="modal__container">
          <slot>Default</slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  containerClasses?: boolean;
  windowNum?: number | string;
  isModalOpen: boolean;
}
interface Emits {
  (e: "closeModal", value?: number | string): void;
}

const props = withDefaults(defineProps<Props>(), {
  containerClasses: "bg-white rounded-xl",
});
const emits = defineEmits<Emits>();
</script>

<style>
.modal + div {
  max-height: 100vh;
  overflow-y: hidden;
}
.modal__backdrop {
  transition: opacity 0.3s ease;
}
.modal-enter-active {
  transition: opacity 0.4s ease-out;
}
.modal-leave-active {
  transition: opacity 0.4s ease-out;
}
.modal-enter-from .modal__container {
  transform: scale(0.6);
  opacity: 0;
}
.modal-leave-to .modal__container {
  transform: scale(1.2);
  opacity: 0;
}
.modal-enter-from .modal__backdrop,
.modal-leave-to .modal__backdrop {
  opacity: 0;
}
.modal-enter-to .modal__container,
.modal-leave-from .modal__container {
  transform: scale(1);
  opacity: 1;
}
.modal-enter-to .modal__backdrop,
.modal-leave-from .modal__backdrop {
  opacity: 1;
}
</style>
