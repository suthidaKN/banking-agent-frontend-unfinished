import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'
import VueCookies from 'vue-cookies';

createApp(App).use(router).use(VueCookies).mount('#app')
