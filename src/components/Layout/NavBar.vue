<template>
<nav class="navbar is-primary" aria-label="main navigation" role="navigation">
    <div class="container is-max-desktop ">
        <div class="navbar-brand">
            <div class="navbar-item is-size-4 is-family-monospace">My Notes</div>
            
            <a
              :class="{'is-active': showMobileNav }"
              @click.prevent="showMobileNav = !showMobileNav"
              class="navbar-burger"
              aria-expanded="false"
              aria-label="menu"
              data-target="navbarBasicExample"
              ref="navbarBurgerRef"
              role="button">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
        </a>
        </div>
       <div
          :class="{'is-active': showMobileNav }"
          id="navbarBasicExample"
          class="navbar-menu"
          ref="navbarMenuRef">
          <div class="navbar-start"> 
            <button
            @click="logout"
            v-if="storeAuth.user.id"
            class="button is-small is-danger is-light mt-3 ml-2">Log out {{ storeAuth.user.email }}</button></div>
            <div class="navbar-end">
              <RouterLink
                  @click="showMobileNav = false"
                  class="navbar-item"
                  active-class="is-active"
                  to="/">Notes</RouterLink>
                <RouterLink
                  @click="showMobileNav = false"
                  class="navbar-item"
                  active-class="is-active"
                  to="/stats">Stats</RouterLink>
            </div>
        </div>
    </div>
</nav>
</template>

<script setup>
/* Imports */
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth';

/*storer for logout*/
const storeAuth = useStoreAuth()

/* Mobile nav */
const showMobileNav = ref(false)

/* vueUse click outside to close  */
const navbarMenuRef = ref(null)
const navbarBurgerRef = ref(null)


onClickOutside(navbarMenuRef, (event) => {
    showMobileNav.value = false
}, {
    ignore: [navbarBurgerRef]
})

/* logout*/
const logout = () => {
    showMobileNav.value = false
    storeAuth.logoutUser()
}
</script>

<style>
@media (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>

