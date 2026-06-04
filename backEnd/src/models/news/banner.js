const mongoose = require("mongoose");


const bannerSchema = new mongoose.Schema({
  head: {type: String, required: true, trim: true 
  },


  body: {type: String, required: true
  },


  imgUrl: {url: {type: String, required: true}, imgId: {type: String, required: true} },

 
}, {
    timestamps: true
}
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner