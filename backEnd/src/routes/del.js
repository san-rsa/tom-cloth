const express = require("express");
const router = new express.Router();
const Wishlist = require("../models/wishlist");
const {auth} = require("../middleware/mid");







router.delete("/cart", auth, async (req, res) => {
    const user = new mongoose.Types.ObjectId(String(req.userId));
    const {productId, category, quantity, size, color} = req.body
    // const quantity = Number.parseInt(req.body.quantity );
    // const size = req.body.weight
    // const price = Number(req.body.price)

        
    
    
    

    if (!size && !color && !productId ) {
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
            const indexFound = cart.products.findIndex(
                (item) =>
                    item.productId.toString() === productId.toString() &&
                    item.sizeId.toString() === size.toString() &&
                    item.color === color );



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
                cart.products.pull({productId, sizeId: size, color})
               
                cart.totalCost = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
            }

            //----Check if quantity is greater than 0 then add item to items array ----
            else  {

                    return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            //----If quantity of price is 0 throw the error -------
        
            const data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
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













router.delete("/wishlist", auth, async (req, res) => {
    const userId = req.userId
    const productId = req.body.productId

     try {
        const wishlist = await Wishlist.findOneAndUpdate( {userId: userId}, {$pull: {products: {productId: productId}}});
  
        return res.status(200).json(wishlist)

      
        
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});





router.delete("/wishlists", auth, async (req, res) => {
    const user = req.userId
    const productId = req.body.productId

    try {
        const wishlist = await Wishlist.findOne({ userId: user });
       // let productDetailss = await productById(productId);
        const productDetails = await Product.findOne({ _id: productId });

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



            //----Check if quantity is greater than 0 then add item to items array ----
            if (indexFound !== -1 ) {
                wishlist.products.pull({
                    productId: productId,
                    name : productDetails.name,
                })
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                type: "product added",
                msg: "you have don't  this product in your list"
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