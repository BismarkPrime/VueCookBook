import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

//import recipeDB from './cook-book3.json'

let data = {
  cookBook: [],
  recipeList: [],
  cart: []
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
