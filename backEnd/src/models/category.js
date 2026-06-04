const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true
  },

  imgUrl: {url: {type: String, required: true}, imgId: {type: String, required: true} },

  slug: {type: String, unique: true, slug: "name"
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category