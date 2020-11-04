<template>
  <div id="app">
    <div id="menu">
      <div id="brand">
        <router-link to="/">
          <img src="/images/logo.png" />
        </router-link>
      </div>
      <div id="side">
        <router-link to="/browse">
          <div class="menu-item browse">
            <img src="/images/globe.png" />
            <p>Browse</p>
          </div>
        </router-link>
        <router-link to="/cart">
          <div class="menu-item">
            <img src="/images/love.png" />
            <p>{{ cartCount }} items</p>
          </div>
        </router-link>
      </div>
    </div>
    <router-view />
      <footer>
      &copy; 2020 Peter Seely -
      <span><a href=https://github.com/BYU-CS-260-Winter-2020/lab-3b-grocery-store-BismarkPrime>View Github Source</a></span>
  </footer>
  </div>
</template>

<script>
export default {
  name: "App",

  computed: {
    cartCount() {
      return this.$root.$data.cart.reduce((total, current) => {
        return total + current.count;
      }, 0);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  position: relative;
  min-height: 100%;
  padding-bottom: 2em;
}

body {
  margin: 50px 100px;
}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #b84901;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
}

footer {
  color: #f3f3f3;
  background-color: rgb(0, 0, 0, 0.8);
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 1em;
}

footer a {
  color: #f3f3f3;
  text-decoration: none;
  display: inline;
}

footer a:hover {
  text-decoration: underline;
}
</style>