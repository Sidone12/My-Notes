import './assets/main.css'

import { createApp, markRaw  } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import App from './App.vue'


// для того щоб працював роутінг з pinia : При додаванні зовнішніх властивостей, екземплярів класів, які надходять з інших бібліотек, або просто речей, які не реактивні, ви повинні обернути об’єкт за допомогою markRaw() перед тим, як передати його в pinia.
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
  })

createApp(App).use(router).use(pinia).mount('#app')
