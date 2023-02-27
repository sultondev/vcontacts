<template>
  <nav class="nav">
    <ul class="nav-list flex flex-col text-white px-4 py-6 w-full">
      <li class="nav-list__item">
        <router-link class="nav-list__link" to="/dashboard">
          Dashboard
        </router-link>
      </li>
      <li class="nav-list__item">
        <router-link class="nav-list__link" to="/contacts">
          Contacts
        </router-link>
      </li>
      <li class="nav-list__item">
        <router-link class="nav-list__link" to="/tags"> Tags </router-link>
      </li>
    </ul>
  </nav>
</template>

<style>
.nav-list__item {
  @apply py-4 px-6;
}

.nav-list__link {
  @apply transition-all whitespace-nowrap duration-200 p-2 w-full bg-[#2A0096] hover:bg-[#6909B8] block rounded-lg;
}
</style>
