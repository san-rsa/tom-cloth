// require("dotenv").config();

//require("dotenv").config();

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

// // mongodb configuration
// connectDB();
// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// // admin route
// // const adminRouter = require("./src/routes/admin");


// // app.use("/admin", adminRouter);

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));


// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       // mongooseConnection:  mongoose.connection,
//     }),
//     //session expires after 3 hours
//     cookie: { maxAge: 60 * 1000 * 60 * 3 },
//   })
// );
// app.use(flash());


// // global variables across routes
// app.use(async (req, res, next) => {
//   try {
//     res.locals.login = req.isAuthenticated();
//     res.locals.session = req.session;
//     res.locals.currentUser = req.user;
//     const categories = await Category.find({}).sort({ title: 1 }).exec();
//     res.locals.categories = categories;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.redirect("/");
//   }
// });

// // add breadcrumbs
// get_breadcrumbs = function (url) {
//   var rtn = [{ name: "Home", url: "/" }],
//     acc = "", // accumulative url
//     arr = url.substring(1).split("/");

//   for (i = 0; i < arr.length; i++) {
//     acc = i != arr.length - 1 ? acc + "/" + arr[i] : null;
//     rtn[i + 1] = {
//       name: arr[i].charAt(0).toUpperCase() + arr[i].slice(1),
//       url: acc,
//     };
//   }
//   return rtn;
// };
// app.use(function (req, res, next) {
//   req.breadcrumbs = get_breadcrumbs(req.originalUrl);
//   next();
// });

// //routes config 
// // app.use('/', routes.index);
// const indexRouter = require(  "./src/routes/index"); 
// const productsRouter = require("./src/routes/product");
// const usersRouter = require("./src/routes/security");
// // const pagesRouter = require("./src/routes/pages");
// const categoryRouter = require("./src/routes/category");
// app.use("/products", productsRouter);
// app.use("/user", usersRouter);
// // app.use("/pages", pagesRouter);
// app.use("/category", categoryRouter);
// app.use("/", indexRouter);


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });


// const { auth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:8000',
//   clientID: 'Kiyf5mtmf6UnGtKIeG18Xk08vtnXIVxH',
//   issuerBaseURL: 'https://dev-ck4hlcju.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });






require('dotenv').config()

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
const adminupdate = require('./src/routes/admin/update');
const getaccess = require('./src/routes/getaccess');
const getall = require('./src/routes/getall');
const getyear = require('./src/routes/getyear');
const getone = require('./src/routes/getone');
const add = require('./src/routes/add');
const edit = require('./src/routes/edit');
const del = require('./src/routes/del');


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
app.use('/admin/update', adminupdate)
app.use("/getaccess", getaccess)
app.use("/getall/", getall)
app.use("/getyear/", getyear)
app.use("/getone", getone)
app.use("/add", add)
app.use("/edit", edit)
app.use("/delete", del)










var port = process.env.PORT || 8000;
app.set("port", port);

server.listen(port, () => {
  console.log("Server running at port " + port);
});


// app.listen(port, () => {
//   console.log("Server running at port " + port);
// });

module.exports = app;
