<script setup lang="ts">
import { useContactsStore } from "./store/contacts";

const contactsStore = useContactsStore();
</script>

<template>
  <router-view />
</template>

<style scoped></style>
