<template>
  <div class="wrapper">
    <div class="products">
          <div class="product" v-for="product in products" :key="product.id">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle long-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="info1">
                  <h1>{{ product.name }}</h1>
                  <p>{{ product.country }}</p>
                <div class="image">
                  <img :src="'/images/products/' + product.image" />
                </div>
              </div>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#"></a>
                  <a class="dropdown-item" href="#"></a>
                  <a class="dropdown-item" href="#"></a>
                </div>
              </div>

              <div class="price" id="collapseExample">
                <h2>{{ product.price }}</h2>
                <button class="auto" @click="addToCart(product)">Add to Cart</button>
              </div>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    products: Array,
  },

  created() {
    if (!this.$root.$data.cart.length) {
      for (let product of this.products) {
        this.$root.$data.cart.push({ product: product, count: 0 });
      }
    }
  },

  methods: {
    addToCart(currentProduct) {
      if (!this.$root.$data.cart.length) {
        for (let product of this.products) {
          this.$root.$data.cart.push({ product: product, count: 0 });
        }
      }
      //let i = this.$root.$data.cart.indexOf(
        this.$root.$data.cart.find((item) => {
          return item.product == currentProduct;
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
  display: block;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
}

.product img {
  border: 2px solid #333;
  height: 50px;
  width: 40px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.info1 {
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
.long-btn {
  display: flex;
  justify-content: center;
  width: 100%;
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