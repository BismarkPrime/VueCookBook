<template>
  <div class="container">
    <div class="product" v-for="recipe in recipes" :key="recipe.name.replace(/\s+/g, '')">
      <div class="row">
        <div class="recipe-wrapper">
          <button
            class="btn long-btn inner-button"
            type="button"
            id="dropdownMenuButton"
            data-toggle="collapse"
            :data-target="'#' + recipe.name.replace(/\s+/g, '') + '_collapsable'"
          >
            <div class="recipe-info">
              <div class="image">
                <img :src="recipe.img" />
              </div>
              <div class="info1">
                <h1>{{ recipe.name }}</h1>
                <p>{{ "By " + recipe.author }}</p>
              </div>
            </div>
            <div class="heart" @click.stop="addToFavorites(recipe)">
              <i :class="'fa' + (isFavorite(recipe.name) ? '' : 'r') + ' fa-heart fa-2x'"></i>
            </div>
          </button>
          <div class="collapse row" :id="recipe.name.replace(/\s+/g, '') + '_collapsable'">
            <div class="recipe-details">
              <h2>Ingredients</h2>
              <div class="container">
                <div class="row">
                  <div
                    class="col-sm-6 col-lg-4"
                    v-for="(ingredient, index) in recipe.ingredients"
                    :key="index"
                  >
                    <ul>
                      <li>{{ ingredient }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr />
              <h2>Procedure</h2>
              <p>
                {{ recipe.procedure }}
              </p>
            </div>
          </div>
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
    addToFavorites(currentRecipe) {
      // if (!this.$root.$data.cart.length) {
      //   for (let recipe of this.recipes) {
      //     this.$root.$data.cart.push({ product: recipe, count: 0 });
      //   }
      // }
      //let i = this.$root.$data.cart.indexOf(

      let recipeIndex = this.$root.$data.recipeList.findIndex((recipe) => {
        return recipe == currentRecipe;
      });
      console.log(recipeIndex);
      this.$root.$data.recipeList[recipeIndex].favorite = !this.$root.$data
        .recipeList[recipeIndex].favorite;

      this.$root.$data.recipeList.push({});
      this.$root.$data.recipeList.length--;

      //);
      //this.$root.$data.cart[i].count++;
      //console.log(i);
      //console.log(this.$root.$data.cart[i]);
    },
    isFavorite(recipeName) {
      let index = this.$root.$data.recipeList.findIndex((recipe) => {
        return recipe.name == recipeName;
      });
      return this.$root.$data.recipeList[index].favorite;
    }
  },
};
</script>

<style scoped>
.recipe-wrapper {
  width: 100%;
  padding: 0 !important;
  border: 2px solid rgb(85, 85, 85);
  border-radius: 10px;
}

.inner-button {
  margin: 0 !important;
  background-color: rgb(85, 85, 85);
  color: rgb(230, 230, 230);
  border-radius: 6px;
}

.inner-button:hover {
  background-color: #333;
}

.recipe-info div {
  float: left;
}

.heart {
  float: right;
  background-color: transparent;
  border: none;
}

.recipe-details {
  position: relative;
  padding: 1.5rem;
  text-align: center;
  width: 100%;
}
ul > li {
  text-align: justify;
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
.box {
  display: flex;
  flex-wrap: wrap;
  width: 10px;
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
