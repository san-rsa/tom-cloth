require("dotenv").config();

const mongoose = require("mongoose");

const setupDB = async () => {
  try {
    const uri = 'mongodb+srv://sanrsa:rahman417@cluster0.w7dwc.mongodb.net/footballDB' // process.env.MONGO_URI ;

    await mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,
      })

      .catch((error) => console.log(error));

    const connection = mongoose.connection;

    console.log("MONGODB CONNECTED SUCCESSFULLY!");
    connection
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = setupDB;