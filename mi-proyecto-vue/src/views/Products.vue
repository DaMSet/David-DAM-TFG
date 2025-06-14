<template>
  <div class="products-page">
    <div class="hero-section">
      <h1>Nuestros Productos</h1>
      <p class="subtitle">Artículos de cuero y materiales de primera calidad</p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      <p>Cargando productos...</p>
    </div>

    <!-- Error state -->
    <div v-if="error" class="error">
      <p>Error cargando productos: {{ error }}</p>
    </div>

    <!-- Categories Section -->
    <div class="categories-section" v-if="!loading && !error">
      <div class="categories-grid">
        <div class="category-card" v-for="category in categories" :key="category.id">
          <img :src="category.image || 'https://placehold.co/400x300'" :alt="category.name">
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
          <span class="price">{{ category.price }}</span>
        </div>
      </div>
    </div>

    <!-- Materials Section -->
    <div class="materials-section" v-if="!loading && !error">
      <h2>Materiales para Artesanos</h2>
      <div class="materials-grid">
        <div class="material-card" v-for="material in materials" :key="material.id">
          <img :src="material.image || 'https://placehold.co/400x300'" :alt="material.name">
          <div class="material-info">
            <h3>{{ material.name }}</h3>
            <p>{{ material.description }}</p>
            <span class="price">{{ material.price }}</span>
            <span class="stock" v-if="material.stock">Stock: {{ material.stock }} {{ material.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FirestoreService from '../services/firestoreService.js';

export default {
  name: 'ProductsPage',
  data() {
    return {
      categories: [],
      materials: [],
      loading: true,
      error: null
    }
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      try {
        this.loading = true;
        this.error = null;
        
        // Cargar categorías y materiales en paralelo
        const [categoriesData, materialsData] = await Promise.all([
          FirestoreService.getCategorias(),
          FirestoreService.getMateriales()
        ]);
        
        this.categories = categoriesData;
        this.materials = materialsData;
        
      } catch (error) {
        this.error = error.message;
        console.error('Error cargando datos:', error);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.products-page {
  padding-top: 80px;
}

.hero-section {
  background-color: #f8f9fa;
  padding: 60px 20px;
  text-align: center;
  margin-bottom: 60px;
}

.hero-section h1 {
  font-size: 48px;
  color: #333;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 18px;
  color: #666;
}

.categories-section,
.materials-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.materials-section h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
  color: #333;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.category-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.category-card:hover {
  transform: translateY(-10px);
}

.category-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.category-card h3,
.category-card p {
  padding: 15px;
  margin: 0;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.material-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.material-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.material-info {
  padding: 20px;
}

.price {
  display: block;
  font-size: 1.2em;
  color: #C4A484;
  font-weight: bold;
  padding: 0 15px 15px;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.stock {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .categories-grid,
  .materials-grid {
    grid-template-columns: 1fr;
  }

  .hero-section h1 {
    font-size: 36px;
  }
}
</style>