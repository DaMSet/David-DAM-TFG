import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/Home.vue'
import AboutPage from './views/About.vue'
import ProductsPage from './views/Products.vue'
import PortfolioPage from './views/Portfolio.vue'
import ContactPage from './views/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage
    },
    {
      path: '/products',
      name: 'ProductsPage',
      component: ProductsPage
    },
    {
      path: '/portfolio',
      name: 'PortfolioPage',
      component: PortfolioPage
    },
    {
      path: '/contact',
      name: 'ContactPage',
      component: ContactPage
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')