<template>
  <div class="about-page">
    <div class="hero-section">
      <h1>Sobre Nosotros</h1>
      <p class="subtitle">Artesanía en cuero con historia</p>
    </div>

    <div class="about-content">
      <div class="about-grid">
        <div class="about-text">
          <h2>Nuestra Historia</h2>
          <p>Con más de 30 años de experiencia en el arte de la zapatería y el trabajo en cuero, nuestro taller artesanal ha mantenido viva la tradición del trabajo manual de calidad. Cada pieza que sale de nuestro taller cuenta una historia de dedicación y pasión por el oficio.</p>
          <div class="stats">
            <div class="stat-item">
              <span class="number">30+</span>
              <span class="label">Años de Experiencia</span>
            </div>
            <div class="stat-item">
              <span class="number">1000+</span>
              <span class="label">Clientes Satisfechos</span>
            </div>
            <div class="stat-item">
              <span class="number">5000+</span>
              <span class="label">Trabajos Realizados</span>
            </div>
          </div>
        </div>
        <div class="about-image">
          <img src="https://placehold.co/600x400" alt="Nuestro Taller">
        </div>
      </div>
    </div>

    <div class="values-section">
      <h2>Nuestros Valores</h2>
      <div class="values-grid">
        <div class="value-card">
          <h3>Artesanía Tradicional</h3>
          <p>Preservamos las técnicas tradicionales del trabajo en cuero</p>
        </div>
        <div class="value-card">
          <h3>Calidad Premium</h3>
          <p>Utilizamos los mejores materiales para cada proyecto</p>
        </div>
        <div class="value-card">
          <h3>Atención Personalizada</h3>
          <p>Cada cliente recibe un servicio único y personalizado</p>
        </div>
      </div>
    </div>

    <div class="location-section">
      <h2>Encuéntranos</h2>
      <div class="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.6789!2d-3.7037902!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAwLjQiTiAzwrA0MicxMy42Ilc!5e0!3m2!1ses!2ses!4v1234567890"
          width="100%" 
          height="450" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-page {
  padding-top: 80px;
}

.hero-section {
  background-color: #f8f9fa;
  padding: 100px 20px;
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

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 80px;
}

.about-text h2 {
  font-size: 36px;
  margin-bottom: 30px;
  color: #333;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.stat-item {
  text-align: center;
}

.number {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #C4A484;
}

.label {
  font-size: 14px;
  color: #666;
}

.about-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.values-section {
  background-color: #f8f9fa;
  padding: 80px 20px;
  margin: 60px 0;
}

.values-section h2 {
  text-align: center;
  margin-bottom: 50px;
}

.values-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.value-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.value-card:hover {
  transform: translateY(-10px);
}

.location-section {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
}

.location-section h2 {
  text-align: center;
  margin-bottom: 40px;
}

.map-container {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .about-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .hero-section h1 {
    font-size: 36px;
  }
}
</style>