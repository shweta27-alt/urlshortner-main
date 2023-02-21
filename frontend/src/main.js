import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { create } from './router';

const router = create();

createApp(App).use(store).use(router).mount('#app')