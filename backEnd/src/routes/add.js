const express = require("express");
const router = new express.Router();
const Wishlist = require("../models/wishlist");
const {auth, send_mail} = require("../middleware/mid");
const Guest = require("../models/guest");
const Cart = require("../models/cart");
const Cloth = require("../models/clothes");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const Order = require("../models/order");
const User = require("../models/user");
// const _ = require("lodash");
// const _ = require("lodash");
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')



router.post("/cart", auth, async (req, res) => {
    const user = new mongoose.Types.ObjectId(String(req.userId));
    const {productId, category, quantity, size, color} = req.body
    // const quantity = Number.parseInt(req.body.quantity );
    // const size = req.body.weight
    // const price = Number(req.body.price)

        
    
        console.log(req.body);
    
    

    if (!size && !price ) {
        return res.status(500).json({
            type: "Not Found",
            msg: "choose size"
        })
    }

    try {
        const cart = await Cart.findOne({ userId: user });
       // let productDetailss = await productById(productId);
        const productDetails = await Cloth.findById( productId );

        console.log(productDetails);
        

             if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
              const prices = productDetails.size.findIndex(item => item._id == size);
  
        //--If Cart Exists ----

            if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.products.findIndex(
                (item) =>
                    item.productId.toString() === productId.toString() &&
                    item.sizeId.toString() === size.toString() &&
                    item.color === color );





            //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
             if (indexFound !== -1) {
                cart.products[indexFound].quantity = cart.products[indexFound].quantity + quantity;



            
                if (indexFound !== -1 && cart.products[indexFound].quantity <= 0) {
                cart.products.splice(indexFound, 1);
                if (cart.products.length == 0) {
                    cart.totalCost = 0;
                } 
            }
            
                            
  
                if (cart.products.length !== 0) {
                cart.products[indexFound].total = cart.products[indexFound].quantity * productDetails.size[prices].price;
                cart.products[indexFound].price = productDetails.size[prices].price

                                
                    cart.totalCost = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
                } else {
                    cart.totalCost = 0
                } 
            }

            //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------


            //----Check if quantity is greater than 0 then add item to items array ----
            else if (quantity > 0) {
                cart.products.push({
                    productId: productId,
                    productModel: category,
                    sizeId: size,
                    color: color,
                    quantity: quantity,
                    price: productDetails.size[prices].price,
                    total: parseInt(productDetails.size[prices].price * quantity)
                })
                cart.totalCost = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            const data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
        }

        //------------ This creates a new cart and then adds the item to the cart that has been created------------
        else {


            const newCart = await Cart.create({
                userId: user,
                products: [{
                    // name: productDetails.name,
                    // productId: productId,
                    // sizeId: size,
                    // quantity,
                    // total: parseInt(productDetails.size[prices].price * quantity),
                    // price:  productDetails.size[prices].price,
                    // weight:  productDetails.size[prices].weight,
                    
                    productId: productId,
                    productModel: category,
                    sizeId: size,
                    color: color,
                    quantity: quantity,
                    price: productDetails.size[prices].price,
                    total: parseInt(productDetails.size[prices].price * quantity)

                }],
                totalCost:  parseInt(productDetails.size[price].price * quantity)
              });
        
        
              return res.status(201).send(newCart);
            
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});





router.post("/carts-items", auth, async (req, res) => {



    const user = new mongoose.Types.ObjectId(String(req.userId));
    // const {productId, category, quantity, size, color, products} = req.body
        const { products} = req.body

    // const quantity = Number.parseInt(req.body.quantity );
    // const size = req.body.weight
    // const price = Number(req.body.price)

        

    console.log(products, 555555, );


    
    if (products.length === 0 ) {
        return res.status(500).json({
            type: "Not Found",
            msg: "no cart items"
        })
    }

    try {
                    
        const cart = await Cart.findOne({ userId: user });

        
        const new_user_items = [];


        if (cart) {

            for (let i = 0; i < products.length; i++) {
                const element = products[i];
                console.log(element);
                
                
            }
                    
            
            for (let i = 0; i < products.length; i++) {


        const {productId, category, quantity, size, color, } = products[i]


       // let productDetailss = await productById(productId);
        const productDetails = await Cloth.findById( productId );


             if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        const prices = productDetails.size.findIndex(item => item._id == size);


        //--If Cart Exists ----

        

        if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.products.findIndex(
                (item) =>
                    item.productId.toString() === productId.toString() &&
                    item.sizeId.toString() === size.toString() &&
                    item.color === color );
        console.log(products[i],44444, i);


            //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
             if (indexFound !== -1) {
                cart.products[indexFound].quantity = cart.products[indexFound].quantity + quantity;
                cart.products[indexFound].total = cart.products[indexFound].quantity * productDetails.size[prices].price;
                cart.products[indexFound].price = productDetails.size[prices].price

                cart.totalCost = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //----Check if quantity is greater than 0 then add item to items array ----
            else if (quantity > 0) {
                cart.products.push({
                    productId: productId,
                    productModel: category,
                    sizeId: size,
                    color: color,
                    quantity: quantity,
                    price: productDetails.size[prices].price,
                    total: parseInt(productDetails.size[prices].price * quantity)
                })
                cart.totalCost = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            const data = await cart.save();

            

        }
        //------------ This creates a new cart and then adds the item to the cart that has been created------------
        else {

                 new_user_items.push({
                    productId: productId,
                    productModel: category,
                    sizeId: size,
                    color: color,
                    quantity: quantity,
                    price: productDetails.size[prices].price,
                    total: parseInt(productDetails.size[prices].price * quantity)
                })





        
        
        }
            
        } 
        // cart.save()
        //       return res.status(201).send(cart);

           return  res.status(200).json({
                type: "success",
                mgs: "Process successful",

            })
        } else {
            const newCart = await Cart.create({
                userId: user,
                products: new_user_items


              });

             newCart.totalCost = cart.products.map(item => item.total).reduce((acc, next) => acc + next);

             newCart.save()
            return res.status(201).send(newCart);

        }


    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});

router.post("/order", auth, async (req, res) => {

    const user = req.userId;
        // const user = new mongoose.Types.ObjectId(String(req.userId));

    const {phone, street, city, county, zipcode,} = req.body
    //     const {data} = req.body

    // const quantity = Number.parseInt(req.body.quantity );
    // const size = req.body.weight
    // const price = Number(req.body.price)

        
    
        console.log(req.body,  process.env.EMAIL, process.env.PASS_EMAIL);
    
    

    try {
        const cart = await Cart.findOne({ userId: user });
        const product = await Cloth.find();
        const userInfo = await User.findById(user );
        const send_email = []


        //--If Cart Exists ----

            if (cart) {
            //---- Check if index exists ----
            // const indexFound = cart.products.findIndex(
            //     (item) =>
            //         item.productId.toString() === productId.toString() &&
            //         item.sizeId.toString() === size.toString() &&
            //         item.color === color );

            for (let i = 0; i < cart.products.length; i++) {


        const {productId, size, quantity, color,  } = cart.products[i]


       // let productDetailss = await productById(productId);
        const productDetails = await Cloth.findById( productId );



        send_email.push({
                   
                      name: productDetails.name, productModel: productDetails.categoryId[0],
                      img: productDetails.img[0].url,
                
                      sizeId: productDetails.size.find((item => item._id == size) )?.size, 
                      quantity: quantity, color,
                

                      price: productDetails.size.find((item => item._id == size) )?.price,
                
                      total: productDetails.size.find((item => item._id == size) )?.price * quantity,
        })
            
        productDetails.ordered +=  1


        productDetails.save()



        } 



        if (userInfo) {

            if (phone ) {
                userInfo.phone = phone
                userInfo.address.street =  street
                userInfo.address.city =  city
                userInfo.address.county =  county
                userInfo.address.zipcode = zipcode

                userInfo.save()

                    if (cart.products.length !== 0) {
                const data = await Order.create({
                userId: userInfo._id,
                products: cart.products,
                // transactionId, paymentStatus, Delivered,                 
                totalCost: cart.totalCost

              });
              



              send_mail(userInfo, data, send_email )


              const del = await Cart.deleteOne({ userId: user });


            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
            
        }
            


        }
        }

        }

        //------------ This creates a new cart and then adds the item to the cart that has been created------------

                      
        else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request no cart found"
                })
            }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});



router.post("/order-from-session", async (req, res) => {



    // const user = new mongoose.Types.ObjectId(String(req.userId));
        const { data, cart} = req.body

        
    const {productId, quantity, size, color, products, category, name, price, c} = req.body

    console.log(req.body );


    
    if (!cart ) {
        return res.status(500).json({
            type: "Not Found",
            msg: "no cart items"
        })
    }

        if (!data ) {
        return res.status(500).json({
            type: "Not Found",
            msg: "please fill in all required details "
        })
    }
    try {
                    
        // const cart = await Cart.findOne({ userId: user });

        // const order = await Order.findOne({ userId: user });


        console.log(cart);
        
        const cart_items = [];
        const send_email = []


        if (cart) {
                    
            
            for (let i = 0; i < cart.length; i++) {


        const {productId, category, quantity, size, color, products, name, price, c} = cart[i]


       // let productDetailss = await productById(productId);
        const productDetails = await Cloth.findById( productId );


          if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "no product found"
            })
        }

        cart_items.push({
                   
                      productId: productDetails._id, productModel: productDetails.categoryId[0],
                
                      sizeId: size, quantity: quantity, color,
                

                      price: productDetails.size.find((item => item._id == size) )?.price,
                
                      total: productDetails.size.find((item => item._id == size) )?.price * quantity,
        })


                send_email.push({
                   
                      name: productDetails.name, productModel: productDetails.categoryId[0],
                      img: productDetails.img[0].url,
                
                      sizeId: productDetails.size.find((item => item._id == size) )?.size, 
                      quantity: quantity, color,
                

                      price: productDetails.size.find((item => item._id == size) )?.price,
                
                      total: productDetails.size.find((item => item._id == size) )?.price * quantity,
        })
                
        productDetails.ordered +=  1


        productDetails.save()
   
        }
        //--If Cart Exists ----

            //----If quantity of price is 0 throw the error -------

     
        //------------ This creates a new cart and then adds the item to the cart that has been created------------


        

            if (data ) {

                const {email, fname, lname, phone,  street, county, city, zipcode, } = data
                const name = {first: fname, last: lname}

                const guest = await Guest.findOne({ email });

                console.log(cart_items, cart_items.map(item => item.total).reduce((acc, next) => acc + next));
                


                if (guest ) {

                if (cart_items.length !== 0) {

                const data = await Order.create({
                guestId: guest._id,
                products: cart_items,
                // transactionId, paymentStatus, Delivered,                 
                totalCost: cart_items.map(item => item.total).reduce((acc, next) => acc + next)


              })


                send_mail(guest, data, send_email)



              
              



            }
                } else {
                const guest = await Guest.create({
                name,  email, phone,
                address:{street, city, county, zipCode: zipcode }

              });
                    
                if (cart_items.length !== 0) {
                const data = await Order.create({
                userId: guest._id,
                products: cart_items,
                // transactionId, paymentStatus, Delivered,                 
                totalCost: cart_items.map(item => item.total).reduce((acc, next) => acc + next)


              });

                send_mail(guest, data, send_email)


            }
                
              
            
        }
            
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                
            })

        }
       
        // cart.save()
        //       return res.status(201).send(cart);


        } 


    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});

