<template>
  <div>
    <h1>Cart</h1>
    <div class="wrapper">
      <div v-if="!visibleCart.length" class="info">
        <h1>Your cart is empty!</h1>
      </div>

      <div class="products">
        <div class="product" v-for="recipeItem in visibleCart" :key="recipeItem.recipe.id">
          <div class="info">
            <h1>{{ recipeItem.recipe.name }}</h1>
            <h4>{{ "(" + recipeItem.recipe.price + " each)" }}</h4>
          </div>
          <div class="image">
            <img :src="recipeItem.recipe.img" />
          </div>
          <div class="price">
            <div>
              <h3>{{ "Qty: " + recipeItem.count }}</h3>
            </div>

            <button class="auto" @click="removeFromCart(recipeItem)">
              Remove from Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",

  computed: {
    visibleCart() {
      return this.$root.$data.cart.filter((recipe) => {
        return recipe.count;
      });
    },
  },
  methods: {
    removeFromCart(currentRecipe) {
      this.$root.$data.cart.find((recipe) => {
        return recipe == currentRecipe;
      }).count--;
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