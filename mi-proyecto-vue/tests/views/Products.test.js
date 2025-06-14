import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Products from '@/views/Products.vue'
import FirestoreService from '@/services/firestoreService.js'

// Mock del servicio
vi.mock('@/services/firestoreService.js', () => ({
  default: {
    getCategorias: vi.fn(),
    getMateriales: vi.fn()
  }
}))

describe('Products.vue', () => {
  let wrapper

  const mockCategorias = [
    {
      id: '1',
      name: 'Cinturones',
      description: 'Cinturones artesanales',
      price: '45€',
      image: 'test-image.jpg'
    }
  ]

  const mockMateriales = [
    {
      id: '1',
      name: 'Cuero Premium',
      description: 'Cuero de alta calidad',
      price: '25€/m²',
      stock: 50,
      unit: 'm²'
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    FirestoreService.getCategorias.mockResolvedValue(mockCategorias)
    FirestoreService.getMateriales.mockResolvedValue(mockMateriales)
  })

  it('se renderiza correctamente', () => {
    wrapper = mount(Products)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.products-page').exists()).toBe(true)
  })

  it('muestra estado de carga inicialmente', () => {
    wrapper = mount(Products)
    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.loading p').text()).toBe('Cargando productos...')
  })

  it('carga y muestra categorías correctamente', async () => {
    wrapper = mount(Products)
    
    // Esperar a que se complete la carga
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(FirestoreService.getCategorias).toHaveBeenCalled()
    expect(wrapper.vm.categories).toEqual(mockCategorias)
  })

  it('carga y muestra materiales correctamente', async () => {
    wrapper = mount(Products)
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(FirestoreService.getMateriales).toHaveBeenCalled()
    expect(wrapper.vm.materials).toEqual(mockMateriales)
  })

  it('maneja errores de carga', async () => {
    FirestoreService.getCategorias.mockRejectedValue(new Error('Error de red'))
    
    wrapper = mount(Products)
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.vm.error).toBe('Error de red')
    expect(wrapper.find('.error').exists()).toBe(true)
  })

  it('oculta el loading después de cargar los datos', async () => {
    wrapper = mount(Products)
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.find('.loading').exists()).toBe(false)
  })
})