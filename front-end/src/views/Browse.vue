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
      console.log("New call:");
      console.log(this.$root.$data.cookBook);
      for (let section of this.$root.$data.cookBook) {
        //console.log("Section Query: " + this.category + "\n" + "Current Section: " + section.category);
        if (section.category == this.category) {
          console.log(section.recipes);
          return section.recipes;
        }
      }
      //console.log(this.$root.$data.cookBook);
      return [];
    },
    /*recipes() {
      return this.$root.$data.cookBook.filter(
        (product) => product.category === this.category
      );
    },*/
  },
  methods: {
    select(category) {
      this.category = category;
    },
  },
};
</script>