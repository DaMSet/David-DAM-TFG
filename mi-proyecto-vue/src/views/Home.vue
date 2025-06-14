<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Artesanía en Cuero</h1>
        <p>Tradición y calidad en cada detalle</p>
        <router-link to="/contact" class="cta-button">Contáctanos</router-link>
      </div>
      <div class="hero-image">
        <img src="https://placehold.co/800x600" alt="Taller de Cuero">
      </div>
    </div>

    <div class="features-section">
      <h2>Nuestros Servicios</h2>
      <div class="features-grid">
        <div class="feature-card">
          <img src="https://placehold.co/400x300" alt="Reparación">
          <h3>Reparación de Calzado</h3>
          <p>Restauramos todo tipo de calzado con técnicas tradicionales</p>
        </div>
        <div class="feature-card">
          <img src="https://placehold.co/400x300" alt="Artesanía">
          <h3>Artículos de Cuero</h3>
          <p>Creación de piezas únicas y personalizadas</p>
        </div>
        <div class="feature-card">
          <img src="https://placehold.co/400x300" alt="Restauración">
          <h3>Restauración</h3>
          <p>Devolvemos la vida a tus artículos de cuero favoritos</p>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <div class="cta-content">
        <h2>¿Tienes un proyecto en mente?</h2>
        <p>Contacta con nosotros y haremos realidad tu idea</p>
        <router-link to="/contact" class="cta-button">Solicitar Presupuesto</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-page {
  padding-top: 80px;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  align-items: center;
}

.hero-content h1 {
  font-size: 48px;
  color: #333;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 20px;
  color: #666;
  margin-bottom: 30px;
}

.hero-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.cta-button {
  display: inline-block;
  padding: 15px 30px;
  background-color: #C4A484;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #A88B68;
}

.features-section {
  background-color: #f8f9fa;
  padding: 80px 20px;
  margin: 60px 0;
}

.features-section h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
  color: #333;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.feature-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.feature-card h3 {
  padding: 20px;
  margin: 0;
  color: #333;
}

.feature-card p {
  padding: 0 20px 20px;
  color: #666;
}

.cta-section {
  background-color: #C4A484;
  color: white;
  padding: 80px 20px;
  text-align: center;
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

.cta-content .cta-button {
  background-color: white;
  color: #C4A484;
}

.cta-content .cta-button:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .hero-content h1 {
    font-size: 36px;
  }
}
</style>