import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import { createPinia } from 'pinia';
import './assets/fonts/fonts.css'

const app = createApp(App);
app.use(createPinia())
app.use(router).mount('#app')
