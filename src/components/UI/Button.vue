<template>
  <button :disabled="loading">
    <slot v-if="!loading">
      {{ text }}
    </slot>
    <i
      v-else
      :class="[
        's-transition block mx-auto w-fit absolute-center-h absolute-center-v',
        loading ? 'opacity-100 visible' : 'opacity-0 invisible w-[0px] h-[0px]',
      ]"
    >
      <svg
        class="loading-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.2"
          d="M11.9999 3.14746C16.8856 3.14746 20.8524 7.11425 20.8524 11.9999C20.8524 16.8856 16.8856 20.8524 11.9999 20.8524C7.11425 20.8524 3.14746 16.8856 3.14746 11.9999C3.14746 7.11425 7.11425 3.14746 11.9999 3.14746Z"
          :stroke="!spinnerColor ? '#17171C' : spinnerColor"
          stroke-width="3"
        />
        <path
          d="M11.2458 20.8191C9.38896 20.6622 7.56653 19.9205 6.07624 18.5787C3.60297 16.3517 2.67826 13.0422 3.37337 10.0106"
          :stroke="!spinnerColor ? '#17171C' : spinnerColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </i>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  loading: boolean;
  spinnerColor: string;
}

const props = defineProps<Props>();
</script>

<style>
.loading-icon {
  animation: animate-stroke 1s linear infinite;
}

@keyframes animate-stroke {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
