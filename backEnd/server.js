require("dotenv").config();


// require("dotenv").config();

const mongoose = require("mongoose");

    const uri = 'mongodb+srv://sanrsa:rahman417@cluster0.w7dwc.mongodb.net/footballDB' // process.env.MONGO_URI ;

     mongoose.connect(uri, // {useNewUrlParser: true, useUnifiedTopology: true, // useCreateIndex: true }
      )

      .catch((error) => console.log(error));

    const connection = mongoose.connection;

    console.log("MONGODB CONNECTED SUCCESSFULLY!");
    connection




// const createError = require("http-errors");
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const passport = require("passport");
// const flash = require("connect-flash");
// const Category = require("./src/models/category");
// var MongoStore = require("connect-mongo");
// const connectDB = require("./src/connection/db");
// // const auth = require("./src/connection/auth")

// const app = express();
// require("./src/connection/passport");




const express = require("express");
const app = express();


const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
var MongoStore = require("connect-mongo");
const connectDB = require("./src/connection/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const http = require('http');
const socketIO = require('socket.io');

// live 
const server = http.createServer(app);
const io = socketIO(server, {
  cors:{
    cors: {
      origin: "*"
    }
  }
})


io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})

 module.exports = {io};


// const auth = require("./src/connection/auth")

const cookieParser = require("cookie-parser");


const path = require("path");

// cloud
const cloudinary = require("cloudinary");

// cloud config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});





const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
 // optionsSuccessStatus: 204, no
  allowedHeaders: [   
    "set-cookie",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials", 
    'Content-Type', 
    // 'Authorization', no
  ],  
};


// const corsOptions = {
//   origin: process.env.ORIGIN,
//   credentials: true,
//   allowedHeaders: [
//     "set-cookie",
//     "Content-Type",
//     "Access-Control-Allow-Origin",
//     "Access-Control-Allow-Credentials"
//   ],
// };



app.use(cors(corsOptions));
app.use(cookieParser());


require("./src/connection/passport");

// mongodb configuration
// view engine setup
app.set("view engine", "ejs");

// admin route
// const adminRouter = require("./src/routes/admin");


// app.use("/admin", adminRouter);

// app.use(express.json());
app.use(express.json({
  verify: (req, res, buf) => {
    if (req.originalUrl.startsWith('/payment/webhook')) {
      req.rawBody = buf.toString();
    }
  },
   }));
app.use(express.urlencoded({ extended: false }));



app.use(flash());

path.join(process.cwd(), 'tmp')

app.use(
  fileUpload({
    useTempFiles: true,
    debug: false,
    tempFileDir: "/tmp/"
  })
);









//route importing and mounting
const user = require('./src/routes/security')
const adminadd = require('./src/routes/admin/add');
const adminedit = require('./src/routes/admin/edit');
const admindel = require('./src/routes/admin/delete');
const getaccess = require('./src/routes/getaccess');
const getall = require('./src/routes/getall');
const getone = require('./src/routes/getone');
const add = require('./src/routes/add');
const edit = require('./src/routes/edit');
const del = require('./src/routes/del');
const payment = require('./src/routes/payment')


const router = express.Router()





router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});




app.use('/auth', user)
app.use('/admin/add', adminadd)
app.use('/admin/edit', adminedit)
app.use('/admin/delete', admindel)
app.use("/getaccess", getaccess)
app.use("/getall/", getall)
app.use("/getone", getone)
app.use("/add", add)
app.use("/edit", edit)
app.use("/delete", del)
app.use("/payment", payment)











var port = process.env.PORT || 8000;
app.set("port", port);

server.listen(port, () => {
  console.log("Server running at port " + port);
});


// app.listen(port, () => {
//   console.log("Server running at port " + port);
// });

module.exports = app;
