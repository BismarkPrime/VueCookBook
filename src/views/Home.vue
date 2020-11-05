<template>
  <div>
    <div class="wrapper">
      <div class="search">
        <form class="pure-form">
          <i class="fas fa-hamburger"></i
          ><input v-model="searchText" placeholder="Search by Recipe" />
        </form>
      </div>
      <div class="search">
        <form class="pure-form">
          <i class="fas fa-carrot"></i
          ><input v-model="searchText" placeholder="Search by Ingredient" />
        </form>
      </div>
    </div>
    <ProductList :products="products" />
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
      searchText: "",
    };
  },
  computed: {
    products() {
      var myUrl = "https://cors-anywhere.herokuapp.com";
      myUrl += "/http://www.recipepuppy.com/api/?i=" + this.searchText;
      let fetchRecipeJSON = async (myUrl) => {
        const response = await fetch(myUrl, { mode: "cors" });
        let recipeJSON = await response.json();
        console.log(recipeJSON);
        return recipeJSON;
      };
      let json = fetchRecipeJSON(myUrl);
      console.log(json);
      return json;
    },
    products_old() {
      return this.$root.$data.products.filter(
        (product) => product.name.toLowerCase().search(this.searchText) >= 0
      );
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
</style>