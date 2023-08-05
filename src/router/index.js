import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'

// for navigation guards to check if youser is login
import { useStoreAuth } from '@/stores/storeAuth';

 const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'notes',
            component: ViewNotes
        },
        {
            path: '/stats',
            name: 'stats',
            component: () => import('@/views/ViewStats.vue')
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('@/views/ViewAuth.vue')
        },
        {
            path: '/editNote/:id',
            name: 'editNote',
            component: () => import('@/views/ViewEditNote.vue')
        }

    ]
 });


 // navigation guards
router.beforeEach((to, from) => {
    const storeAuth = useStoreAuth()
    if (to.name !== 'auth' && !storeAuth.user.id) { 
        return { name: 'auth' }
    }
    if (to.name == 'auth' && storeAuth.user.id) {
        return false
    }
  })
  

 export default router