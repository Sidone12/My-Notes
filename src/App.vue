

<template>
  <NavBar />
  <div class="container is-max-desktop p-4">
    <h3>Visit demo: <a target="_blank" href="https://mynotes-96f13.web.app/#/">My notes</a></h3>
    <p class="pb-2">Use already created user: test@gmail.com password: test123 or register your own</p>
    <RouterView />
  </div>
</template>


<script setup>
/* Imports */
import { onMounted } from 'vue';
import NavBar from '@/components/Layout/NavBar.vue';
import { useStoreAuth } from '@/stores/storeAuth';

/* Store */
const storeAuth = useStoreAuth()

/* mounted  */
onMounted(() => {
  storeAuth.init()
})
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
