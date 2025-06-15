import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

// Simulación del router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } },
    { path: '/products', component: { template: '<div>Products</div>' } },
    { path: '/portfolio', component: { template: '<div>Portfolio</div>' } },
    { path: '/contact', component: { template: '<div>Contact</div>' } }
  ]
})

describe('Navbar.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Navbar, {
      global: {
        plugins: [router]
      }
    })
  })

  it('se renderiza correctamente', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.navbar').exists()).toBe(true)
  })

  it('muestra el logo "ArteCuero"', () => {
    const logo = wrapper.find('.logo')
    expect(logo.exists()).toBe(true)
    expect(logo.text()).toBe('ArteCuero')
  })

  it('contiene todos los enlaces de navegación', () => {
    const links = wrapper.findAll('.nav-links a')
    expect(links).toHaveLength(5)
    
    const expectedTexts = ['INICIO', 'SOBRE NOSOTROS', 'PRODUCTOS', 'TRABAJOS', 'CONTACTANOS']
    links.forEach((link, index) => {
      expect(link.text()).toBe(expectedTexts[index])
    })
  })

  it('alterna el menú móvil al hacer clic en hamburger', async () => {
    const hamburger = wrapper.find('.hamburger')
    const navLinks = wrapper.find('.nav-links')
    
    // Inicialmente el menú está cerrado
    expect(wrapper.vm.isMenuOpen).toBe(false)
    expect(navLinks.classes()).not.toContain('active')
    
    // Hacer clic para abrir
    await hamburger.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(true)
    expect(navLinks.classes()).toContain('active')
    
    // Hacer clic para cerrar
    await hamburger.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(false)
    expect(navLinks.classes()).not.toContain('active')
  })

  it('cierra el menú al hacer clic en un enlace', async () => {
    // Abrir el menú primero
    await wrapper.find('.hamburger').trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(true)
    
    // Hacer clic en un enlace
    await wrapper.find('.nav-links a').trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(false)
  })

  it('limpia el overflow del body al desmontar', () => {
    // Simular que el menú está abierto
    wrapper.vm.isMenuOpen = true
    document.body.style.overflow = 'hidden'
    
    // Desmontar el componente
    wrapper.unmount()
    
    // El overflow debería estar limpio
    expect(document.body.style.overflow).toBe('')
  })
})