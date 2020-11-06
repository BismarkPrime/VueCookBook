<template>
  <div class="wrapper">
    <div class="products">
      <div class="product" v-for="recipe in recipes" :key="recipe.id">
        <div class="info">
          <h1>{{ recipe.name }}</h1>
          <p>{{ recipe.country }}</p>
        </div>
        <div class="image">
          <img :src="recipe.img" />
        </div>
        <div class="price">
          <h2>{{ recipe.price }}</h2>
          <button class="auto" @click="addToCart(recipe)">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    recipes: Array,
  },

  created() {
    // if (!this.$root.$data.cart.length) {
    //   for (let recipe of this.recipes) {
    //     this.$root.$data.cart.push({ recipe: recipe, count: 0 });
    //   }
    // }
  },

  methods: {
    addToCart(currentRecipe) {
      // if (!this.$root.$data.cart.length) {
      //   for (let recipe of this.recipes) {
      //     this.$root.$data.cart.push({ product: recipe, count: 0 });
      //   }
      // }
      //let i = this.$root.$data.cart.indexOf(
        console.log(this.$root.$data.cart.length);
        this.$root.$data.cart.find((recipeObject) => {
          return recipeObject.recipe == currentRecipe;
        }).count++;
      //);
      //this.$root.$data.cart[i].count++;
      //console.log(i);
      //console.log(this.$root.$data.cart[i]);
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
  margin-bottom: 5px;
}

.info {
  background: #f2921d;
  color: #000;
  padding: 10px 30px;
  height: 80px;
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