import { createApp } from 'vue'
import './index.css'
import store from './store'
import router from './router'
import App from './App.vue'
import 'vue-toast-notification/dist/theme-default.css'; 
import VueToast from 'vue-toast-notification';
import VueGoogleMaps from '@fawmi/vue-google-maps';


createApp(App)
    .use(store)   
    .use(VueToast)
    .use(VueGoogleMaps, {
        load: {
          key: 'AIzaSyAhy2KmWLLpUUIgo3caZ16VtGsd60VFOWA',
          libraries: 'places', 
        },
      })
    .use(router) 
    .mount('#app')

