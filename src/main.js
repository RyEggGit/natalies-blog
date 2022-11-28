import { createApp } from 'vue';
import App from './App.vue';
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


createApp(App).use(vuetify).mount('#app');
