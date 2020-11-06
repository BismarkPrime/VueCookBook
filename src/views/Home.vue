<template>
  <div class="center-content">
    <div class="wrapper">
      <div class="search">
        <form class="pure-form">
          <i class="fas fa-hamburger"></i>
          <input v-model="recipeQuery" placeholder="Search by Recipe" />
        </form>
      </div>
      <div class="search">
        <form class="pure-form">
          <i class="fas fa-carrot"></i>
          <input
            v-model="ingredientQuery"
            :placeholder="'Search by Ingredient (comma delimited)'"
          />
        </form>
      </div>
    </div>
    <ProductList :recipes="recipes" />
  </div>
</template>

<script>
import ProductList from "../components/ProductList.vue";
export default {
  name: "Home",
  components: {
    ProductList,
  },
  data() {
    return {
      currentProducts: [],
      recipeQuery: "",
      ingredientQuery: "",
    };
  },

  computed: {
    recipes() {
      let filteredRecipes = this.$root.$data.recipeList.filter(
        (recipe) => recipe.name.toLowerCase().search(this.recipeQuery) >= 0
      );
      let ingredientQueryList = this.ingredientQuery.split(",");
      for (let ingredientQuery of ingredientQueryList) {
        if (ingredientQuery.trim().length) {
          filteredRecipes = filteredRecipes.filter((recipe) => {
            for (let ingredient of recipe.ingredient_list) {
              if (ingredient.search(ingredientQuery.trim()) >= 0) {
                console.log(recipe.name.replace(/\s+/g, ""));
                return true;
              }
            }
            return false;
          });
        }
      }
      return filteredRecipes;
    },
  },
  methods: {
    fetchRecipeJSON: async (myUrl) => {
      const response = await fetch(myUrl, { mode: "cors" });
      let recipeJSON = await response.json();
      console.log(recipeJSON);
      return recipeJSON;
    },
  },
};
</script>

<style scoped>
.center-content {
  text-align: center;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
  margin: 0.2em;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}

.search {
  width: 80%;
}
</style>