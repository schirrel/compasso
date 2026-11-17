<template>
  <header>
    <h1>Compasso</h1>
  <nav >
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/studio">Go to Studio</RouterLink>
  </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
h1 {
  padding: 0; margin: 0;
  font-size: 28px;
  font-weight: 700;
}
header {
  display: flex;
  flex-direction: row;
  gap: 30px;
  width: 100%;
  padding: 20px;
  background: cornflowerblue;
  align-items: center;
  height: auto;
}

nav {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

nav a {
  text-decoration: none;
  color: #222;
  position: relative;
}

a::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
a:hover::before {
  transform: scaleX(1);
}

</style>