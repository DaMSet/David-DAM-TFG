import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/contact', component: { template: '<div>Contact</div>' } }
  ]
})

describe('Home.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })
  })

  it('se renderiza correctamente', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.home-page').exists()).toBe(true)
  })

  it('muestra el título principal', () => {
    const title = wrapper.find('.hero-content h1')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Artesanía en Cuero')
  })

  it('muestra el subtítulo', () => {
    const subtitle = wrapper.find('.hero-content p')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe('Tradición y calidad en cada detalle')
  })

  it('contiene botones CTA que enlazan a contacto', () => {
    const routerLinks = wrapper.findAllComponents({ name: 'RouterLink' })
    expect(routerLinks.length).toBeGreaterThan(0)
    
    routerLinks.forEach(link => {
      expect(link.props('to')).toBe('/contact')
    })
  })

  it('muestra las tres tarjetas de servicios', () => {
    const featureCards = wrapper.findAll('.feature-card')
    expect(featureCards).toHaveLength(3)
    
    const expectedTitles = [
      'Reparación de Calzado',
      'Artículos de Cuero', 
      'Restauración'
    ]
    
    featureCards.forEach((card, index) => {
      const title = card.find('h3')
      expect(title.text()).toBe(expectedTitles[index])
    })
  })

  it('tiene la estructura correcta de secciones', () => {
    expect(wrapper.find('.hero-section').exists()).toBe(true)
    expect(wrapper.find('.features-section').exists()).toBe(true)
    expect(wrapper.find('.cta-section').exists()).toBe(true)
  })
})