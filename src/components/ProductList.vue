<template>
  <div class="wrapper">
    <div class="product" v-for="recipe in recipes" :key="recipe.id">
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle long-btn"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div class="left-align">
            <div class="image">
              <img :src="recipe.img" />
            </div>
            <div class="info1">
              <h1>{{ recipe.name }}</h1>
              <p>{{ recipe.country }}</p>
            </div>
          </div>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">
            <h2>Ingredients</h2>
            <hr>
            <div class="container">
              <div class="row">
                <div
                  v-for="(ingredient, index) in recipe.ingredients"
                  :key="index"
                >
                  <div class="col-6-sm col-4-md col-3-lg">
                    <ul>
                      <li>{{ ingredient }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a class="dropdown-item" href="#">
            <h2>Procedure</h2>
            <p>
              {{ recipe.procedure }}
            </p>
          </a>
        </div>
      </div>

      <div class="price" id="collapseExample">
        <h2>{{ recipe.price }}</h2>
        <button class="auto" @click="addToCart(recipe)">Add to Cart</button>
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
}
.dropdown {
  display: flex;
  justify-content: left;
  width: 100%;
}

.products {
  margin-top: 20px;
  display: block;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 100%;
}

.product img {
  border: 2px solid #333;
  height: 50px;
  width: 40px;
  margin: 5px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: left;
  margin-bottom: 5px;
}
.info1 h1 {
  font-size: 16px;
}
.info1 {
  font-size: 12px;
}

.price {
  display: flex;
}
.long-btn {
  width: 100%;
  min-width: 150px;
}
.left-align {
  display: flex;
  justify-content: left;
}
.auto {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>
