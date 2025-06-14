<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">ArteCuero</router-link>
      <button class="hamburger" :class="{ 'active': isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="nav-links" :class="{ 'active': isMenuOpen }">
        <router-link to="/" @click="closeMenu">INICIO</router-link>
        <router-link to="/about" @click="closeMenu">SOBRE NOSOTROS</router-link>
        <router-link to="/products" @click="closeMenu">PRODUCTOS</router-link>
        <router-link to="/portfolio" @click="closeMenu">TRABAJOS</router-link>
        <router-link to="/contact" @click="closeMenu">CONTACTANOS</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarMenu',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
    },
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  z-index: 1001;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px 0;
  background: #333;
  transition: 0.4s;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #C4A484;
}

@media screen and (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    padding: 5rem 1rem 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links a {
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    font-size: 1.2rem;
    border-bottom: 1px solid #eee;
  }

  .nav-links a:last-child {
    border-bottom: none;
  }
}
</style>