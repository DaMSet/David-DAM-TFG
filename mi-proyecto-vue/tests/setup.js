import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Simulación de Firebase para evitar conexiones reales durante las pruebas
const mockFirestore = {
  collection: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn()
}

// Simulación global de Firebase
vi.mock('../src/firebase.js', () => ({
  db: mockFirestore,
  collection: mockFirestore.collection,
  getDocs: mockFirestore.getDocs,
  addDoc: mockFirestore.addDoc,
  query: mockFirestore.query,
  where: mockFirestore.where
}))

// Configuración global para Vue Test Utils
config.global.mocks = {
  $router: {
    push: vi.fn(),
    replace: vi.fn()
  },
  $route: {
    path: '/',
    params: {},
    query: {}
  }
}