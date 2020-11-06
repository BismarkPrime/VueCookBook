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
      //console.log(this.category);
      for (let section of this.$root.$data.cookBook) {
        console.log("Comparing next two");
        console.log(section.category);
        console.log(this.category);
        if (section.category == this.category) {
          console.log(section.recipes);
          console.log("success");
          return section.recipes;
        }
      }
      console.log("returned nothing");
      return [];
      // return this.$root.$data.cookBook.filter(
      //   (section) => section.category === this.category
      // ).at(0).recipes;
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