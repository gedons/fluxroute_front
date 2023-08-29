import { createApp } from 'vue'
import './index.css'
import store from './store'
import router from './router'
import App from './App.vue'
import 'vue-toast-notification/dist/theme-default.css'; 
import VueToast from 'vue-toast-notification';

createApp(App)
    .use(store)   
    .use(VueToast)
    .use(router) 
    .mount('#app')

