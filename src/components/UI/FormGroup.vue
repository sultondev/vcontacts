<template>
  <div class="">
    <h6 :class="headerClasses">{{ title }}</h6>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  headerClasses?: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  headerClasses: "mb-2",
  title: "Title",
});
</script>

<style></style>
