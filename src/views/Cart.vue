<template>
  <div>
    <h1>Favorites</h1>
    <div class="wrapper">
      <div v-if="!favoriteRecipes.length" class="info">
        <h1>You don't have any favorite recipes!</h1>
      </div>
    </div>
    <ProductList :recipes="favoriteRecipes" />
  </div>
</template>

<script>
import ProductList from "../components/ProductList.vue";
export default {
  name: "Cart",
  components: {
    ProductList,
  },

  computed: {
    favoriteRecipes() {
      return this.$root.$data.recipeList.filter((recipe) => {
        return recipe.favorite;
      });
    },
  },
  methods: {
    removeFromCart(currentRecipe) {
      this.$root.$data.cart.find((recipe) => {
        return recipe == currentRecipe;
      }).favorite = false;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
}

.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.product img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
}

.info {
  background: #1a9af0;
  color: #000;
  padding: 10px 30px;
  height: 80px;
  z-index: 0;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}

.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>