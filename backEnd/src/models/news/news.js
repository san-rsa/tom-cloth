const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  head: {type: String, required: true, trim: true 
  },


  body: {type: String, required: true
  },


  imgUrl: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],

  ref_Team: [{type: mongoose.Schema.Types.String, ref: "Team", }],

  ref_Region: [{type: mongoose.Schema.Types.String, ref: "Competition", }],

  views: {type: Number, default: 0 },

 
}, {
    timestamps: true
}
);

const News = mongoose.model("News", newsSchema);

module.exports = News