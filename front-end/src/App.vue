<template>
  <div id="app">
    <div id="menu">
      <div id="left-side">
        <router-link to="/admin">
          <div id="admin">
            <i class="fas fa-user-lock fa-4x"></i>
            <div class="menu-item browse">
              <p>Admin</p>
            </div>
          </div>
        </router-link>
      </div>
      <div id="brand">
        <router-link to="/">
          <img
            src="../public/images/digital-chef2.webp"
            alt="Digital Chef Logo"
          />
        </router-link>
      </div>
      <div id="side">
        <router-link to="/browse">
          <div id="filter">
            <i class="fas fa-utensils fa-4x"></i>
            <div class="menu-item browse">
              <p>Filter</p>
            </div>
          </div>
        </router-link>
        <router-link to="/cart">
          <div id="cart">
            <i class="fas fa-heart fa-4x"></i>
            <div class="menu-item">
              <p>{{ cartCount + " recipe" + (cartCount != 1 ? "s" : "") }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <router-view />
    <footer>
      &copy; 2020 Peter Seely &amp; Adam Johnson -
      <span
        ><a href="https://github.com/BismarkPrime/VueCookBook"
          >View Github Source</a
        ></span
      >
    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",

  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.$root.$data.cookBook = [];
      try {
        let response = await axios.get("/api/items");
        this.$root.$data.items = await response.data;

        for (let recipe of this.$root.$data.items) {
          this.$set(recipe, "favorite", false);
          let section = this.$root.$data.cookBook.find((section) => {
            return section.category == recipe.category;
          });
          if (section == undefined) {
            this.$root.$data.cookBook.push({
              category: recipe.category,
              recipes: [recipe],
            });
          } else {
            this.$root.$data.cookBook[
              this.$root.$data.cookBook.findIndex((section) => {
                return section.category == recipe.category;
              })
            ].recipes.push(recipe);
          }
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    cartCount() {
      let count = this.$root.$data.items.reduce((total, current) => {
        return total + current.favorite;
      }, 0);
      return count;
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

#app {
  width: 100%;
}
body {
  margin: 40px 30px;
}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "left-side brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #333;
}

#side i,
#left-side i {
  color: rgb(85, 85, 85);
}

#side i:hover,
#left-side i:hover {
  color: #333;
}

#left-side {
  grid-area: left-side;
  display: flex;
  justify-content: flex-start;
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

#admin,
#filter,
#cart {
  text-align: center;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.menu-item p {
  margin: 0px;
}

a:link {
  text-decoration: bold;
}

router-link {
  color: #333;
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
  color: #f3f3f3;
}

@media only screen and (max-width: 500px) {
  #menu .brand {
    grid-column-start: 1;
    grid-column-end: 5;
  }
  #menu .left-side {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  #menu .side {
    grid-column-start: 3;
    grid-column-end: 5;
  }
  #menu {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "brand brand brand" 
                         "left-side side side";
    grid-column-gap: 0;
    grid-row-gap: 20px;
  }
}
</style>