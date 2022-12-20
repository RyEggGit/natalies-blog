import { createApp } from 'vue';

// Vuetify and TailWind Stuuf
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './tailwind.css';
import 'vuetify/styles';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    components,
    directives,
});

// Routes
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from "./components/Home/Home.vue";
import Blog from "./components/Blog.vue";
import Dashboard from "./components/Dashboard.vue";

const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/blog/:uuid', name: "Blog", component: Blog },
    { path: '/dashboard', name: "Dashboard", component: Dashboard },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Piana store
import { createPinia } from 'pinia';
const pinia = createPinia();


createApp(App).use(router).use(vuetify).use(pinia).mount('#app');
