import { createRouter, createWebHistory } from '@ionic/vue-router';
import LoginPage from '@/views/LoginPage.vue';
import ProductListPage from '@/views/ProductListPage.vue'; // Importa la nueva página
import About from '../views/About.vue';


const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductListPage, // Ruta de ProductListPage
  },
  
  
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