router.post('/guest',   async (req, res)=> {

    const data = JSON.parse(req.body.data)

      

    try {
        const {fname, lname, dob,  teamid, position, number, name, email, phone, address}= data
        const  picture = []



		if (!fname || !lname ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


        const fullname = {first: fname, last: lname}





        //check if use already exists?
        const existing = await Guest.findOne({name: fullname})

        if(existing){
            return res.status(400).json({
                success: false,
                message: "already exists"
            })
        }





        console.log(data)

  
        const save = await Guest.create({
           name: fullname,  name, email, phone, address
        })


            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            save,
            message: "created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  
})



router.post("/wishlist", auth, async (req, res) => {
    const user = req.userId
    const productId = req.body.productId

    try {
        const wishlist = await Wishlist.findOne({ userId: user });
       // let productDetailss = await productById(productId);
        const productDetails = await Cloth.findOne({ _id: productId });

             if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----


        if (wishlist) {
            //---- Check if index exists ----
            const indexFound = wishlist.products.findIndex(item => item.productId == productId);

        console.log( user, productId, wishlist, "2222" , indexFound, productDetails.name )


            //----Check if quantity is greater than 0 then add item to items array ----
            if (indexFound == -1 ) {
                wishlist.products.push({
                    productId: productId,
                    name : productDetails.name,
                })
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                type: "product added",
                msg: "you have this product in your list"
                })
            }
            const data = await wishlist.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
        }
        //------------ This creates a new cart and then adds the item to the cart that has been created------------
        else {


            const newW = await Wishlist.create({
                userId: user,
                products: [{
                    name: productDetails.name,
                    productId: productId,
                }],
               
              });
        
        
              return res.status(201).send(newW);
            
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});







module.exports = router;