import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Import Bootstrap JS (optional, only if you use components like modals)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import Vue3TouchEvents from "vue3-touch-events";

createApp(App)
    .use(router)
    .use(store)
    .use(Vue3TouchEvents)
    .mount('#app')
