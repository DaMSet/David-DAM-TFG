<template>
  <div class="portfolio-page">
    <div class="hero-section">
      <h1>Nuestros Trabajos</h1>
      <p class="subtitle">Ejemplos de restauraciones y creaciones artesanales</p>
    </div>

    <!-- Filtros por categoría -->
    <div class="filters-section">
      <div class="filters">
        <button 
          :class="['filter-btn', { active: selectedCategory === 'all' }]"
          @click="filterByCategory('all')"
        >
          Todos
        </button>
        <button 
          v-for="category in categories" 
          :key="category"
          :class="['filter-btn', { active: selectedCategory === category }]"
          @click="filterByCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="portfolio-section">
      <!-- Loading state -->
      <div v-if="loading" class="loading">
        <p>Cargando trabajos...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error">
        <p>Error cargando trabajos: {{ error }}</p>
      </div>

      <!-- Projects grid -->
      <div v-else class="portfolio-grid">
        <div class="portfolio-card" v-for="project in filteredProjects" :key="project.id">
          <div class="image-container">
            <img :src="project.image" :alt="project.name">
            <div v-if="project.featured" class="featured-badge">Destacado</div>
          </div>
          <div class="project-info">
            <h3>{{ project.name }}</h3>
            <p class="category">{{ project.category }}</p>
            <p class="description">{{ project.description }}</p>
            <div class="project-meta">
              <span class="date">{{ formatDate(project.date) }}</span>
              <span class="duration">{{ project.duration }}</span>
            </div>
            <div class="tags">
              <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <div class="cta-content">
        <h2>¿Tienes un proyecto similar?</h2>
        <p>Podemos ayudarte a restaurar o crear tu próxima pieza de cuero</p>
        <router-link to="/contact" class="cta-button">Contactar</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FirestoreService from '../services/firestoreService.js';

export default {
  name: 'PortfolioPage',
  data() {
    return {
      projects: [],
      filteredProjects: [],
      categories: [],
      selectedCategory: 'all',
      loading: true,
      error: null
    }
  },
  async mounted() {
    await this.loadProjects();
  },
  methods: {
    async loadProjects() {
      try {
        this.loading = true;
        this.error = null;
        
        // Cargar trabajos desde Firebase
        this.projects = await FirestoreService.getTrabajos();
        this.filteredProjects = [...this.projects];
        
        // Extraer categorías únicas
        this.categories = [...new Set(this.projects.map(p => p.category))];
        
        console.log('Trabajos cargados:', this.projects.length);
      } catch (error) {
        console.error('Error cargando trabajos:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    filterByCategory(category) {
      this.selectedCategory = category;
      if (category === 'all') {
        this.filteredProjects = [...this.projects];
      } else {
        this.filteredProjects = this.projects.filter(p => p.category === category);
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long' 
      });
    }
  }
}
</script>

<style scoped>
.portfolio-page {
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

.filters-section {
  padding: 20px;
  text-align: center;
  margin-bottom: 40px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  border: 2px solid #8B4513;
  background: transparent;
  color: #8B4513;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  background: #8B4513;
  color: white;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #dc3545;
}

.featured-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ffd700;
  color: #333;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 14px;
  color: #666;
}

.date {
  font-style: italic;
}

.duration {
  font-weight: 500;
}

.portfolio-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
}

.portfolio-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.portfolio-card:hover {
  transform: translateY(-10px);
}

.image-container {
  position: relative;
  overflow: hidden;
  height: 300px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-info {
  padding: 25px;
}

.project-info h3 {
  margin: 0 0 10px;
  color: #333;
  font-size: 1.5em;
}

.category {
  color: #C4A484;
  font-weight: 500;
  margin-bottom: 15px;
}

.description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tags span {
  background-color: #f8f9fa;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9em;
  color: #666;
}

.cta-section {
  background-color: #C4A484;
  color: white;
  padding: 80px 20px;
  text-align: center;
  margin-top: 60px;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.cta-content p {
  margin-bottom: 30px;
  font-size: 18px;
}

.cta-button {
  display: inline-block;
  padding: 15px 30px;
  background-color: white;
  color: #C4A484;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .hero-section h1 {
    font-size: 36px;
  }
}
</style>