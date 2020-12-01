<template>
  <div class="admin">
    <h1>The Admin Page!</h1>
    <div class="heading">
      <i class="fas fa-plus-square fa-3x"></i>
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name" />
        <input v-model="category" placeholder="Category" />
        <input v-model="author" placeholder="Author" />
        <p>
          <textarea
            v-model="ingredients"
            id="describer"
            name="Ingredients"
            placeholder=" Ingredients"
          ></textarea>
        </p>
        <p>
          <textarea
            v-model="procedure"
            id="procedure"
            name="Procedure"
            placeholder=" Directions"
          ></textarea>
        </p>
        <input v-model="img" placeholder="Image URL" />
        <input type="file" name="photo" @change="fileChanged" />
        <button class="btn btn-outline-primary" @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{ addItem.name }}</h2>
        <img :src="addItem.img" />
      </div>
    </div>
    <div class="heading">
      <i class="fas fa-pen-square fa-3x"></i>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="container edit">
      <div class="row">
        <div class="col-md-3 form">
          <input v-model="findTitle" placeholder="Search" />
          <div class="suggestions" v-if="suggestions.length > 0">
            <div
              class="suggestion"
              v-for="s in suggestions"
              :key="s.id"
              @click="selectItem(s)"
            >
              {{ s.name }}
            </div>
          </div>
        </div>
        <div class="col-md-7 upload" v-if="findItem">
          <input v-model="findItem.name" placeholder="Recipe Name" />
          <input v-model="findItem.category" placeholder="Category" />
          <input v-model="findItem.author" placeholder="Author" />
          <input v-model="findItem.img" placeholder="Image URL" />
          <p>
            <textarea
              v-model="findItem.ingredients"
              id="ingredients2"
              name="Ingredients2"
              placeholder=" Ingredients"
            ></textarea>
          </p>
          <p>
            <textarea
              v-model="findItem.procedure"
              id="procedure2"
              name="Procedure2"
              placeholder=" Directions"
            ></textarea>
          </p>
          <img :src="findItem.img" />
        </div>
        <div class="col-md-2 actions" v-if="findItem">
          <button
            class="btn btn-outline-primary delete-item"
            @click="deleteItem(findItem)"
          >
            Delete
          </button>
          <button
            class="btn btn-outline-primary edit-item"
            @click="editItem(findItem)"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Admin",
  data() {
    return {
      name: "",
      procedure: "",
      category: "",
      author: "",
      img: "",
      ingredients: [],
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
      changed: true,
    };
  },
  computed: {
    suggestions() {
      let items = this.$root.$data.items.filter((item) =>
        item.name.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return items.sort((a, b) => a.name > b.name);
    },
    ingredientString() {
      let retVal = "";
      for (let ingredient of this.ingredients) {
        retVal += ingredient + "\n";
      }
      return retVal.substring(0, retVal.length - 1);
    },
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        let myImagePath = this.img;
        if (this.file != null) {
          formData.append("photo", this.file, this.file.name);
          let r1 = await axios.post("/api/photos", formData);
          myImagePath = r1.data.path;
        }
        let r2 = await axios.post("/api/items", {
          category: this.category,
          name: this.name,
          author: this.author,
          img: myImagePath, //r1.data.img,
          ingredients: this.ingredients.split(/\r?\n/),
          procedure: this.procedure,
        });
        this.addItem = r2.data;
        this.$set(this.addItem, "favorite", false);
        this.$root.$data.items.push(this.addItem);

        let section = this.$root.$data.cookBook.find((section) => {
          return section.category == this.addItem.category;
        });
        if (section == undefined) {
          this.$root.$data.cookBook.push({
            category: this.addItem.category,
            recipes: [this.$root.$data.items[this.$root.$data.items.length - 1]],
          });
        } else {
          this.$root.$data.cookBook[
            this.$root.$data.cookBook.findIndex((section) => {
              return section.category == this.addItem.category;
            })
          ].recipes.push(this.addItem);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async loadFromJSON() {
      for (let i = 0; i < this.$root.$data.recipeList.length; i++) {
        this.uploadJSON(this.$root.$data.recipeList[i]);
      }
    },
    async uploadJSON(item) {
      try {
        let r2 = await axios.post("/api/items", {
          category: item.category,
          name: item.name,
          author: item.author,
          img: item.img,
          ingredients: item.ingredients,
          procedure: item.procedure,
        });
        this.addItem = r2.data;
        this.$root.$data.items.push(r2.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let imageToPass = "";

        if (item.img != "" && (item.img.substring(0,7) == "http://" || item.img.substring(0,8) == "https://")) {
          imageToPass = "/not/noDelete";
        }
        else {
          imageToPass = item.img
        }
        await axios.delete("/api/items/" + item._id + imageToPass);
	this.findItem = null;
        this.$root.$data.items = this.$root.$data.items.filter((x) => {
          return x._id != item._id;
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          category: this.findItem.category,
          name: this.findItem.name,
          author: this.findItem.author,
          img: this.findItem.img, //r1.data.img,
          ingredients: this.findItem.ingredients,
          procedure: this.findItem.procedure,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
  },
};
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add {
  display: flex;
}

.container,
.row {
  margin: 0;
  min-width: 100%;
}

.heading i {
  margin: auto 0;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center;
}

/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.add {
  text-align: center;
  min-width: 100%;
}

.form input {
  width: 100%;
}

.add .form {
  width: 70%;
  min-width: 250px;
  margin: auto;
  text-align: center;
}

.add input {
  width: 100%;
  display: block;
  margin-bottom: 1rem;
}

.add textarea {
  width: 100%;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
	margin-bottom: 16px;
}

.upload {
  text-align: center;
  align-items: center;
}

.upload input,
.upload p textarea {
  width: 100%;
}

.upload input {
  margin-bottom: 16px;
}

/* Suggestions */
.suggestions {
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 16px;
}

.suggestion {
  min-height: 20px;
  padding: 9px;
}

.suggestion:hover {
  background-color: #5bdeff;
  color: #fff;
}

.actions {
  display: flex;
  flex-direction: column;
}

.actions button {
  margin-bottom: 16px;
}
</style>
