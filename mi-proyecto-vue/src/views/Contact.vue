<template>
  <div class="contact-page">
    <div class="hero-section">
      <h1>Contáctanos</h1>
      <p class="subtitle">Estamos aquí para ayudarte con tu proyecto</p>
    </div>

    <div class="contact-section">
      <div class="contact-grid">
        <div class="contact-info">
          <h2>Información de Contacto</h2>
          <div class="info-items" v-if="siteInfo">
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <div class="info-content">
                <h3>Dirección</h3>
                <p>{{ siteInfo.address }}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-phone"></i>
              <div class="info-content">
                <h3>Teléfono</h3>
                <p>{{ siteInfo.phone }}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <div class="info-content">
                <h3>Email</h3>
                <p>{{ siteInfo.email }}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-clock"></i>
              <div class="info-content">
                <h3>Horario</h3>
                <p>Lunes a Viernes: {{ siteInfo.schedule?.weekdays }}</p>
                <p>Sábados: {{ siteInfo.schedule?.saturday }}</p>
              </div>
            </div>
          </div>
          
          <div class="whatsapp-section" v-if="siteInfo?.whatsapp">
            <h3>Contacta por WhatsApp</h3>
            <p>Respuesta rápida a través de mensaje directo</p>
            <a :href="`https://wa.me/${siteInfo.whatsapp}`" target="_blank" class="whatsapp-button">
              <i class="fab fa-whatsapp"></i>
              Enviar mensaje por WhatsApp
            </a>
          </div>
        </div>

        <div class="contact-form">
          <h2>Envíanos un Mensaje</h2>
          <form @submit.prevent="enviarMensaje">
            <div class="form-group">
              <label for="name">Nombre *</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required 
                :disabled="enviando"
              >
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required 
                :disabled="enviando"
              >
            </div>
            <div class="form-group">
              <label for="subject">Asunto *</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject" 
                required 
                :disabled="enviando"
              >
            </div>
            <div class="form-group">
              <label for="message">Mensaje *</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5" 
                required 
                :disabled="enviando"
              ></textarea>
            </div>
            <button type="submit" :disabled="enviando" class="submit-btn">
              {{ enviando ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>
          </form>
          
          <!-- Mensaje de éxito -->
          <div v-if="mensajeEnviado" class="success-message">
            ✅ ¡Mensaje enviado correctamente! Te responderemos pronto.
          </div>
          
          <!-- Mensaje de error -->
          <div v-if="errorEnvio" class="error-message">
            ❌ Error al enviar el mensaje: {{ errorEnvio }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add the map section here -->
    <div class="map-section">
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
import FirestoreService from '../services/firestoreService.js';

export default {
  name: 'ContactPage',
  data() {
    return {
      siteInfo: null,
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      enviando: false,
      mensajeEnviado: false,
      errorEnvio: null
    }
  },
  async mounted() {
    await this.cargarInfoSitio();
  },
  methods: {
    async cargarInfoSitio() {
      try {
        const info = await FirestoreService.getSiteInfo();
        // Asumiendo que tienes un documento con la info del sitio
        this.siteInfo = info[Object.keys(info)[0]] || {};
      } catch (error) {
        console.error('Error cargando información del sitio:', error);
      }
    },
    
    async enviarMensaje() {
      try {
        this.enviando = true;
        this.errorEnvio = null;
        this.mensajeEnviado = false;
        
        await FirestoreService.enviarContacto(this.form);
        
        this.mensajeEnviado = true;
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.mensajeEnviado = false;
        }, 5000);
        
      } catch (error) {
        this.errorEnvio = error.message;
      } finally {
        this.enviando = false;
      }
    }
  }
}
</script>

<style scoped>
.contact-page {
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

.contact-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  margin-bottom: 80px;
}

.contact-info {
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
}

.contact-info h2,
.contact-form h2 {
  margin-bottom: 30px;
  color: #333;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.info-item i {
  font-size: 24px;
  color: #C4A484;
}

.info-content h3 {
  margin: 0 0 5px;
  color: #333;
}

.info-content p {
  margin: 0;
  color: #666;
}

.contact-form form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: #333;
  font-weight: 500;
}

input, textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

textarea {
  height: 150px;
  resize: vertical;
}

.submit-button {
  background-color: #C4A484;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #A88B68;
}

.map-section {
  max-width: 1200px;
  margin: 0 auto 80px;
  padding: 0 20px;
}

.map-section h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.map-container {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .hero-section h1 {
    font-size: 36px;
  }
}
.whatsapp-section {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #ddd;
}

.whatsapp-section h3 {
  color: #333;
  margin-bottom: 10px;
}

.whatsapp-section p {
  color: #666;
  margin-bottom: 20px;
}

.whatsapp-button {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #25D366;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.whatsapp-button:hover {
  background-color: #128C7E;
}

.whatsapp-button i {
  font-size: 20px;
}
.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  border: 1px solid #c3e6cb;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  border: 1px solid #f5c6cb;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>