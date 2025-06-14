import { 
    db, 
    collection, 
    getDocs, 
    addDoc, 
    query, 
    where 
    // orderBy eliminado porque no se usa
} from '../firebase.js';

class FirestoreService {
    // Obtener todas las categorías
    async getCategorias() {
        try {
            // Opción temporal: solo filtrar por active
            const q = query(
                collection(db, 'Categorias'), 
                where('active', '==', true)
            );
            const querySnapshot = await getDocs(q);
            const categories = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            // Ordenar en el cliente
            return categories.sort((a, b) => (a.order || 0) - (b.order || 0));
        } catch (error) {
            console.error('Error obteniendo categorías:', error);
            throw error;
        }
    }
    // Obtener todos los materiales
    async getMateriales() {
        try {
            const q = query(
                collection(db, 'Materiales'),
                where('active', '==', true)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error obteniendo materiales:', error);
            throw error;
        }
    }

    // Obtener información del sitio
    async getSiteInfo() {
        try {
            const querySnapshot = await getDocs(collection(db, 'site_info'));
            const siteInfo = {};
            querySnapshot.docs.forEach(doc => {
                siteInfo[doc.id] = doc.data();
            });
            return siteInfo;
        } catch (error) {
            console.error('Error obteniendo información del sitio:', error);
            throw error;
        }
    }

    // Enviar mensaje de contacto
    async enviarContacto(contactData) {
        try {
            const docRef = await addDoc(collection(db, 'Contactos'), {
                ...contactData,
                timestamp: new Date(),
                status: 'nuevo'
            });
            return docRef.id;
        } catch (error) {
            console.error('Error enviando contacto:', error);
            throw error;
        }
    }

    // Obtener todos los trabajos
    async getTrabajos() {
        try {
            const q = query(
                collection(db, 'Trabajos'),
                where('active', '==', true)
            );
            const querySnapshot = await getDocs(q);
            const trabajos = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            // Ordenar por fecha (más recientes primero) y luego por order
            return trabajos.sort((a, b) => {
                // Primero por fecha (más reciente primero)
                const dateA = new Date(a.date || '2024-01-01');
                const dateB = new Date(b.date || '2024-01-01');
                if (dateB.getTime() !== dateA.getTime()) {
                    return dateB.getTime() - dateA.getTime();
                }
                // Si las fechas son iguales, ordenar por order
                return (a.order || 0) - (b.order || 0);
            });
        } catch (error) {
            console.error('Error obteniendo trabajos:', error);
            throw error;
        }
    }

    // Obtener trabajos destacados
    async getTrabajosFeatured() {
        try {
            const q = query(
                collection(db, 'Trabajos'),
                where('active', '==', true),
                where('featured', '==', true)
            );
            const querySnapshot = await getDocs(q);
            const trabajos = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            return trabajos.sort((a, b) => (a.order || 0) - (b.order || 0));
        } catch (error) {
            console.error('Error obteniendo trabajos destacados:', error);
            throw error;
        }
    }

    // Obtener trabajos por categoría
    async getTrabajosByCategory(category) {
        try {
            const q = query(
                collection(db, 'Trabajos'),
                where('active', '==', true),
                where('category', '==', category)
            );
            const querySnapshot = await getDocs(q);
            const trabajos = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            return trabajos.sort((a, b) => (a.order || 0) - (b.order || 0));
        } catch (error) {
            console.error('Error obteniendo trabajos por categoría:', error);
            throw error;
        }
    }
}

export default new FirestoreService();

