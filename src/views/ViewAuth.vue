<template>
<div class="auth">
    <div class="tabs is-centered">
        <ul>
            <li :class="{'is-active' : !register }">
                <a @click.prevent="register=false">Login</a>
            </li>
            <li :class="{'is-active' : register }">
                <a @click.prevent="register=true">Register</a>
            </li>
        </ul>
    </div>
    <div class="card auth-form">
        <div class="card-content">
            <div class="title has-text-centered">
                {{formTitle}}
            </div>
            <form @submit.prevent="onSubmit">
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input v-model="credentials.email" class="input" placeholder="e.g. alexsmith@gmail.com" type="email">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input v-model="credentials.password" class="input" placeholder="Enter a password" type="password">
                    </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                    <p class="control">
                        <button class="button is-primary">{{formTitle}}</button>
                    </p>
                </div>
            </form>

        </div>
    </div>
</div>
</template>

<script setup>
/* import */
import { ref, reactive, computed } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth';

/* Store */

const storeAuth = useStoreAuth()

/* register */
const register = ref(false)
/* form title */
const formTitle = computed(() => {
    return register.value ? 'Register' : ' Login'
})
/* submit */
const onSubmit = () => {
    // console.log('Form submited')
    if (!credentials.email || !credentials.password) {
        alert(' Please enter Emain and password')
    } else {
        if (register.value) {
            // console.log('Register user with these credentials', credentials)
            storeAuth.registerUser(credentials)
        } else {
            // console.log('Login user with these credentials', credentials)
            storeAuth.loginUser(credentials)
        }
    }
}
/* credentials */
const credentials = reactive({
    email: '',
    password: ''
})
</script>

<style scoped>
.auth-form {
    max-width: 500px;
    margin: 0 auto;
}
</style>