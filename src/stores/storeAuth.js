import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from '@/js/firebase'
import { useStoreNote } from '@/stores/storeNotes';

export const useStoreAuth = defineStore('storeAuth', {
    state: () => ({
        user: {}
    }),
    actions: {
        init() {
            const storeNotes = useStoreNote()

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/auth.user
                    // console.log('user logged in:', user)
                    this.user.id = user.uid
                    this.user.email = user.email
                    this.router.push('/')
                    storeNotes.init()
                    // ...
                } else {
                    // User is signed out
                    // ...
                    // console.log('user logged out:', user)
                    this.user = {}
                    this.router.replace('/auth')
                    storeNotes.clearNotes()
                }
            });
        },
        registerUser(credentials) {
            // console.log('register User with credentials:', credentials)
            // Sign up new users
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user
                    // console.log('user', user)
                    // ...
                })
                .catch((error) => {
                    // console.log('error', error.message)
                    // ..
                })
        },
        loginUser(credentials) {
            // console.log('user login', credentials)  
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log('user login', user)
                    // ...
                })
                .catch((error) => {
                    // console.log('error.message:',error.message)
                });
        },
        logoutUser() {
            signOut(auth).then(() => {
                // Sign-out successful.
                // console.log('User signed out')

            }).catch((error) => {
                // An error happened.
                //   console.log('error', error.message)
            });
        }

    }
})
