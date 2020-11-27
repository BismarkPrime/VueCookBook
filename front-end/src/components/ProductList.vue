<template>
  <div class="container-fluid">
    <div class="product" v-for="recipe in recipes" :key="recipe.name.replace(/[\s+()]/g, '')">
      <div class="row">
        <div class="recipe-wrapper">
          <button
            class="btn long-btn inner-button"
            type="button"
            id="dropdownMenuButton"
            data-toggle="collapse"
            :data-target="'#' + recipe.name.replace(/[\s+()]/g, '') + '_collapsable'"
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
          <div class="collapse row" :id="recipe.name.replace(/[\s+()]/g, '') + '_collapsable'">
            <div class="recipe-details">
              <h2>Ingredients</h2>
              <div class="container-fluid">
                <div class="row">
                  <div
                    class="col-md-6 col-lg-4"
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
              <p class="procedure">
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
  },

  methods: {
    addToFavorites(currentRecipe) {
      let recipeIndex = this.$root.$data.items.findIndex((recipe) => {
        return recipe == currentRecipe;
      });
      console.log(recipeIndex);
      this.$root.$data.items[recipeIndex].favorite = !this.$root.$data.items[recipeIndex].favorite;
      this.$forceUpdate()
    },
    isFavorite(recipeName) {
      let index = this.$root.$data.items.findIndex((recipe) => {
        return recipe.name == recipeName;
      });
      if (this.$root.$data.items[index].favorite) {
        return true;
      }
      this.$root.$data.items[index].favorite = false;
      return false;

    },
  },
};
</script>

<style scoped>

.container-fluid {
  text-align: center;

}

.container-fluid > .product {
  width: 100%;
  text-align: justify;
  margin: 30px 0;
}

.container-fluid > .product > .row {
  width: 100%;
  text-align: center;
  margin: 0 !important;
}

.recipe-wrapper {
  width: 100%;
  text-align: center;
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
  margin-top: 30px;
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
  justify-content: center;
  margin-bottom: 5px;
}
.info1 h1 {
  font-size: 16px;
  text-align: justify;
}
.info1 {
  font-size: 12px;
}

.info1 > p {
  text-align: justify;
  margin-left: 1rem;
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
  justify-content: center;
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

.procedure {
  white-space: pre-wrap;
  text-align: justify;
}
</style>
