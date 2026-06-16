const express = require("express");
const router = new express.Router();
const Wishlist = require("../models/wishlist");
const {auth} = require("../middleware/mid");
const Guest = require("../models/guest");
const Cart = require("../models/cart");
const Cloth = require("../models/clothes");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');

router.post("/cart", auth, async (req, res) => {
    const user = new mongoose.Types.ObjectId(String(req.userId));
    const {productId, category, quantity, size, color} = req.body
    // const quantity = Number.parseInt(req.body.quantity );
    // const size = req.body.weight
    // const price = Number(req.body.price)

        
    
    
    

    if (!size && !price ) {
        return res.status(500).json({
            type: "Not Found",
            msg: "choose size"
        })
    }

    try {
        const cart = await Cart.findOne({ userId: user });
       // let productDetailss = await productById(productId);
        const productDetails = await Cloth.findOne({ _id: productId });
        const prices = productDetails.size.findIndex(item => item._id == size);

             if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----


        if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.products.findIndex(item => item.sizeId == size);



            //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
            if (indexFound !== -1 && quantity <= 0) {
                cart.products.splice(indexFound, 1);
                if (cart.products.length == 0) {
                    cart.totalCost = 0;
                } else {
                    cart.totalCost = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            }
            //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
            else if (indexFound !== -1) {
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

        

    console.log(products, user );


    
    if (!products ) {
        return res.status(500).json({
            type: "Not Found",
            msg: "no cart items"
        })
    }

    try {
                    
        const cart = await Cart.findOne({ userId: user });

        console.log(cart);
        
        const new_user_items = [];


        if (cart) {
                    
            
            for (let i = 0; i < products.length; i++) {


        const {productId, category, quantity, size, color, } = products[i]


       // let productDetailss = await productById(productId);
        const productDetails = await Cloth.findById( productId );



        const prices = productDetails.size.findIndex(item => item._id == size);

             if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----


        if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.products.findIndex(item => item.sizeId == size);



            //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
            if (indexFound !== -1 && quantity <= 0) {
                cart.products.splice(indexFound, 1);
                if (cart.products.length == 0) {
                    cart.totalCost = 0;
                } else {
                    cart.totalCost = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            }
            //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
            else if (indexFound !== -1) {
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
           return  res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
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
        const productDetails = await Wishlist.findOne({ _id: productId });

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