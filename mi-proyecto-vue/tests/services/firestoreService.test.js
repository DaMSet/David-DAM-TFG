import { describe, it, expect, vi, beforeEach } from 'vitest'
import FirestoreService from '@/services/firestoreService.js'

// Mock de Firebase
vi.mock('@/firebase.js', () => {
  const mockQuerySnapshot = {
    docs: [
      {
        id: '1',
        data: () => ({
          name: 'Cinturones',
          description: 'Cinturones artesanales',
          active: true,
          order: 1
        })
      },
      {
        id: '2',
        data: () => ({
          name: 'Carteras',
          description: 'Carteras de cuero',
          active: true,
          order: 2
        })
      }
    ]
  }

  return {
    db: {},
    collection: vi.fn(),
    getDocs: vi.fn().mockResolvedValue(mockQuerySnapshot),
    addDoc: vi.fn().mockResolvedValue({ id: 'new-doc-id' }),
    query: vi.fn(),
    where: vi.fn()
  }
})

describe('FirestoreService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCategorias', () => {
    it('obtiene y ordena las categorías correctamente', async () => {
      const categorias = await FirestoreService.getCategorias()
      
      expect(categorias).toHaveLength(2)
      expect(categorias[0].name).toBe('Cinturones')
      expect(categorias[1].name).toBe('Carteras')
      expect(categorias[0].order).toBe(1)
      expect(categorias[1].order).toBe(2)
    })

    it('maneja errores correctamente', async () => {
      const { getDocs } = await import('@/firebase.js')
      getDocs.mockRejectedValueOnce(new Error('Error de conexión'))
      
      await expect(FirestoreService.getCategorias()).rejects.toThrow('Error de conexión')
    })
  })

  describe('getMateriales', () => {
    it('obtiene los materiales correctamente', async () => {
      const materiales = await FirestoreService.getMateriales()
      
      expect(materiales).toHaveLength(2)
      expect(materiales[0]).toHaveProperty('id')
      expect(materiales[0]).toHaveProperty('name')
    })
  })

  describe('enviarContacto', () => {
    it('añade un contacto correctamente', async () => {
      const contactData = {
        nombre: 'Juan Pérez',
        email: 'juan@email.com',
        mensaje: 'Consulta sobre productos'
      }
      
      const result = await FirestoreService.enviarContacto(contactData)
      expect(result).toBeDefined()
      expect(typeof result).toBe('string') // Devuelve el ID del documento
    })
  })
})