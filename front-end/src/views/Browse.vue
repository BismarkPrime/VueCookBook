<template>
<div>
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
        <div
          v-for="(selection, index) in this.$root.$data.cookBook"
          :key="index" class="pure-menu-item"
        >
        <li class="pure-menu-item" style="text-transform: capitalize;"><a @click="select(selection.category)" href="#" class="pure-menu-link">{{selection.category}}</a></li>
        </div>
    </ul>
  </div>
  <ProductList :recipes="recipes" />
</div>
</template>

<script>
import ProductList from "../components/ProductList.vue";
export default {
  name: "Browse",
  components: {
    ProductList,
  },
  data() {
    return {
      
      category: "",
    };
  },
  computed: {
    recipes() {
      for (let section of this.$root.$data.cookBook) {
        if (section.category == this.category) {
          return section.recipes;
        }
      }
      return [];
    },
    products_old() {
      return this.$root.$data.cookBook.filter(
        (product) => product.category === this.category
      );
    },
  },
  methods: {
    select(category) {
      this.category = category;
    },
  },
};
</script>