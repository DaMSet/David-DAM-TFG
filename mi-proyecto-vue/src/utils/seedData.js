import FirestoreService from '../services/firestoreService.js';
import { addDoc, collection, db } from '../firebase.js';

const categorias = [
    {
        "active": true,
        "description": "Llaveros personalizados de cuero artesanal",
        "name": "Llaveros Personalizados",
        "order": 5,
        "price": "15€",
        "slug": "llaveros-personalizados",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
      },
      {
        "active": true,
        "description": "Fundas protectoras para móviles y tablets",
        "name": "Fundas y Accesorios",
        "order": 4,
        "price": "25€",
        "slug": "fundas-accesorios",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
      },
      {
        "active": true,
        "description": "Bolsos de cuero genuino con diseños únicos",
        "name": "Bolsos de Cuero",
        "order": 3,
        "price": "85€",
        "slug": "bolsos-cuero",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
      },
      {
        "active": true,
        "description": "Carteras y billeteras elegantes para el día a día",
        "name": "Carteras y Billeteras",
        "order": 2,
        "price": "35€",
        "slug": "carteras-billeteras",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
      },
      {
        "active": true,
        "description": "Cinturones hechos a mano con cuero de primera calidad",
        "name": "Cinturones Artesanales",
        "order": 1,
        "price": "45€",
        "slug": "cinturones-artesanales",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
      }
    ];

const materiales = [
    {
        "active": true,
        "description": "Herramientas profesionales para trabajar el cuero",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "name": "Kit de Herramientas",
        "price": "65€/kit",
        "stock": 20,
        "unit": "kit"
      },
      {
        "active": true,
        "description": "Tintes naturales para dar color al cuero",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "name": "Tintes Naturales",
        "price": "18€/bote",
        "stock": 30,
        "unit": "bote"
      },
      {
        "active": true,
        "description": "Hebillas metálicas de diferentes tamaños y acabados",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "name": "Hebillas Metálicas",
        "price": "12€/unidad",
        "stock": 75,
        "unit": "unidad"
      },
      {
        "active": true,
        "description": "Hilo encerado resistente para costuras duraderas",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "name": "Hilo Encerado",
        "price": "8€/rollo",
        "stock": 50,
        "unit": "rollo"
      },
      {
        "active": true,
        "description": "Cuero de alta calidad para proyectos artesanales",
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "name": "Cuero Natural",
        "price": "25€/m²",
        "stock": 100,
        "unit": "m²"
      }
];

const siteInfo = {

};

const trabajos = [
  {
    "active": true,
    "name": "Restauración de Botas Vintage",
    "category": "Restauración",
    "description": "Recuperación completa de unas botas de los años 50, incluyendo resolado y tratamiento del cuero.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
    "tags": ["Restauración", "Calzado", "Vintage"],
    "order": 1,
    "featured": true,
    "date": "2024-01-15",
    "duration": "2 semanas",
    "client": "Cliente Privado"
  },
  {
    "active": true,
    "name": "Colección de Carteras",
    "category": "Creación",
    "description": "Serie de carteras artesanales realizadas con cuero italiano de primera calidad.",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
    "tags": ["Artesanía", "Carteras", "Diseño Original"],
    "order": 2,
    "featured": true,
    "date": "2024-02-10",
    "duration": "1 mes",
    "client": "Boutique Local"
  },
  {
    "active": true,
    "name": "Cinturón Personalizado",
    "category": "Personalización",
    "description": "Cinturón de cuero con grabado personalizado y acabados en latón.",
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=400&fit=crop",
    "tags": ["Personalización", "Grabado", "Accesorios"],
    "order": 3,
    "featured": false,
    "date": "2024-02-20",
    "duration": "1 semana",
    "client": "Cliente Privado"
  },
  {
    "active": true,
    "name": "Restauración de Maletín",
    "category": "Restauración",
    "description": "Restauración de un maletín ejecutivo con más de 30 años de antigüedad.",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
    "tags": ["Restauración", "Maletín", "Clásico"],
    "order": 4,
    "featured": false,
    "date": "2024-03-05",
    "duration": "3 semanas",
    "client": "Empresa"
  },
  {
    "active": true,
    "name": "Bolso de Viaje",
    "category": "Creación",
    "description": "Bolso de viaje hecho a mano con cuero natural y herrajes de alta calidad.",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
    "tags": ["Artesanía", "Bolsos", "Viaje"],
    "order": 5,
    "featured": true,
    "date": "2024-03-20",
    "duration": "2 semanas",
    "client": "Cliente Privado"
  },
  {
    "active": true,
    "name": "Set de Accesorios Ejecutivos",
    "category": "Creación",
    "description": "Conjunto completo de accesorios de cuero para ejecutivos: cartera, portadocumentos y llavero.",
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
    "tags": ["Artesanía", "Ejecutivo", "Set Completo"],
    "order": 6,
    "featured": false,
    "date": "2024-04-01",
    "duration": "3 semanas",
    "client": "Empresa"
  }
];

export async function seedDatabase() {
  try {
    // Agregar categorías
    for (const categoria of categorias) {
      await addDoc(collection(db, 'Categorias'), categoria);
    }
    
    // Agregar materiales
    for (const material of materiales) {
      await addDoc(collection(db, 'Materiales'), material);
    }
    
    // Agregar trabajos
    for (const trabajo of trabajos) {
      await addDoc(collection(db, 'Trabajos'), trabajo);
    }
    
    // Agregar site_info
    await addDoc(collection(db, 'site_info'), siteInfo);
    
    console.log('Datos agregados exitosamente!');
  } catch (error) {
    console.error('Error agregando datos:', error);
  }
}

// Ejecutar la función
seedDatabase();

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura de categorías y materiales activos
    match /Categorias/{document} {
      allow read: if resource.data.active == true;
      
    }
    
    match /Materiales/{document} {
      allow read: if resource.data.active == true;
      
    }
    
    match /site_info/{document} {
      allow read: if true;
    }
    
    // Permitir escribir en contactos
    match /Contactos/{document} {
      allow create: if true;
    }
  }
}*/